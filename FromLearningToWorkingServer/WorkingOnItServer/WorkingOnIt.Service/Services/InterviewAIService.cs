using FromLearningToWorking.Core.DTOs;
using FromLearningToWorking.Core.Entities;
using FromLearningToWorking.Core.InterfaceRepository;
using FromLearningToWorking.Core.InterfaceService;
using FromLearningToWorking.Core.models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Reflection.Metadata;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace FromLearningToWorking.Service.Services
{
    public class InterviewAIService(IRepositoryManager repositoryManager, IInterviewService interviewService) : IInterviewAIService
    {
        private readonly IRepositoryManager _repositoryManager = repositoryManager;
        private readonly IInterviewService _interviewService = interviewService;
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
                        PropertyNamingPolicy = JsonNamingPolicy.CamelCase // המרת שמות המאפיינים ל-CamelCase
                    };
                    var result = JsonSerializer.Deserialize<ResultQuestionModel>(responseBody, options);
                    // המרת התגובה לאובייקט ResultQuestion

                    if (result == null)
                    {
                        throw new Exception("Failed to deserialize response to ResultQuestion.");
                    }


                    var interviewQuestion = new InterviewQuestion
                    {
                        
                        Question = request.Question,
                        UserAnswer = request.Answer,
                        AiFeedback = result.Feedback,
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
        

        public async Task<ResultInterviewModel> ResultOfInterview(int id,ResultOfInterviewRequest request)
        {
            using (var httpClient = new HttpClient())
            {
                var json = JsonSerializer.Serialize(request);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var pythonApiUrl = Environment.GetEnvironmentVariable("PYTHON_API");
                var response = await httpClient.PostAsync($"{pythonApiUrl}/result_of_interview", content);

                if (response.IsSuccessStatusCode)
                {
                    var responseBody = await response.Content.ReadAsStringAsync();

                    var options = new JsonSerializerOptions
                    {
                        PropertyNamingPolicy = JsonNamingPolicy.CamelCase // המרת שמות המאפיינים ל-CamelCase
                    };

                    var result = JsonSerializer.Deserialize<ResultInterviewModel>(responseBody, options);

                    if (result == null)
                    {
                        throw new Exception("Failed to deserialize response to ResultInterviewModel.");
                    }

                    var interviewUpdate = await _interviewService.UpdateResultAsync(id, result);

                    if(interviewUpdate==null)
                    {
                        throw new Exception("Faild to Update result of interview");
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


        public async Task<string[]> CreateInterview(int userId, string interviewLevel)
        {

            using (var httpClient = new HttpClient())
            {

                // חיפוש המשתמש בבסיס הנתונים
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

            // יצירת URL חתום
            var bucketName = Environment.GetEnvironmentVariable("AWS:BucketName");
            var resumeKey = resume.FilePath; // Key של הקובץ ב-S3
            var presignedUrl = UrlForAwsService.GeneratePresignedUrl(bucketName, resumeKey, 15); // תוקף של 15 דקות

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

                // המרת התגובה למערך של מחרוזות
                var responseDict = JsonSerializer.Deserialize<Dictionary<string, List<string>>>(responseBody);
                if (responseDict != null && responseDict.ContainsKey("questions"))
                {
                    // עיבוד השאלות להסרת מרכאות מיותרות
                    var questions = responseDict["questions"]
                        .Select(q => q.Trim().Trim('"', ',','}','{')) // הסרת רווחים ומרכאות
                        .ToArray();

                        // Save interview details to the database
                        var interview = new Interview
                        {
                            UserId = userId,
                            InterviewDate = DateTime.Now,
                            Mark = null // Score will be updated later
                        };

                        interview = await _repositoryManager._interviewRepository.AddAsync(interview);
                        await _repositoryManager.SaveAsync();

                        return questions;
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

    }
}
