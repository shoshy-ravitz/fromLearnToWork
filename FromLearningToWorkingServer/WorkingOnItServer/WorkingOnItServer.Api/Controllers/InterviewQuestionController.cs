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
    public class InterviewQuestionController(IInterviewQuestionService interviewQuestionService) : ControllerBase
    {
        private readonly IInterviewQuestionService _interviewQuestionService = interviewQuestionService;

        [HttpGet]
        public ActionResult<IEnumerable<InterviewQuestionDTO>> GetAll()
        {
            return Ok(_interviewQuestionService.GetAll());
        }

        [HttpGet("{id}")]
        public ActionResult<InterviewQuestionDTO> GetById(int id)
        {
            var question = _interviewQuestionService.GetById(id);
            if (question == null) return NotFound();
            return Ok(question);
        }

        [HttpPost]
        public ActionResult<InterviewQuestionDTO> Post([FromBody] InterviewQuestionDTO questionDTO)
        {
            var createdQuestion = _interviewQuestionService.Add(questionDTO);
            return CreatedAtAction(nameof(GetById), new { id = createdQuestion.Id }, createdQuestion);
        }

        [HttpPut("{id}")]
        public ActionResult<InterviewQuestionDTO> Put(int id, [FromBody] InterviewQuestionDTO questionDTO)
        {
            var updatedQuestion = _interviewQuestionService.Update(id, questionDTO);
            if (updatedQuestion == null) return NotFound();
            return Ok(updatedQuestion);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            if (!_interviewQuestionService.Delete(id)) return NotFound();
            return NoContent();
        }
    }

}
