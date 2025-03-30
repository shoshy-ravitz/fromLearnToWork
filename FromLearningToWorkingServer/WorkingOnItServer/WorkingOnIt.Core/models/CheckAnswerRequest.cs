using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Core.models
{
    public class CheckAnswerRequest
    {
        public string Question { get; set; }
        public string Answer { get; set; }
        public int Time { get; set; }
        public int InterviewId { get; set; }
    }
}
