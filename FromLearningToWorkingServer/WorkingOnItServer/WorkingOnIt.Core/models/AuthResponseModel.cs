using FromLearningToWorking.Core.DTOs;
using FromLearningToWorking.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Core.models
{
    public class AuthResponseModel
    {
        public UserDTO User { get; set; }
        public string Token { get; set; }
    }
}
