using AutoMapper;
using FromLearningToWorking.Core.DTOs;
using FromLearningToWorking.Core.Entities;
using FromLearningToWorking.Core.InterfaceRepository;
using FromLearningToWorking.Core.InterfaceService;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FromLearningToWorking.Service.Services
{
    public class InterviewQuestionService : IInterviewQuestionService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public InterviewQuestionService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<IEnumerable<InterviewQuestionDTO>> GetAllAsync()
        {
            var questions = await _repositoryManager._interviewQuestionRepository.GetAllAsync();
            return _mapper.Map<List<InterviewQuestionDTO>>(questions);
        }

        public async Task<InterviewQuestionDTO?> GetByIdAsync(int id)
        {
            var question = await _repositoryManager._interviewQuestionRepository.GetByIdAsync(id);
            return _mapper.Map<InterviewQuestionDTO>(question);
        }

        public async Task<InterviewQuestionDTO> AddAsync(InterviewQuestionDTO interviewQuestionDTO)
        {
            var question = _mapper.Map<InterviewQuestion>(interviewQuestionDTO);
            question = await _repositoryManager._interviewQuestionRepository.AddAsync(question);
            if (question != null)
                await _repositoryManager.SaveAsync(); // Assuming SaveAsync is defined
            return _mapper.Map<InterviewQuestionDTO>(question);
        }

        public async Task<InterviewQuestionDTO> UpdateAsync(int id, InterviewQuestionDTO interviewQuestionDTO)
        {
            var question = _mapper.Map<InterviewQuestion>(interviewQuestionDTO);
            var updatedQuestion = await _repositoryManager._interviewQuestionRepository.UpdateAsync(id, question);
            if (updatedQuestion != null)
                await _repositoryManager.SaveAsync(); // Assuming SaveAsync is defined
            return _mapper.Map<InterviewQuestionDTO>(updatedQuestion);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var res = await _repositoryManager._interviewQuestionRepository.DeleteAsync(id);
            if (res)
                await _repositoryManager.SaveAsync(); // Assuming SaveAsync is defined
            return res;
        }
    }
}
