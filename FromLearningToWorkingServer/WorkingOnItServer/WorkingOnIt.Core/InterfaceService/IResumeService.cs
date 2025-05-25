using FromLearningToWorking.Core.DTOs;
using FromLearningToWorking.Core.Entities;
using FromLearningToWorking.Core.models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Core.InterfaceService
{
    public interface IResumeService
    {
        Task<IEnumerable<ResumeDTO>> GetAllAsync();

        Task<ResumeDTO?> GetByIdAsync(int id);
        Task<Resume> GetByUserIdAsync(int id);
        Task<ResumeDTO> AddAsync(ResumePostModel resumeDTO);

        Task<ResumeDTO> UpdateAsync(int id, ResumeDTO resumeDTO);

        Task<ResumeDTO> UpdateAsync(int userId, string newFileName); 

        Task<bool> DeleteAsync(int id);

        Task<string> DownloadResumeAsync(int userId);
    }
}