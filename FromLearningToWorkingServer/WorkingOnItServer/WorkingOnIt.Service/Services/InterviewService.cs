using Amazon.Runtime;
using Amazon.S3.Model;
using Amazon.S3;
using AutoMapper;
using FromLearningToWorking.Core.DTOs;
using FromLearningToWorking.Core.Entities;
using FromLearningToWorking.Core.InterfaceRepository;
using FromLearningToWorking.Core.InterfaceService;
using FromLearningToWorking.Service.Services;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using static System.Net.WebRequestMethods;
using Amazon;

namespace FromLearningToWorking.Service.Services
{
    public class InterviewService(IRepositoryManager repositoryManager, IMapper mapper,HttpClient httpClient,IConfiguration configuration) : IInterviewService
    {
        private readonly IRepositoryManager _repositoryManager = repositoryManager;
        private readonly IMapper _mapper = mapper;
        private readonly HttpClient _httpClient = httpClient;
        private readonly IConfiguration _configuration = configuration;

            public async Task<InterviewDTO> AddAsync(InterviewDTO interviewDTO)
            {
                // Validate the interview date
                if (interviewDTO.InterviewDate < DateTime.Now)
                {
                    throw new ArgumentException("תאריך הראיון לא יכול להיות בעבר.");
                }

                var interview = _mapper.Map<Interview>(interviewDTO);
                await _repositoryManager._interviewRepository.AddAsync(interview);
                await _repositoryManager.SaveAsync(); // Assuming SaveAsync is defined
                return _mapper.Map<InterviewDTO>(interview);
            }

            public async Task<bool> DeleteAsync(int id)
            {
                var result = await _repositoryManager._interviewRepository.DeleteAsync(id);
                if (result)
                    await _repositoryManager.SaveAsync(); // Assuming SaveAsync is defined
                return result;
            }

            public async Task<IEnumerable<InterviewDTO>> GetAllAsync()
            {
                var interviews = await _repositoryManager._interviewRepository.GetAllAsync();
                return _mapper.Map<List<InterviewDTO>>(interviews);
            }

            public async Task<InterviewDTO?> GetByIdAsync(int id)
            {
                var interview = await _repositoryManager._interviewRepository.GetByIdAsync(id);
                return _mapper.Map<InterviewDTO>(interview);
            }

            public async Task<InterviewDTO> UpdateAsync(int id, InterviewDTO interviewDTO)
            {
                // Validate the interview date
                if (interviewDTO.InterviewDate < DateTime.Now)
                {
                    throw new ArgumentException("תאריך הראיון לא יכול להיות בעבר.");
                }

                var interview = _mapper.Map<Interview>(interviewDTO);
                var updatedInterview = await _repositoryManager._interviewRepository.UpdateAsync(id, interview);
                if (updatedInterview != null)
                    await _repositoryManager.SaveAsync(); // Assuming SaveAsync is defined
                return _mapper.Map<InterviewDTO>(updatedInterview);
            }



        public string GeneratePresignedUrl(string bucketName, string objectKey, int expirationInMinutes)
        {
            // קריאת נתוני AWS מקובץ .env
            var accessKey = Environment.GetEnvironmentVariable("AWS:AccessKey");
            var secretKey = Environment.GetEnvironmentVariable("AWS:SecretKey");
            var region = Environment.GetEnvironmentVariable("AWS:Region") ?? "us-east-1"; // ברירת מחדל ל-us-east-1

            // יצירת לקוח S3 עם נתוני AWS
            var s3Client = new AmazonS3Client(accessKey, secretKey, RegionEndpoint.GetBySystemName(region));

            // יצירת בקשה ל-URL חתום
            var request = new GetPreSignedUrlRequest
            {
                BucketName = bucketName,
                Key = objectKey, // כאן צריך להיות רק שם הקובץ או הנתיב היחסי בתוך ה-Bucket
                Expires = DateTime.UtcNow.AddMinutes(expirationInMinutes)
            };

            var presignedUrl = s3Client.GetPreSignedURL(request);

            // הדפסת ה-URL החתום לצורך בדיקה
            Console.WriteLine($"Generated Presigned URL: {presignedUrl}");

            return presignedUrl;
        }

        public async Task<string[]> CreateInterview(int userId, string interviewLevel)
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
            var presignedUrl = GeneratePresignedUrl(bucketName, resumeKey, 15); // תוקף של 15 דקות

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

            var response = await _httpClient.PostAsync($"{pythonApiUrl}/create_interview", content);

            if (response.IsSuccessStatusCode)
            {
                var responseBody = await response.Content.ReadAsStringAsync();
                var responseDict = JsonSerializer.Deserialize<Dictionary<string, string[]>>(responseBody);
                return responseDict["questions"];
            }
            else
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new Exception($"Error: {errorContent}");
            }
        }
    }
}





