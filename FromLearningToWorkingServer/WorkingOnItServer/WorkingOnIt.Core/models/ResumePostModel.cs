using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Core.models
{
    public class ResumePostModel
    {
        public int UserId { get; set; }
        public string fileName { get; set; }
    }
}