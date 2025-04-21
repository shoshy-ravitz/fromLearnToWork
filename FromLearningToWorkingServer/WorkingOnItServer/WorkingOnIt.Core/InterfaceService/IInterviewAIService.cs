using FromLearningToWorking.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace FromLearningToWorking.Core.InterfaceService
{
    public interface IInterviewAIService
    {
        Task<ResultQuestionModel> CheckAnswer(CheckAnswerRequest request);
        Task<ResultInterviewModel> ResultOfInterview(int id, ResultOfInterviewRequest request);
        Task<CreateInterviewResponse> CreateInterview(int userId, string interviewLevel);
    }
}
