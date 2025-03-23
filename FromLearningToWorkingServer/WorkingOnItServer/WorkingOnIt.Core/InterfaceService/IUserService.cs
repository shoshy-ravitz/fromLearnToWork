using FromLearningToWorking.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Core.InterfaceService
{
    public interface IUserService
    {

        Task<IEnumerable<UserDTO>> GetAllAsync();

        Task<UserDTO?> GetByIdAsync(int id);

        Task<UserDTO> AddAsync(UserDTO userDTO);

        Task<UserDTO> UpdateAsync(int id, UserDTO userDTO);

        Task<bool> DeleteAsync(int id);
    }
}

