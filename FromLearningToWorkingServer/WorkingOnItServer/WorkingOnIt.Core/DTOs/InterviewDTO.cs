﻿using FromLearningToWorking.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Core.DTOs
{
    public class InterviewDTO
    {
        public int Id { get; set; }
        public DateTime InterviewDate { get; set; }
        public int UserId { get; set; }

        public int? Mark { get; set; } // ציון אופציונלי
        public TimeOnly? Time { get; set; }
        public string? feedback { get; set; }

        

    }
    
}
