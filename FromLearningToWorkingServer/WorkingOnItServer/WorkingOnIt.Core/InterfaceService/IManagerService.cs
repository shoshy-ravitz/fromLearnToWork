using FromLearningToWorking.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Core.InterfaceService
{
    public interface IManagerService
    {
        Task<IEnumerable<ManagerDTO>> GetAllAsync();

        Task<ManagerDTO?> GetByIdAsync(int id);

        Task<ManagerDTO> AddAsync(ManagerDTO managerDTO);

        Task<ManagerDTO> UpdateAsync(int id, ManagerDTO managerDTO);

        Task<bool> DeleteAsync(int id);
    }
}
