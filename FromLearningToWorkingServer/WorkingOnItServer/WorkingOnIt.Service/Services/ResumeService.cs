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
            _s3Client = new AmazonS3Client(credentials, Amazon.RegionEndpoint.USEast1);
            _bucketUrl = $"https://{_bucketName}.s3.amazonaws.com/";
        }

        public async Task<ResumeDTO> AddAsync(ResumePostModel resumePost)
        {
            var filePath = await UploadFileAsync(resumePost.file); // Upload file to AWS
            var resume = _mapper.Map<Resume>(resumePost);
            resume.FilePath = filePath;

            resume = await _iRepositoryManager._resumeRepository.AddAsync(resume);
            if (resume != null)
                await _iRepositoryManager.SaveAsync(); // Assuming SaveAsync is defined
            return _mapper.Map<ResumeDTO>(resume);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var res = await _iRepositoryManager._resumeRepository.DeleteAsync(id);
            if (res)
                await _iRepositoryManager.SaveAsync(); // Assuming SaveAsync is defined
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
                await _iRepositoryManager.SaveAsync(); // Assuming SaveAsync is defined
            return _mapper.Map<ResumeDTO>(response);
        }

        public async Task<string> UploadFileAsync(IFormFile file)
        {
            var fileTransferUtility = new TransferUtility(_s3Client);

            using (var stream = file.OpenReadStream())
            {
                //await fileTransferUtility.UploadAsync(stream, _bucketName, file.FileName);

                await fileTransferUtility.UploadAsync(stream, _bucketName, file.FileName);
            }

            //return $"{_bucketUrl}{file.FileName}"; // Return the URL of the file

            return $"{file.FileName}"; // Return the URL of the file
        }

        public async Task<byte[]> DownloadResumeAsync(int userId)
        {
            // חיפוש קורות החיים של המשתמש
            var resume = await _iRepositoryManager._resumeRepository.GetAllAsync()
                .ContinueWith(task => task.Result.FirstOrDefault(r => r.UserId == userId));
            if (resume == null)
            {
                throw new Exception("קורות חיים לא נמצאו עבור המשתמש.");
            }

            // בדיקה אם שם הקובץ תקין
            if (string.IsNullOrEmpty(resume.FilePath))
            {
                throw new Exception("שם קובץ קורות החיים אינו תקין.");
            }

            // יצירת URL חתום
            var presignedUrl = UrlForAwsService.GeneratePresignedUrl(_bucketName, resume.FilePath, 15); // תוקף של 15 דקות

            try
            {
                using (var client = new HttpClient())
                {
                    // הורדת הקובץ כ-Byte Array
                    var fileBytes = await client.GetByteArrayAsync(presignedUrl);
                    if (fileBytes == null || fileBytes.Length == 0)
                    {
                        throw new Exception("הקובץ שהורד ריק.");
                    }
                    return fileBytes;
                }
            }
            catch (HttpRequestException ex)
            {
                throw new Exception($"שגיאה בהורדת קובץ קורות החיים: {ex.Message}", ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"שגיאה כללית בהורדת קובץ קורות החיים: {ex.Message}", ex);
            }
        }
    }
}
