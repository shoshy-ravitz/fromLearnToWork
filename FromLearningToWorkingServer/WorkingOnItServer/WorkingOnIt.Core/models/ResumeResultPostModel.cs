using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Core.models
{
    public class ResumeResultPostModel
    {
        public int InterviewId { get; set; }
        public IFormFile file { get; set; }
    }
}
