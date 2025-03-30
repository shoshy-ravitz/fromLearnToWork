using AutoMapper;
using FromLearningToWorking.Core.Entities;
using FromLearningToWorking.Core.InterfaceRepository;
using FromLearningToWorking.Core.InterfaceService;
using FromLearningToWorking.Core.models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using FromLearningToWorking.Core.DTOs;
namespace FromLearningToWorking.Service.Services
{
    public class AuthService(IRepositoryManager repositoryManager, IMapper mapper) : IAuthService
    {
        private readonly IRepositoryManager _repositoryManager = repositoryManager;
        private readonly IMapper _mapper = mapper;



        private string GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email),
            };

            // Add roles to the JWT claims
            
            if(user.Role!=null)
            {
                claims.Add(new Claim(ClaimTypes.Role, user.Role.RoleName));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("Jwt:Key")));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                Environment.GetEnvironmentVariable("Jwt:Issuer"),
                Environment.GetEnvironmentVariable("Jwt:Audience"),claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<AuthResponseModel> Register(RegisterModel userRegister)
        {
            var existingUser = await _repositoryManager._userRepository.GetAllAsync();
            var exist = existingUser.FirstOrDefault(u => u.Email == userRegister.Email);
            if (exist != null)
            {
                throw new Exception("User already exists.");
            }
           
            var user = _mapper.Map<User>(userRegister);





            var defaultRole = await _repositoryManager._roleRepository.GetByNameAsync("user");

            if (defaultRole == null)
            {
                throw new Exception("Default role 'user' not found.");
            }

            user.Role= defaultRole;


            var token = GenerateJwtToken(user);
            user = await _repositoryManager._userRepository.AddAsync(user);

            if (user != null)
            {
                Console.WriteLine("----------------save------------");
                await _repositoryManager.SaveAsync();
                Console.WriteLine("-------after---------save----------------");
            }
            var userDTO = _mapper.Map<UserDTO>(user);
            return new AuthResponseModel { User = userDTO, Token =token };
        }

        public async Task<AuthResponseModel> Login(LoginModel userLogin)
        {
            var user = await _repositoryManager._userRepository.GetByEmailAsync(userLogin.Email);
            //var user = exist.FirstOrDefault(u => u.Email == userLogin.Email && u.Password == userLogin.Password);
            if (user == null)
            {
                throw new UnauthorizedAccessException("Invalid credentials");
            }
            var userDTO = _mapper.Map<UserDTO>(user);
            var token = GenerateJwtToken(user);
            return new AuthResponseModel { User = userDTO, Token = token };
        }
    }
}