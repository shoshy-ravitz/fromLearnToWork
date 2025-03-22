using FromLearningToWorking.Core.DTOs;
using FromLearningToWorking.Core.InterfaceService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FromLearningToWorking.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class InterviewController(IInterviewService interviewService) : ControllerBase
    {
        private readonly IInterviewService _interviewService = interviewService;

        [HttpGet]
        public ActionResult<IEnumerable<InterviewDTO>> GetAll()
        {
            return Ok(_interviewService.GetAll());
        }

        [HttpGet("{id}")]
        public ActionResult<InterviewDTO> GetById(int id)
        {
            var interview = _interviewService.GetById(id);
            if (interview == null) return NotFound();
            return Ok(interview);
        }

        [HttpPost]
        public ActionResult<InterviewDTO> Post([FromBody] InterviewDTO interviewDTO)
        {
            var createdInterview = _interviewService.Add(interviewDTO);
            return CreatedAtAction(nameof(GetById), new { id = createdInterview.Id }, createdInterview);
        }

        [HttpPut("{id}")]
        public ActionResult<InterviewDTO> Put(int id, [FromBody] InterviewDTO interviewDTO)
        {
            var updatedInterview = _interviewService.Update(id, interviewDTO);
            if (updatedInterview == null) return NotFound();
            return Ok(updatedInterview);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            if (!_interviewService.Delete(id)) return NotFound();
            return NoContent();
        }
    }
}

