//using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FromLearningToWorking.Data.Repository;
using FromLearningToWorking.Core.InterfaceRepository;
using FromLearningToWorking.Core.Entities;

namespace FromLearningToWorking.Data.Repository
{
    public class RepositoryManager: IRepositoryManager

    {
        DataContext _dataContext;
        public IUserRepository _userRepository { get; }
        public IResumeRepository _resumeRepository { get; }
        public IInterviewQuestionRepository _interviewQuestionRepository { get; }
        public IInterviewRepository _interviewRepository { get; }
        public IRepository<Manager> _managerRepository { get; }

       

        public RepositoryManager(DataContext dataContext, IUserRepository userRepository,IResumeRepository resumeRepository,IInterviewQuestionRepository interviewQuestionRepository,IInterviewRepository interviewRepository,IRepository<Manager> managerRepository)
        {
            _dataContext = dataContext;
            _userRepository = userRepository;
            _resumeRepository = resumeRepository;
            _interviewQuestionRepository = interviewQuestionRepository;
            _interviewRepository = interviewRepository;
            _managerRepository = managerRepository;
        }

        public void Save()
        {
            _dataContext.SaveChanges();
        }
    }
}
