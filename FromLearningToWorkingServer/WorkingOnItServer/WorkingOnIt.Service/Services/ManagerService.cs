using AutoMapper;
using FromLearningToWorking.Core.DTOs;
using FromLearningToWorking.Core.Entities;
using FromLearningToWorking.Core.InterfaceRepository;
using FromLearningToWorking.Core.InterfaceService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Service.Services
{
    public class ManagerService(IRepositoryManager iManager, IMapper mapper) : IManagerService
    {
        private readonly IRepositoryManager _iRepositoryManager = iManager;
        private readonly IMapper _mapper = mapper;


        public ManagerDTO Add(ManagerDTO ManagerDTO)
        {
            var manager = _mapper.Map<Manager>(ManagerDTO);
            manager = _iRepositoryManager._managerRepository.Add(manager);
            if (manager != null)
                _iRepositoryManager.Save();
            return _mapper.Map<ManagerDTO>(manager);
        }

        public bool Delete(int id)
        {
            var res = _iRepositoryManager._managerRepository.Delete(id);
            if (res)
                _iRepositoryManager.Save();
            return res;
        }

        public IEnumerable<ManagerDTO> GetAll()
        {
            var list = _iRepositoryManager._managerRepository.GetAll();
            return _mapper.Map<List<ManagerDTO>>(list);
        }

        public ManagerDTO? GetById(int id)
        {
            var manager = _iRepositoryManager._managerRepository.GetById(id);
            return _mapper.Map<ManagerDTO>(manager);
        }

        public ManagerDTO Update(int id, ManagerDTO ManagerDTO)
        {
            var manager = _mapper.Map<Manager>(ManagerDTO);
            var response = _iRepositoryManager._managerRepository.Update(id, manager);
            if (response != null)
                _iRepositoryManager.Save();
            return _mapper.Map<ManagerDTO>(response);
        }
    }

}
