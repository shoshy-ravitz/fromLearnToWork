using FromLearningToWorking.Core.Entities;
using FromLearningToWorking.Core.InterfaceService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Core.InterfaceRepository
{
    public interface IRepositoryManager
    {
        IUserRepository _userRepository { get; }
        IResumeRepository _resumeRepository { get; }
        IInterviewQuestionRepository _interviewQuestionRepository { get; }
        IInterviewRepository _interviewRepository { get; }
        IRepository<Manager> _managerRepository { get; }

        //Imanager 

        void Save();
    }
}
