using Amazon.S3.Model;
using Amazon.S3;
using FromLearningToWorking.Core.Entities;
using FromLearningToWorking.Core.InterfaceRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;

namespace FromLearningToWorking.Data.Repository
{
    public class ResumeRepository: Repository<Resume>,IResumeRepository
    {
  

        public ResumeRepository( DataContext context) : base(context)
        {
 
        }
        public async Task<Resume> GetByUserIdAsync(int id)
        {
            return await _dbSet.FirstOrDefaultAsync(resume => resume.UserId == id);
        }
    }
}