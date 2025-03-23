using AutoMapper;
using FromLearningToWorking.Core.DTOs;
using FromLearningToWorking.Core.Entities;
using FromLearningToWorking.Core.InterfaceRepository;
using FromLearningToWorking.Core.InterfaceService;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FromLearningToWorking.Service.Services
{
    public class ManagerService : IManagerService
    {
        private readonly IRepositoryManager _iRepositoryManager;
        private readonly IMapper _mapper;

        public ManagerService(IRepositoryManager iManager, IMapper mapper)
        {
            _iRepositoryManager = iManager;
            _mapper = mapper;
        }

        public async Task<ManagerDTO> AddAsync(ManagerDTO managerDTO)
        {
            var manager = _mapper.Map<Manager>(managerDTO);
            manager = await _iRepositoryManager._managerRepository.AddAsync(manager);
            if (manager != null)
                await _iRepositoryManager.SaveAsync(); // Assuming SaveAsync is defined
            return _mapper.Map<ManagerDTO>(manager);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var res = await _iRepositoryManager._managerRepository.DeleteAsync(id);
            if (res)
                await _iRepositoryManager.SaveAsync(); // Assuming SaveAsync is defined
            return res;
        }

        public async Task<IEnumerable<ManagerDTO>> GetAllAsync()
        {
            var list = await _iRepositoryManager._managerRepository.GetAllAsync();
            return _mapper.Map<List<ManagerDTO>>(list);
        }

        public async Task<ManagerDTO?> GetByIdAsync(int id)
        {
            var manager = await _iRepositoryManager._managerRepository.GetByIdAsync(id);
            return _mapper.Map<ManagerDTO>(manager);
        }

        public async Task<ManagerDTO> UpdateAsync(int id, ManagerDTO managerDTO)
        {
            var manager = _mapper.Map<Manager>(managerDTO);
            var response = await _iRepositoryManager._managerRepository.UpdateAsync(id, manager);
            if (response != null)
                await _iRepositoryManager.SaveAsync(); // Assuming SaveAsync is defined
            return _mapper.Map<ManagerDTO>(response);
        }
    }
}
