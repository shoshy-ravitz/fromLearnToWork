using FromLearningToWorking.Core.Entities;
using FromLearningToWorking.Core.InterfaceRepository;
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


    }
}
