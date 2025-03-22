using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FromLearningToWorking.Core;
using FromLearningToWorking.Core.Entities;
namespace FromLearningToWorking.Data
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Resume> Resumes { get; set; }
        public DbSet<Interview> Interviews { get; set; }
        public DbSet<InterviewQuestion> InterviewQuestions { get; set; }
        public DbSet<Manager> Managers { get; set; }//



        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }
    }
}
