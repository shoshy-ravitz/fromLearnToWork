﻿using FromLearningToWorking.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Core.InterfaceRepository
{
    public interface IInterviewQuestionRepository:IRepository<InterviewQuestion>
    {
        Task<List<InterviewQuestion>> GetAllQuestionByInterviewIdAsync(int interviewId);
    }
}
