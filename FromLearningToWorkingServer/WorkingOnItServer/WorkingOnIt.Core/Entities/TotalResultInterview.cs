using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Core.Entities
{
    public class TotalResultInterview
    {
        [Key]
        public int Id { get; set; }
        public string Topic { get; set; }
        public int Score { get; set; }


        // קשרים
        public int InterviewId { get; set; }
        public Interview Interview { get; set; }
    }
}
