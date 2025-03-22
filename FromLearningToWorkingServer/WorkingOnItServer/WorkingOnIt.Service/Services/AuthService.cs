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
    public class AuthService (IRepositoryManager repositoryManager, IMapper mapper) : IAuthService
    {
        private readonly IRepositoryManager _repositoryManager = repositoryManager;
        private readonly IMapper _mapper = mapper;
        private readonly string _secretKey= Environment.GetEnvironmentVariable("Jwt:Key");
        public AuthResponseModel Register(RegisterModel userRegister)
        {
            var existingUser = _repositoryManager._userRepository.GetAll().FirstOrDefault(u => u.Email == userRegister.Email);
            if (existingUser != null)
            {
                throw new Exception("User already exists.");
            }

            var user = _mapper.Map<User>(userRegister);
            user = _repositoryManager._userRepository.Add(user);
            if (user != null)
                _repositoryManager.Save();

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(_secretKey);

            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Email, user.Email)
    };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = Environment.GetEnvironmentVariable("Jwt:Issuer"),
                Audience = Environment.GetEnvironmentVariable("Jwt:Audience"),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return new AuthResponseModel { User = user, Token = tokenHandler.WriteToken(token) };
        }

        public AuthResponseModel Login(LoginModel userLogin)
        {
            var existingUser = _repositoryManager._userRepository.GetAll().FirstOrDefault(u => u.Email == userLogin.Email && u.Password == userLogin.Password);
            if (existingUser == null)
            {
                throw new UnauthorizedAccessException("Invalid credentials");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(_secretKey);

            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Email, existingUser.Email)
    };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = Environment.GetEnvironmentVariable("Jwt:Issuer"),
                Audience = Environment.GetEnvironmentVariable("Jwt:Audience"),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return new AuthResponseModel { User = existingUser, Token = tokenHandler.WriteToken(token) };
        }

        //public string Register(RegisterModel userRegister)
        //{
        //    var existingUser = _repositoryManager._userRepository.GetAll().FirstOrDefault(u => u.Email == userRegister.Email);
        //    if (existingUser != null)
        //    {
        //        throw new Exception("User already exists.");
        //    }

        //    var user = _mapper.Map<User>(userRegister);
        //    user = _repositoryManager._userRepository.Add(user);
        //    if (user!=null)
        //        _repositoryManager.Save();


        //    var tokenHandler = new JwtSecurityTokenHandler();
        //    var tokenKey = Encoding.ASCII.GetBytes(_secretKey);

        //    var claims = new List<Claim>
        //    {
        //        new Claim(ClaimTypes.Email, user.Email)
        //    };






        //    var tokenDescriptor = new SecurityTokenDescriptor
        //    {
        //        Subject = new ClaimsIdentity(claims),
        //        Expires = DateTime.UtcNow.AddHours(1),
        //        Issuer = configuration["Jwt:Issuer"],
        //        Audience = configuration["Jwt:Audience"],
        //        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
        //    };

        //    var token = tokenHandler.CreateToken(tokenDescriptor);

        //    return tokenHandler.WriteToken(token);


        //}

        //public string Login(LoginModel userLogin)
        //{
        //    var existingUser = _repositoryManager._userRepository.GetAll().FirstOrDefault(u => u.Email == userLogin.Email && u.Password == userLogin.Password);
        //    if (existingUser == null)
        //    {
        //        throw new UnauthorizedAccessException("Invalid credentials");
        //    }
        //    var tokenHandler = new JwtSecurityTokenHandler();
        //    var tokenKey = Encoding.ASCII.GetBytes(_secretKey);

        //    var claims = new List<Claim>
        //    {
        //        new Claim(ClaimTypes.Email, existingUser.Email)
        //    };

        //    var tokenDescriptor = new SecurityTokenDescriptor
        //    {
        //        Subject = new ClaimsIdentity(claims),
        //        Expires = DateTime.UtcNow.AddHours(1),
        //        Issuer = configuration["Jwt:Issuer"],
        //        Audience = configuration["Jwt:Audience"],
        //        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
        //    };

        //    var token = tokenHandler.CreateToken(tokenDescriptor);
        //    return tokenHandler.WriteToken(token);

        //}


    }
}


