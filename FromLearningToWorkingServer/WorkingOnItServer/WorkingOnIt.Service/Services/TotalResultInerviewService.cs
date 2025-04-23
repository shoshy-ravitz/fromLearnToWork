using AutoMapper;
using FromLearningToWorking.Core.DTOs; // Ensure this contains TotalResultInterviewDTO
using FromLearningToWorking.Core.Entities; // Ensure this contains TotalResultInterview
using FromLearningToWorking.Core.InterfaceRepository;
using FromLearningToWorking.Core.InterfaceService;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FromLearningToWorking.Service.Services
{
    public class TotalResultInterviewService:ITotalResultInterviewService
    {
        private readonly IRepositoryManager _iRepositoryManager;
        private readonly IMapper _mapper;

        public TotalResultInterviewService(IRepositoryManager iManager, IMapper mapper)
        {
            _iRepositoryManager = iManager;
            _mapper = mapper;
        }

        public async Task<TotalResultInterviewDTO> AddAsync(TotalResultInterviewDTO totalResultInterviewDTO)
        {
            var totalResultInterview = _mapper.Map<TotalResultInterview>(totalResultInterviewDTO);
            totalResultInterview = await _iRepositoryManager._totalResultInterviewRepository.AddAsync(totalResultInterview);
            if (totalResultInterview != null)
                await _iRepositoryManager.SaveAsync(); // Assuming SaveAsync is defined
            return _mapper.Map<TotalResultInterviewDTO>(totalResultInterview);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var res = await _iRepositoryManager._totalResultInterviewRepository.DeleteAsync(id);
            if (res)
                await _iRepositoryManager.SaveAsync(); // Assuming SaveAsync is defined
            return res;
        }

        public async Task<IEnumerable<TotalResultInterviewDTO>> GetAllAsync()
        {
            var list = await _iRepositoryManager._totalResultInterviewRepository.GetAllAsync();
            return _mapper.Map<List<TotalResultInterviewDTO>>(list);
        }

        public async Task<TotalResultInterviewDTO?> GetByIdAsync(int id)
        {
            var totalResultInterview = await _iRepositoryManager._totalResultInterviewRepository.GetByIdAsync(id);
            return _mapper.Map<TotalResultInterviewDTO>(totalResultInterview);
        }

        public async Task<TotalResultInterviewDTO> UpdateAsync(int id, TotalResultInterviewDTO totalResultInterviewDTO)
        {
            var totalResultInterview = _mapper.Map<TotalResultInterview>(totalResultInterviewDTO);
            var response = await _iRepositoryManager._totalResultInterviewRepository.UpdateAsync(id, totalResultInterview);
            if (response != null)
                await _iRepositoryManager.SaveAsync(); // Assuming SaveAsync is defined
            return _mapper.Map<TotalResultInterviewDTO>(response);
        }
    }
}
