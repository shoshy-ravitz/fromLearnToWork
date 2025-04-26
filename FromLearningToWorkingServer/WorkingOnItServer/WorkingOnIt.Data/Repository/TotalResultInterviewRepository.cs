using FromLearningToWorking.Core.Entities;
using FromLearningToWorking.Core.InterfaceRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Data.Repository
{

    public class TotalResultInterviewRepository : Repository<TotalResultInterview>, ITotalResultInterviewRepository
    {
        public TotalResultInterviewRepository(DataContext context) : base(context)
        {

        }

        public async Task<List<TotalResultInterview>> GetAllTotalResultByInterviewIdAsync(int interviewId)
        {
            return await _dbSet
                .Where(q => q.InterviewId == interviewId)
                .ToListAsync();         
        }
    }
}
