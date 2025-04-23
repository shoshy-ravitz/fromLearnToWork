using FromLearningToWorking.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Core.InterfaceService
{
    public interface ITotalResultInterviewService
    {
        Task<IEnumerable<TotalResultInterviewDTO>> GetAllAsync();

        Task<TotalResultInterviewDTO?> GetByIdAsync(int id);

        Task<TotalResultInterviewDTO> AddAsync(TotalResultInterviewDTO totalResultInterviewDTO);

        Task<TotalResultInterviewDTO> UpdateAsync(int id, TotalResultInterviewDTO totalResultInterviewDTO);

        Task<bool> DeleteAsync(int id);
    }
}
