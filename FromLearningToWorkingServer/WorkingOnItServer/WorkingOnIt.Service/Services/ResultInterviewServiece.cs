using Amazon.S3.Model;
using FromLearningToWorking.Core.InterfaceRepository;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Service.Services
{
    public class ResultInterviewServiece(IRepositoryManager repositoryManager)
    {
        private readonly IRepositoryManager _repositoryManager = repositoryManager;
        //private readonly 

        //public async Task<List<TotalResultInterviewService>> CalculateTotalResultInterviews(int id)
        //{
        //    var interviewsDTO =await _repositoryManager._interviewRepository.GetAllByUserIdAsync(id);
        //    if (interviewsDTO == null)
        //        throw new Exception("no interviews");

        //    var interviews = interviewsDTO.ToArray();
        //}
    }
}
