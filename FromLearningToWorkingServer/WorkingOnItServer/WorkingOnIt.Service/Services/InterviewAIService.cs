using FromLearningToWorking.Core.InterfaceService;
using FromLearningToWorking.Core.models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Reflection.Metadata;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace FromLearningToWorking.Service.Services
{
    public class InterviewAIService:IInterviewAIService
    {
        public async Task<string> CheckAnswer(CheckAnswerRequest request)
        {
            using (var httpClient = new HttpClient())
            {
                var pythonApiUrl = Environment.GetEnvironmentVariable("PYTHON_API");
                if (string.IsNullOrEmpty(pythonApiUrl))
                {
                    throw new Exception("PYTHON_API is not configured properly.");
                }

                var json = JsonSerializer.Serialize(request);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await httpClient.PostAsync($"{pythonApiUrl}/check_answer", content);

                if (response.IsSuccessStatusCode)
                {
                    var responseBody = await response.Content.ReadAsStringAsync();

                    // המרת התגובה למילון
                    var responseDict = JsonSerializer.Deserialize<Dictionary<string, string>>(responseBody);

                    // החזרת הערך של "feedback"
                    return responseDict["feedback"];
                }
                else
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    throw new Exception($"Error: {errorContent}");
                }
            }
        }

        public async Task<string> ResultOfInterview(ResultOfInterviewRequest request)
        {
            using (var httpClient = new HttpClient())
            {
                var json = JsonSerializer.Serialize(request);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var pythonApiUrl = Environment.GetEnvironmentVariable("PYTHON_API");
                var response = await httpClient.PostAsync($"{pythonApiUrl}/result_of_interview", content);

                if (response.IsSuccessStatusCode)
                {
                    var responseBody = await response.Content.ReadAsStringAsync();
                    var feedback = JsonSerializer.Deserialize<string>(responseBody);
                    return feedback;
                }
                else
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    throw new Exception($"Error: {errorContent}");
                }
            }
        }
    }
}
