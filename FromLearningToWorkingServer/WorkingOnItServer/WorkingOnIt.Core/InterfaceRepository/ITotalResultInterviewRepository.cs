using FromLearningToWorking.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Core.InterfaceRepository
{
    public interface ITotalResultInterviewRepository:IRepository<TotalResultInterview>
    {
        Task<List<TotalResultInterview>> GetAllTotalResultByInterviewIdAsync(int interviewId);
    }
}
