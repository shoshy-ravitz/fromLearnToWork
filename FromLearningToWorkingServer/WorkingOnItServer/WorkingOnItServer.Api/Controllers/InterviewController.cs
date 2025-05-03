using FromLearningToWorking.Core.DTOs;
using FromLearningToWorking.Core.InterfaceService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text.Json;
using System.Text;
using FromLearningToWorking.Core.models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FromLearningToWorking.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy ="User")]
    public class InterviewController : ControllerBase
        {
            private readonly IInterviewService _interviewService;
            private readonly IInterviewAIService _interviewAIService;


        public InterviewController(IInterviewService interviewService,IInterviewAIService interviewAIService)
        {
            _interviewService = interviewService;
            _interviewAIService = interviewAIService;
        }

            // GET: api/interview
            [HttpGet]
            public async Task<ActionResult<IEnumerable<InterviewDTO>>> GetAll()
            {
                var interviews = await _interviewService.GetAllAsync();
                return Ok(interviews);
            }

            // GET api/interview/{id}
            [HttpGet("{id}")]
            public async Task<ActionResult<InterviewDTO>> GetById(int id)
            {
                var interview = await _interviewService.GetByIdAsync(id);
                if (interview == null) return NotFound();
                return Ok(interview);
            }

            // POST api/interview
            [HttpPost]
            public async Task<ActionResult<InterviewDTO>> Post([FromBody] InterviewDTO interviewDTO)
            {
                var createdInterview = await _interviewService.AddAsync(interviewDTO);
                return CreatedAtAction(nameof(GetById), new { id = createdInterview.Id }, createdInterview);
            }

            // PUT api/interview/{id}
            [HttpPut("{id}")]
            public async Task<ActionResult<InterviewDTO>> Put(int id, [FromBody] InterviewDTO interviewDTO)
            {
                var updatedInterview = await _interviewService.UpdateAsync(id, interviewDTO);
                if (updatedInterview == null) return NotFound();
                return Ok(updatedInterview);
        }

        // DELETE api/interview/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (!await _interviewService.DeleteAsync(id)) return NotFound();
            return NoContent();
        }

        [HttpGet("byUserId/{id}")]
        public async Task<ActionResult<List<InterviewDTO>>> GetAllByUserId(int id)
        {
            var interviews =await _interviewService.GetAllByUserIdAsync(id);
            if (interviews != null)
            {
                return Ok(interviews);
            }
            return NotFound();
        }



        [HttpGet("createInterview")]
        public async Task<ActionResult<CreateInterviewResponse>> CreateInterview(int userId, string interviewLevel)
        {
            var question= await _interviewAIService.CreateInterview(userId,interviewLevel);
            if (question != null)
                return Ok(question);
            return BadRequest();
        }

        //[HttpPost("resultOfInterview/{id}")]
        //public async Task<ActionResult<ResultInterviewModel>> ResultOfInterview(int id)
        //{
        //    var resultInterview = await _interviewAIService.ResultOfInterview(id);
        //    if (resultInterview != null)
        //        return Ok(resultInterview);
        //    return BadRequest();
        //}

        [HttpGet("resultOfInterview/{id}")]
        public async Task<ActionResult<ResultInterviewModel>> GetResultOfInterview(int id)
        {
            var resultInterview = await _interviewService.GetResultInterview(id);
            if (resultInterview != null)
                return Ok(resultInterview);
            return BadRequest();
        }
    }
}


