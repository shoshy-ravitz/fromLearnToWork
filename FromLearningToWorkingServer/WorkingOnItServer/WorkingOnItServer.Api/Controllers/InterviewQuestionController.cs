﻿using FromLearningToWorking.Core.DTOs;
using FromLearningToWorking.Core.InterfaceService;
using FromLearningToWorking.Core.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FromLearningToWorking.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = "User")]
    public class InterviewQuestionController : ControllerBase
    {
        private readonly IInterviewQuestionService _interviewQuestionService;
        private readonly IInterviewAIService _interviewAIService;

        public InterviewQuestionController(IInterviewQuestionService interviewQuestionService, IInterviewAIService interviewAIService)
        {
            _interviewQuestionService = interviewQuestionService;
            _interviewAIService = interviewAIService;
        }

        // GET: api/interviewquestion
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InterviewQuestionDTO>>> GetAll()
        {
            var questions = await _interviewQuestionService.GetAllAsync();
            return Ok(questions);
        }

        // GET api/interviewquestion/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<InterviewQuestionDTO>> GetById(int id)
        {
            var question = await _interviewQuestionService.GetByIdAsync(id);
            if (question == null) return NotFound();
            return Ok(question);
        }


        [HttpGet("byInterview/{id}")]
        public async Task<ActionResult<InterviewQuestionDTO>> GetByInterviewId(int id)
        {
            var question = await _interviewQuestionService.GetAllQuestionByInterviewIdAsync(id);
            if (question == null) return NotFound();
            return Ok(question);
        }
        // POST api/interviewquestion
        [HttpPost]
        public async Task<ActionResult<InterviewQuestionDTO>> Post([FromBody] InterviewQuestionDTO questionDTO)
        {
            var createdQuestion = await _interviewQuestionService.AddAsync(questionDTO);
            return CreatedAtAction(nameof(GetById), new { id = createdQuestion.Id }, createdQuestion);
        }

        // PUT api/interviewquestion/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<InterviewQuestionDTO>> Put(int id, [FromBody] InterviewQuestionDTO questionDTO)
        {
            var updatedQuestion = await _interviewQuestionService.UpdateAsync(id, questionDTO);
            if (updatedQuestion == null) return NotFound();
            return Ok(updatedQuestion);
        }

        // DELETE api/interviewquestion/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (!await _interviewQuestionService.DeleteAsync(id)) return NotFound();
            return NoContent();
        }




        [HttpPost("checkAnswer")]
        public async Task<ActionResult<string>> CheckAnswer([FromBody] CheckAnswerRequest request)
        {
            var feedback = await _interviewAIService.CheckAnswer(request);
            if (feedback != null)
            {
                return Ok(feedback);
            }
            return BadRequest();
        }

    }
}

