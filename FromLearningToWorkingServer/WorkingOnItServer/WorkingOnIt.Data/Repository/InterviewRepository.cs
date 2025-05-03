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
    public class InterviewRepository : Repository<Interview>, IInterviewRepository
    {
        public InterviewRepository(DataContext context) : base(context)
        {
        }
        public async Task<List<Interview>> GetAllByUserIdAsync(int id)
        {
           return await _dbSet.Where(i => i.UserId == id).ToListAsync();
        }
    }
}
