using Amazon.Runtime;
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

namespace FromLearningToWorking.Service.Services
{
    public class InterviewService(IRepositoryManager repositoryManager, IMapper mapper,HttpClient httpClient,IConfiguration configuration) : IInterviewService
    {
        private readonly IRepositoryManager _repositoryManager = repositoryManager;
        private readonly IMapper _mapper = mapper;
        private readonly HttpClient _httpClient = httpClient;

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
        public async Task<string[]> CreateInterview(int userId, string interviewLevel)
        {
            // חיפוש המשתמש בבסיס הנתונים
            var user = await _repositoryManager._userRepository.GetByIdAsync(userId);
            if (user == null || user.Resume == null)
            {
                throw new Exception("User or resume not found.");
            }

            var resumeUrl = user.Resume.FilePath;

            var requestBody = new
            {
                resume_url = resumeUrl
            };

            var json = JsonSerializer.Serialize(requestBody);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            // השתמש ב-PYTHON_API כאן
            var response = await _httpClient.PostAsync($"{configuration["PYTHON_API"]}/upload_resume", content);

            if (response.IsSuccessStatusCode)
            {
                var responseBody = await response.Content.ReadAsStringAsync();
                var questions = JsonSerializer.Deserialize<string[]>(responseBody);
                return questions;
            }
            else
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new Exception($"Error: {errorContent}");
            }
        }
    }
}





