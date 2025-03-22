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
    public class InterviewService(IRepositoryManager repositoryManager, IMapper mapper) : IInterviewService
    {
        private readonly IRepositoryManager _repositoryManager = repositoryManager;
        private readonly IMapper _mapper = mapper;


        public InterviewDTO Add(InterviewDTO interviewDTO)
        {
            // כאן ניתן להוסיף תנאים לפני השמירה
            if (interviewDTO.InterviewDate < DateTime.Now)
            {
                throw new ArgumentException("תאריך הראיון לא יכול להיות בעבר.");
            }

            var interview = _mapper.Map<Interview>(interviewDTO);
            _repositoryManager._interviewRepository.Add(interview);
            _repositoryManager.Save();
            return _mapper.Map<InterviewDTO>(interview);
        }

        public bool Delete(int id)
        {
            var result = _repositoryManager._interviewRepository.Delete(id);
            if (result)
                _repositoryManager.Save();
            return result;
        }

        public IEnumerable<InterviewDTO> GetAll()
        {
            var interviews = _repositoryManager._interviewRepository.GetAll();
            return _mapper.Map<List<InterviewDTO>>(interviews);
        }

        public InterviewDTO? GetById(int id)
        {
            var interview = _repositoryManager._interviewRepository.GetById(id);
            return _mapper.Map<InterviewDTO>(interview);
        }

        public InterviewDTO Update(int id, InterviewDTO interviewDTO)
        {
            // כאן ניתן להוסיף תנאים לפני השמירה
            if (interviewDTO.InterviewDate < DateTime.Now)
            {
                throw new ArgumentException("תאריך הראיון לא יכול להיות בעבר.");
            }

            var interview = _mapper.Map<Interview>(interviewDTO);
            var updatedInterview = _repositoryManager._interviewRepository.Update(id, interview);
            if (updatedInterview != null)
                _repositoryManager.Save();
            return _mapper.Map<InterviewDTO>(updatedInterview);
        }

    }
}
