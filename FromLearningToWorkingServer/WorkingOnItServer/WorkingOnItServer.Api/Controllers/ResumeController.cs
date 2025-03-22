using AutoMapper;
using FromLearningToWorking.Core.DTOs;
using FromLearningToWorking.Core.InterfaceService;
using FromLearningToWorking.Core.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FromLearningToWorking.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ResumeController(IResumeService resumeService,IMapper mapper) : ControllerBase
    {
        private readonly IResumeService _resumeService = resumeService;
        private readonly IMapper _mapper = mapper;

        [HttpGet]
        public ActionResult<IEnumerable<ResumeDTO>> GetAll()
        {
            return Ok(_resumeService.GetAll());
        }

        [HttpGet("{id}")]
        public ActionResult<ResumeDTO> GetById(int id)
        {
            var resume = _resumeService.GetById(id);
            if (resume == null) return NotFound();
            return Ok(resume);
        }

        [HttpPost]

        public async Task<IActionResult>  Post([FromForm] ResumePostModel resume)
        {
            if (resume.file == null || resume. file.Length == 0)
                return BadRequest("No file uploaded.");

            //var resumeDTO = _mapper.Map<ResumeDTO>(resume);
            var resumeDTO =await _resumeService.Add(resume);
            return CreatedAtAction(nameof(GetById), new { id = resumeDTO.Id }, resumeDTO);
        }
        [HttpPut("{id}")]
        public ActionResult<ResumeDTO> Put(int id, [FromBody] ResumeDTO resumeDTO)
        {
            var updatedResume = _resumeService.Update(id, resumeDTO);
            if (updatedResume == null) return NotFound();
            return Ok(updatedResume);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            if (!_resumeService.Delete(id)) return NotFound();
            return NoContent();
        }



        //[HttpPost]
        //public async Task<IActionResult> UploadResume(IFormFile file, [FromForm] ResumeDTO resumeDto)
        //{
        //    if (file == null || file.Length == 0)
        //        return BadRequest("No file uploaded.");

        //    using (var stream = file.OpenReadStream())
        //    {
        //        await _resumeService.UploadResume(resumeDto, stream);
        //    }

        //    return Ok(new { message = "File uploaded successfully" });
        //}
    }
}
