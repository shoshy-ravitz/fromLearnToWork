using FromLearningToWorking.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Core.InterfaceService
{
    public interface IInterviewService
    {
        IEnumerable<InterviewDTO> GetAll();

        InterviewDTO? GetById(int id);

        InterviewDTO Add(InterviewDTO interviewDTO);

        InterviewDTO Update(int id,InterviewDTO interviewDTO);

        bool Delete(int id);
    }
}
