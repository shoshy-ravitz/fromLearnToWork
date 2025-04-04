﻿using FromLearningToWorking.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Core.InterfaceService
{
    public interface IInterviewService
    {
        Task<IEnumerable<InterviewDTO>> GetAllAsync();

        Task<InterviewDTO?> GetByIdAsync(int id);

        Task<InterviewDTO> AddAsync(InterviewDTO interviewDTO);

        Task<InterviewDTO> UpdateAsync(int id, InterviewDTO interviewDTO);

        Task<bool> DeleteAsync(int id);
        Task<string[]> CreateInterview(int userId, string interviewLevel);
    }
}
