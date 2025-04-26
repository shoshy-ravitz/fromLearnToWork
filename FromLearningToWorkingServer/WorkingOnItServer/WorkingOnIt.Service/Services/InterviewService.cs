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
using FromLearningToWorking.Core.models;

namespace FromLearningToWorking.Service.Services
{
    public class InterviewService(IRepositoryManager repositoryManager, IMapper mapper, HttpClient httpClient, IConfiguration configuration,IInterviewAIService interviewAIService, ITotalResultInterviewService totalResultInterviewService) : IInterviewService
    {
        private readonly IRepositoryManager _repositoryManager = repositoryManager;
        private readonly IInterviewAIService _interviewAIService = interviewAIService;
        private readonly ITotalResultInterviewService _totalResultInterviewService = totalResultInterviewService;


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
            //if (interviewDTO.InterviewDate < DateTime.Now)
            //{
            //    throw new ArgumentException("תאריך הראיון לא יכול להיות בעבר.");
            //}

            var interview = _mapper.Map<Interview>(interviewDTO);
            var updatedInterview = await _repositoryManager._interviewRepository.UpdateAsync(id, interview);
            if (updatedInterview != null)
                await _repositoryManager.SaveAsync(); // Assuming SaveAsync is defined
            return _mapper.Map<InterviewDTO>(updatedInterview);
        }
        public async Task<InterviewDTO> UpdateResultAsync(int id, ResultInterviewModel request)
        {
            var interview = await _repositoryManager._interviewRepository.GetByIdAsync(id);

            interview.Mark = request.Mark;
            interview.Time = request.Time;
            interview.Feedback = request.Feedback;

            var newInterview = _mapper.Map<InterviewDTO>(interview);
            return await UpdateAsync(id, newInterview);


        }
        public async Task<int> CalculateScoreInterview(int id)
        {
            var questions = await _repositoryManager._interviewQuestionRepository.GetAllQuestionByInterviewIdAsync(id);
            int totalScore = questions.Sum(q => q.Mark);

            return totalScore; 
        }
        public async Task<ResultInterviewModel> GetResultInterview(int id)
        {
            var interview = await GetByIdAsync(id);
            if (interview.Mark == null)
            {
                var result = await _interviewAIService.ResultOfInterview(id);

                // שמירת התוצאה בבסיס הנתונים
                foreach (var totalResult in result.Result)
                {
                    totalResult.InterviewId = id; // קביעת קוד הראיון
                    var totalResultAdd = await _totalResultInterviewService.AddAsync(totalResult);
                    if (totalResultAdd == null)
                    {
                        throw new Exception("Failed to add  totalResult object.");
                    }
                }
                result.Mark =await CalculateScoreInterview(id);

                var interviewUpdate = await UpdateResultAsync(id, result);

                if (interviewUpdate == null)
                {
                    throw new Exception("Faild to Update result of interview");
                }

                return result;
            }
            else
            {
                var totalResult = await _repositoryManager._totalResultInterviewRepository.GetAllTotalResultByInterviewIdAsync(id);
                var result = _mapper.Map<TotalResultInterviewDTO[]>(totalResult);
                var resultInterview = new ResultInterviewModel
                {
                    Feedback = interview.feedback,
                    Mark = interview.Mark,
                    Time = interview.Time,
                    Result = result,

                };
                return resultInterview;
            }
        }
    }
}