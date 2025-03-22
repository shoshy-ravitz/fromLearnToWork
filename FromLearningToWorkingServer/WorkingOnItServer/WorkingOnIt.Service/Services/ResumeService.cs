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
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Service.Services
{
    public class ResumeService  : IResumeService
    {
        private readonly IRepositoryManager _iRepositoryManager;
        private readonly IMapper _mapper;

        private readonly IAmazonS3 _s3Client;
        private readonly string _bucketName;
        private readonly string _bucketUrl;

        public ResumeService(IRepositoryManager iManager, IMapper mapper)
        {
            _iRepositoryManager = iManager;
            _mapper = mapper;
            var accessKey = Environment.GetEnvironmentVariable("AWS:AccessKey");
            var secretKey = Environment.GetEnvironmentVariable("AWS:SecretKey");
            _bucketName = Environment.GetEnvironmentVariable("AWS:BucketName");

            var credentials = new BasicAWSCredentials(accessKey, secretKey);
            _s3Client = new AmazonS3Client(credentials, Amazon.RegionEndpoint.USEast1); // שינוי האזור לפי הצורך
            _bucketUrl = $"https://{_bucketName}.s3.amazonaws.com/";
        }

        public async Task<ResumeDTO> Add(ResumePostModel resumePost)
        {
            var FilePath = await UploadFileAsync(resumePost.file);//עלאת הקובץ לaws
            var resume = _mapper.Map<Resume>(resumePost);
            resume.FilePath = FilePath;
      
            resume = _iRepositoryManager._resumeRepository.Add(resume);
            if (resume != null)
                _iRepositoryManager.Save();
            return _mapper.Map<ResumeDTO>(resume);
        }

        public bool Delete(int id)
        {
            var res = _iRepositoryManager._resumeRepository.Delete(id);
            if (res)
                _iRepositoryManager.Save();
            return res;
        }

        public IEnumerable<ResumeDTO> GetAll()
        {
            var list = _iRepositoryManager._resumeRepository.GetAll();
            return _mapper.Map<List<ResumeDTO>>(list);
        }

        public ResumeDTO? GetById(int id)
        {
            var resume = _iRepositoryManager._resumeRepository.GetById(id);
            return _mapper.Map<ResumeDTO>(resume);
        }

        public ResumeDTO Update(int id, ResumeDTO resumeDTO)
        {
            var resume = _mapper.Map<Resume>(resumeDTO);
            var response = _iRepositoryManager._resumeRepository.Update(id, resume);
            if (response != null)
                _iRepositoryManager.Save();
            return _mapper.Map<ResumeDTO>(response);
        }

        /////////////

        public async Task<string> UploadFileAsync(IFormFile file)
        {
            var fileTransferUtility = new TransferUtility(_s3Client);

            using (var stream = file.OpenReadStream())
            {
                await fileTransferUtility.UploadAsync(stream, _bucketName, file.FileName);
            }

            return $"{_bucketUrl}{file.FileName}"; // החזרת ה-URL של הקובץ
        }
    }

    //public async Task UploadResume(ResumeDTO resumeDto, Stream fileStream)
    //{
    //   //maybe change to mapper.....
    //    var resume = new Resume
    //    {
    //        Id = resumeDto.Id,
    //        FileName = resumeDto.FileName,
    //        FilePath = $"{resumeDto.UserId}/resumes/{resumeDto.FileName}-{DateTime.UtcNow:yyyyMMddHHmmss}",
    //        UploadDate = DateTime.UtcNow,
    //        UserId = resumeDto.UserId
    //    };

    //    await _iRepositoryManager._resumeRepository.UploadResume(resume, fileStream);
    //}

}



