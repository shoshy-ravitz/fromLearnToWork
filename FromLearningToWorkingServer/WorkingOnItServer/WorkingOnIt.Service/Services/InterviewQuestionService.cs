using AutoMapper;
using FromLearningToWorking.Core.DTOs;
using FromLearningToWorking.Core.Entities;
using FromLearningToWorking.Core.InterfaceRepository;
using FromLearningToWorking.Core.InterfaceService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Service.Services
{
    public class InterviewQuestionService(IRepositoryManager repositoryManager, IMapper mapper) : IInterviewQuestionService
    {
        private readonly IRepositoryManager _repositoryManager = repositoryManager;
        private readonly IMapper _mapper = mapper;

        public IEnumerable<InterviewQuestionDTO> GetAll()
        {
            var questions = _repositoryManager._interviewQuestionRepository.GetAll();
            return _mapper.Map<List<InterviewQuestionDTO>>(questions);
        }

        public InterviewQuestionDTO? GetById(int id)
        {
            var question = _repositoryManager._interviewQuestionRepository.GetById(id);
            return _mapper.Map<InterviewQuestionDTO>(question);
        }

        public InterviewQuestionDTO Add(InterviewQuestionDTO interviewQuestionDTO)
        {
            var question = _mapper.Map<InterviewQuestion>(interviewQuestionDTO);
            question = _repositoryManager._interviewQuestionRepository.Add(question);
            if(question!=null)
                _repositoryManager.Save();
            return _mapper.Map<InterviewQuestionDTO>(question);
        }

        public InterviewQuestionDTO Update(int id, InterviewQuestionDTO interviewQuestionDTO)
        {
            var question = _mapper.Map<InterviewQuestion>(interviewQuestionDTO);
            var updatedQuestion = _repositoryManager._interviewQuestionRepository.Update(id, question);
            if(updatedQuestion!=null)
                _repositoryManager.Save();
            return _mapper.Map<InterviewQuestionDTO>(updatedQuestion);
        }

        public bool Delete(int id)
        {
            var res = _repositoryManager._interviewQuestionRepository.Delete(id);
             if (res)
                  _repositoryManager.Save();
            return res;
        }

    }
    

}