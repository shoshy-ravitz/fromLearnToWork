using AutoMapper;
using FromLearningToWorking.Core.DTOs;
using FromLearningToWorking.Core.Entities;
using FromLearningToWorking.Core.InterfaceRepository;
using FromLearningToWorking.Core.InterfaceService;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FromLearningToWorking.Service.Services
{
    public class UserService : IUserService
    {
        private readonly IRepositoryManager _iRepositoryManager;
        private readonly IMapper _mapper;

        public UserService(IRepositoryManager iManager, IMapper mapper)
        {
            _iRepositoryManager = iManager;
            _mapper = mapper;
        }

        public async Task<UserDTO> AddAsync(UserDTO userDTO)
        {

            var existingUser = await _iRepositoryManager._userRepository.GetByEmailAsync(userDTO.Email);
            if (existingUser != null)
            {
                throw new Exception("User already exists.");
            }

            var user = _mapper.Map<User>(userDTO);


            var defaultRole = await _iRepositoryManager._roleRepository.GetByNameAsync("user");

            if (defaultRole == null)
            {
                throw new Exception("Default role 'user' not found.");
            }

            user.Role = defaultRole;

            user = await _iRepositoryManager._userRepository.AddAsync(user);
            if (user != null)
                await _iRepositoryManager.SaveAsync(); 
            return _mapper.Map<UserDTO>(user);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var res = await _iRepositoryManager._userRepository.DeleteAsync(id);
            if (res)
                await _iRepositoryManager.SaveAsync(); 
            return res;
        }

        public async Task<IEnumerable<UserDTO>> GetAllAsync()
        {
            var list = await _iRepositoryManager._userRepository.GetAllAsync();
            return _mapper.Map<List<UserDTO>>(list);
        }

        public async Task<UserDTO?> GetByIdAsync(int id)
        {
            var user = await _iRepositoryManager._userRepository.GetByIdAsync(id);
            return _mapper.Map<UserDTO>(user);
        }

        public async Task<UserDTO> UpdateAsync(int id, UserDTO userDTO)
        {
            var user = _mapper.Map<User>(userDTO);
            var response = await _iRepositoryManager._userRepository.UpdateAsync(id, user);
            if (response != null)
                await _iRepositoryManager.SaveAsync(); 
            return _mapper.Map<UserDTO>(response);
        }
    }
}
