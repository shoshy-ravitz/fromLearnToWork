using FromLearningToWorking.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Core.DTOs
{
    public class TotalResultInterviewDTO
    {
        public int Id { get; set; }
        public string Topic { get; set; }
        public int Score { get; set; }
        public int InterviewId { get; set; }
    }
}
