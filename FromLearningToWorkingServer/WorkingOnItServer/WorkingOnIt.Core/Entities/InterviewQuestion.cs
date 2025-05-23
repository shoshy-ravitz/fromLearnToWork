﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Core.Entities
{
    public class InterviewQuestion
    {
        [Key]
        public int Id { get; set; }
        public string Question { get; set; } 
        public string Answer { get; set; } 
        public string Feedback { get; set; }
        public int Mark { get; set; }
        public TimeOnly? Time { get; set; }

        // קשרים
        public int InterviewId { get; set; }
        public Interview Interview { get; set; }
    }
}
