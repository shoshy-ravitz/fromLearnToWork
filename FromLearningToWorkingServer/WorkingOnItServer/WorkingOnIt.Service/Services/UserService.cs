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
    public class UserService(IRepositoryManager iManager, IMapper mapper): IUserService
    {
        private readonly IRepositoryManager _iRepositoryManager = iManager;
        private readonly IMapper _mapper = mapper;

        public UserDTO Add(UserDTO userDTO)
        {
            var user = _mapper.Map<User>(userDTO);
            user=_iRepositoryManager._userRepository.Add(user);
            if (user != null)
                _iRepositoryManager.Save();
            var userDto = _mapper.Map<UserDTO>(user);
            return userDto;
        }

        public bool Delete(int id)
        {
            var res = _iRepositoryManager._userRepository.Delete(id);
            if (res)
                _iRepositoryManager.Save();
            return res;
        }

        public IEnumerable<UserDTO> GetAll()
        {
            var list= _iRepositoryManager._userRepository.GetAll();
            return _mapper.Map<List<UserDTO>>(list);
        }

        public UserDTO? GetById(int id)
        {
           var user= _iRepositoryManager._userRepository.GetById(id);
           return _mapper.Map<UserDTO>(user);

        }

        public UserDTO Update(int id,UserDTO userDTO)
        {
            var user = _mapper.Map<User>(userDTO);
            var response=_iRepositoryManager._userRepository.Update(id, user);
            if (response != null)
                _iRepositoryManager.Save();
            return _mapper.Map<UserDTO>(response); ;
        }



    }
}
