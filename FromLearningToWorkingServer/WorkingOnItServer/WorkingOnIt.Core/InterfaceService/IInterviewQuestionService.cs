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
            IEnumerable<InterviewQuestionDTO> GetAll();

            InterviewQuestionDTO? GetById(int id);

            InterviewQuestionDTO Add(InterviewQuestionDTO interviewQuestionDTO);

            InterviewQuestionDTO Update(int id,InterviewQuestionDTO interviewQuestionDTO);

            bool Delete(int id);
    }
}
