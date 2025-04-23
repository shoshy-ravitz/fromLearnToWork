using FromLearningToWorking.Core.DTOs;
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
    public class InterviewQuestionRepository : Repository<InterviewQuestion>, IInterviewQuestionRepository
    {
        public InterviewQuestionRepository(DataContext context) : base(context)
        {
            
        }
        public async Task<List<InterviewQuestion>> GetAllQuestionByInterviewIdAsync(int interviewId)
        {
            return await _dbSet
                .Where(q => q.InterviewId == interviewId) 
                .ToListAsync(); 
        }


    }
}
