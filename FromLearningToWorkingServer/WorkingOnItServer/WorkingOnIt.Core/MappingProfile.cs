using AutoMapper;
using FromLearningToWorking.Core.DTOs;
using FromLearningToWorking.Core.Entities;
using FromLearningToWorking.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Core
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<Resume, ResumeDTO>().ReverseMap();
            CreateMap<Manager, ManagerDTO>().ReverseMap();
            CreateMap<Interview, InterviewDTO>().ReverseMap();
            CreateMap<InterviewQuestion, InterviewQuestionDTO>().ReverseMap();

            CreateMap<RegisterModel, User>().ReverseMap();
            CreateMap<LoginModel, User>().ReverseMap();
            CreateMap<Resume, ResumePostModel>().ReverseMap();



        }
    }
}
