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
        IEnumerable<UserDTO> GetAll();

        UserDTO? GetById(int id);

        UserDTO Add(UserDTO userDTO);

        UserDTO Update(int id,UserDTO userDTO);

        bool Delete(int id);
    }
}
