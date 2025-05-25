using Amazon.S3;
using AutoMapper;
using FromLearningToWorking.Core.DTOs;
using FromLearningToWorking.Core.InterfaceService;
using FromLearningToWorking.Core.models;
using FromLearningToWorking.Service.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FromLearningToWorking.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Policy = "User")]
    public class ResumeController : ControllerBase
    {
        private readonly IResumeService _resumeService;
        private readonly IMapper _mapper;

        public ResumeController(IResumeService resumeService, IMapper mapper)
        {
            _resumeService = resumeService;
            _mapper = mapper;
        }

        // GET: api/resume
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResumeDTO>>> GetAll()
        {
            var resumes = await _resumeService.GetAllAsync();
            return Ok(resumes);
        }

        // GET api/resume/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ResumeDTO>> GetById(int id)
        {
            var resume = await _resumeService.GetByIdAsync(id);
            if (resume == null) return NotFound();
            return Ok(resume);
        }

        // POST api/resume
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ResumePostModel resume)
        {
            try
            {
                var resumeDTO = await _resumeService.AddAsync(resume);
                return CreatedAtAction(nameof(GetById), new { id = resumeDTO.Id }, resumeDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //// PUT api/resume/{id}
        //[HttpPut("{id}")]
        //public async Task<ActionResult<ResumeDTO>> Put(int id, [FromBody] ResumeDTO resumeDTO)
        //{
        //    var updatedResume = await _resumeService.UpdateAsync(id, resumeDTO);
        //    if (updatedResume == null) return NotFound();
        //    return Ok(updatedResume);
        //}

        [HttpPut("update/{userId}")]
        public async Task<IActionResult> UpdateResume(int userId, [FromBody] string fileName)
        {
            try
            {
                var updatedResume = await _resumeService.UpdateAsync(userId, fileName);
                return Ok(updatedResume);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/resume/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (!await _resumeService.DeleteAsync(id)) return NotFound();
            return NoContent();
        }


        [HttpPost("upload-url")]
        public IActionResult GetUploadUrl([FromForm] string fileName)
        {
            var presignedUrl = UrlForAwsService.GeneratePresignedUrl( fileName, 15, HttpVerb.PUT);
            if (string.IsNullOrEmpty(presignedUrl))
            {
                return BadRequest("Failed to generate presigned URL.");
            }

            return Ok(new { uploadUrl = presignedUrl });
        }



        [HttpGet("download/{userId}")]
        public async Task<IActionResult> DownloadResume(int userId)
        {
            try
            {
                var presignedUrl = await _resumeService.DownloadResumeAsync(userId);
                return Ok(new { Url = presignedUrl });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //[HttpGet("download/{userId}")]
        //public async Task<IActionResult> DownloadResume(int userId)
        //{
        //    try
        //    {
        //        var fileBytes = await _resumeService.DownloadResumeAsync(userId);
        //        var resumes =await _resumeService.GetAllAsync();
        //        var resume= resumes.FirstOrDefault(r => r.UserId == userId);
        //        return File(fileBytes, "application/octet-stream", resume.FileName);
        //    }
        //    catch (Exception ex)
        //    {
        //        return NotFound(ex.Message);
        //    }
        //}
    }
}





