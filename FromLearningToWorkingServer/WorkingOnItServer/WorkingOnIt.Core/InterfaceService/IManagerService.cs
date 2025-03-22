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
        IEnumerable<ManagerDTO> GetAll();

        ManagerDTO? GetById(int id);

        ManagerDTO Add(ManagerDTO interviewDTO);

        ManagerDTO Update(int id, ManagerDTO interviewDTO);

        bool Delete(int id);
    }
}
