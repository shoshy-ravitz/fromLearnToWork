using FromLearningToWorking.Core.DTOs;
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

        Task<ResumeDTO> AddAsync(ResumePostModel resumeDTO);

        Task<ResumeDTO> UpdateAsync(int id, ResumeDTO resumeDTO);

        Task<bool> DeleteAsync(int id);

        Task<string> UploadFileAsync(IFormFile file);

        Task<byte[]> DownloadResumeAsync(int userId);
    }
}
