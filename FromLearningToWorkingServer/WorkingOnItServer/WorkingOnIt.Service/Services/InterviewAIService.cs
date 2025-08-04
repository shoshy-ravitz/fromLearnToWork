using FromLearningToWorking.Core.Entities;
using FromLearningToWorking.Core.InterfaceRepository;
using FromLearningToWorking.Core.InterfaceService;
using FromLearningToWorking.Core.models;
using FromLearningToWorking.Service.Services;
using System.Text.Json;
using System.Text;
using Amazon.S3;

public class InterviewAIService : IInterviewAIService
{
    private readonly IRepositoryManager _repositoryManager;
    private readonly IInterviewQuestionService _interviewQuestionService;
    private readonly ITotalResultInterviewService _totalResultInterviewService;

    public InterviewAIService(IRepositoryManager repositoryManager, ITotalResultInterviewService totalResultInterviewService, IInterviewQuestionService interviewQuestionService)
    {
        _repositoryManager = repositoryManager;
        _interviewQuestionService = interviewQuestionService;
        _totalResultInterviewService = totalResultInterviewService;
    }
    public async Task<CreateInterviewResponse> CreateInterview(int userId, string interviewLevel)
    {
        using (var httpClient = new HttpClient())
        {
            var user = await _repositoryManager._userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                throw new Exception("User not found.");
            }

            var resume = await _repositoryManager._resumeRepository.GetByUserIdAsync(user.Id);
            if (resume == null)
            {
                throw new Exception("Resume not found.");
            }


            var resumeKey = resume.FilePath;

            var presignedUrl = UrlForAwsService.GeneratePresignedUrl(resumeKey, 15, HttpVerb.GET);

            var requestBody = new
            {
                resume_url = presignedUrl
            };

            var json = JsonSerializer.Serialize(requestBody);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var pythonApiUrl = Environment.GetEnvironmentVariable("PYTHON_API");
            if (string.IsNullOrEmpty(pythonApiUrl))
            {
                throw new Exception("PYTHON_API is not configured properly.");
            }

            var response = await httpClient.PostAsync($"{pythonApiUrl}/create_interview", content);

            if (response.IsSuccessStatusCode)
            {
                var responseBody = await response.Content.ReadAsStringAsync();
                var responseDict = JsonSerializer.Deserialize<Dictionary<string, List<string>>>(responseBody);
                if (responseDict != null && responseDict.ContainsKey("questions"))
                {
                    var questions = responseDict["questions"]
                        .Select(q => q.Trim().Trim('"', ',', '}', '{'))
                        .ToArray();

                    var interview = new Interview
                    {
                        UserId = userId,
                        InterviewDate = DateTime.Now,
                        Mark = null
                    };

                    interview = await _repositoryManager._interviewRepository.AddAsync(interview);
                    await _repositoryManager.SaveAsync();

                    var result = new CreateInterviewResponse
                    {
                        Id = interview.Id,
                        Questions = questions
                    };
                    return result;
                }
                else
                {
                    throw new Exception("Invalid response format from Python API.");
                }
            }
            else
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new Exception($"Error: {errorContent}");
            }
        }
    }

    public async Task<ResultQuestionModel> CheckAnswer(CheckAnswerRequest request)
    {
        using (var httpClient = new HttpClient())
        {
            var pythonApiUrl = Environment.GetEnvironmentVariable("PYTHON_API");
            if (string.IsNullOrEmpty(pythonApiUrl))
            {
                throw new Exception("PYTHON_API is not configured properly.");
            }

            var json = JsonSerializer.Serialize(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await httpClient.PostAsync($"{pythonApiUrl}/check_answer", content);

            if (response.IsSuccessStatusCode)
            {
                var responseBody = await response.Content.ReadAsStringAsync();
                var options = new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                };
                var result = JsonSerializer.Deserialize<ResultQuestionModel>(responseBody, options);

                if (result == null)
                {
                    throw new Exception("Failed to deserialize response to ResultQuestion.");
                }

                var interviewQuestion = new InterviewQuestion
                {
                    Question = request.Question,
                    Answer = request.Answer,
                    Feedback = result.Feedback,
                    Mark = result.Mark,
                    InterviewId = request.InterviewId
                };

                await _repositoryManager._interviewQuestionRepository.AddAsync(interviewQuestion);
                await _repositoryManager.SaveAsync();

                return result;
            }
            else
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new Exception($"Error: {errorContent}");
            }
        }
    }

    public async Task<ResultInterviewModel> ResultOfInterview(int id)
    {
        using (var httpClient = new HttpClient())
        {
            var questions = await _interviewQuestionService.GetAllQuestionByInterviewIdAsync(id);
            var questionsJson = JsonSerializer.Serialize(questions);
            var pythonApiUrl = Environment.GetEnvironmentVariable("PYTHON_API");
            var content = new StringContent(questionsJson, Encoding.UTF8, "application/json");
            var response = await httpClient.PostAsync($"{pythonApiUrl}/result_of_interview", content);

            if (response.IsSuccessStatusCode)
            {
                var responseBody = await response.Content.ReadAsStringAsync();
                var options = new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                };
                var result = JsonSerializer.Deserialize<ResultInterviewModel>(responseBody, options);

                if (result == null)
                {
                    throw new Exception("Failed to deserialize response to ResultInterviewModel.");
                }

                return result;
            }
            else
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new Exception($"Error: {errorContent}");
            }
        }
    }


}
