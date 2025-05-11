using FromLearningToWorking.Core.DTOs;
using FromLearningToWorking.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Core.InterfaceService
{
    public interface IResumeResultService
    {
        Task<IEnumerable<ResumResultDTO>> GetAllAsync();

        Task<ResumResultDTO?> GetByIdAsync(int id);

        Task<ResumResultDTO> AddAsync(ResumeResultPostModel resumeDTO);

        Task<ResumResultDTO> UpdateAsync(int id, ResumResultDTO resumeDTO);

        Task<bool> DeleteAsync(int id);
    }
}
