using FromLearningToWorking.Core.DTOs;
using FromLearningToWorking.Core.models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Core.InterfaceService
{
    public interface IResumeService
    {
        IEnumerable<ResumeDTO> GetAll();

        ResumeDTO? GetById(int id);

        Task<ResumeDTO> Add(ResumePostModel resumeDTO);

        ResumeDTO Update(int id,ResumeDTO resumeDTO);

        bool Delete(int id);

        Task<string> UploadFileAsync(IFormFile file);
    }
}
