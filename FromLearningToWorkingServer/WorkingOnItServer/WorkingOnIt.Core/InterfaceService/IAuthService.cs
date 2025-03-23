using FromLearningToWorking.Core.DTOs;
using FromLearningToWorking.Core.Entities;
using FromLearningToWorking.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Core.InterfaceService
{
    public interface IAuthService
    {
        Task<AuthResponseModel> Register(RegisterModel user);
        Task<AuthResponseModel> Login(LoginModel user);
    }
}
