using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Core.models
{
    public class ResultInterviewModel
    {
        public int Mark { get; set; }
        public TimeOnly? Time { get; set; }
        public string Feedback { get; set; }
        public TotalResult[] Result { get; set; }
    }
    public class TotalResult
    {
        public string Topic { get; set; }
        public int Score { get; set; }
        
    }
}
