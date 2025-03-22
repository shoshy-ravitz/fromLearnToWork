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
        public string UserAnswer { get; set; }
        public string AiFeedback { get; set; }
        public int InterviewId { get; set; }
    }
}
