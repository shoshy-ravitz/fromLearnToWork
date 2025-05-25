using Amazon;
using Amazon.Runtime;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using AutoMapper;
using FromLearningToWorking.Core.DTOs;
using FromLearningToWorking.Core.Entities;
using FromLearningToWorking.Core.InterfaceRepository;
using FromLearningToWorking.Core.InterfaceService;
using FromLearningToWorking.Core.models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace FromLearningToWorking.Service.Services
{
    public class ResumeService : IResumeService
    {
        private readonly IRepositoryManager _iRepositoryManager;
        private readonly IMapper _mapper;
        private readonly IAmazonS3 _s3Client;

        public ResumeService(IRepositoryManager iManager, IMapper mapper)
        {
            _iRepositoryManager = iManager;
            _mapper = mapper;      
        }
        public async Task<ResumeDTO> AddAsync(ResumePostModel resumePost)
        {
            var userId =await _iRepositoryManager._userRepository.GetByIdAsync(resumePost.UserId);
            if(userId==null)
            {
                throw new Exception("user id not found");
            }


            var resume = _mapper.Map<Resume>(resumePost);
            resume.FilePath = resumePost.fileName;
            resume.UploadDate = DateTime.Now;

            resume = await _iRepositoryManager._resumeRepository.AddAsync(resume);
            if (resume != null)
                await _iRepositoryManager.SaveAsync();
            return _mapper.Map<ResumeDTO>(resume);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var res = await _iRepositoryManager._resumeRepository.DeleteAsync(id);
            if (res)
                await _iRepositoryManager.SaveAsync(); 
            return res;
        }

        public async Task<IEnumerable<ResumeDTO>> GetAllAsync()
        {
            var list = await _iRepositoryManager._resumeRepository.GetAllAsync();
            return _mapper.Map<List<ResumeDTO>>(list);
        }

        public async Task<ResumeDTO?> GetByIdAsync(int id)
        {
            var resume = await _iRepositoryManager._resumeRepository.GetByIdAsync(id);
            return _mapper.Map<ResumeDTO>(resume);
        }

        public async Task<ResumeDTO> UpdateAsync(int id, ResumeDTO resumeDTO)
        {
            var resume = _mapper.Map<Resume>(resumeDTO);
            var response = await _iRepositoryManager._resumeRepository.UpdateAsync(id, resume);
            if (response != null)
                await _iRepositoryManager.SaveAsync(); 
            return _mapper.Map<ResumeDTO>(response);
        }

        public async Task<ResumeDTO> UpdateAsync(int userId, string newFileName)
        {
            var existingResume = await _iRepositoryManager._resumeRepository.GetAllAsync()
                .ContinueWith(task => task.Result.FirstOrDefault(r => r.UserId == userId));

            if (existingResume == null)
            {
                throw new Exception("Resume not found for the user.");
            }

            //// Delete the old file from S3///


            existingResume.FilePath = newFileName;
            existingResume.UploadDate = DateTime.Now;
            
            var updatedResume = await _iRepositoryManager._resumeRepository.UpdateAsync(existingResume.Id, existingResume);

            if (updatedResume != null)
            {
                await _iRepositoryManager.SaveAsync();
            }

            return _mapper.Map<ResumeDTO>(updatedResume);
        }
        public async Task<string> DownloadResumeAsync(int userId)
        {
            var resume = await _iRepositoryManager._resumeRepository.GetAllAsync()
             .ContinueWith(task => task.Result.FirstOrDefault(r => r.UserId == userId));
            if (resume == null)
            {
                throw new Exception("Resume not found for the user.");
            }

            if (string.IsNullOrEmpty(resume.FilePath))
            {
                throw new Exception("The resume file name is invalid.");
            }

            var presignedUrl = UrlForAwsService.GeneratePresignedUrl(resume.FilePath, 15, HttpVerb.GET);

            if (string.IsNullOrEmpty(presignedUrl))
            {
                throw new Exception("Failed to generate presigned URL.");
            }

            Console.WriteLine("presignedUrl from download---------------:",presignedUrl);
            return presignedUrl;
        }
    }
}
