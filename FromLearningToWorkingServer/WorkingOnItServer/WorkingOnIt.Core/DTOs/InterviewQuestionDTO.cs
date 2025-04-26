using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Core.DTOs
{
    public class InterviewQuestionDTO
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
        public string Feedback { get; set; }
        public int Mark { get; set; }
        public int InterviewId { get; set; }

        public TimeOnly? Time { get; set; }
    }
}
