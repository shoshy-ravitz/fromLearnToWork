using FromLearningToWorking.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Core.InterfaceService
{
    public interface IInterviewQuestionService
    {
        Task<IEnumerable<InterviewQuestionDTO>> GetAllAsync();

        Task<InterviewQuestionDTO?> GetByIdAsync(int id);

        Task<InterviewQuestionDTO> AddAsync(InterviewQuestionDTO interviewQuestionDTO);

        Task<InterviewQuestionDTO> UpdateAsync(int id, InterviewQuestionDTO interviewQuestionDTO);

        Task<bool> DeleteAsync(int id);
    }
}
