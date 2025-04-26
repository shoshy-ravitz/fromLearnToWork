using AutoMapper;
using FromLearningToWorking.Core.DTOs; // Ensure this contains TotalResultInterviewDTO
using FromLearningToWorking.Core.InterfaceService;
using FromLearningToWorking.Service.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FromLearningToWorking.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = "UserOrAdmin")]
    public class TotalResultInterviewController : ControllerBase
    {
        private readonly ITotalResultInterviewService _totalResultInterviewService;

        public TotalResultInterviewController(ITotalResultInterviewService totalResultInterviewService)
        {
            _totalResultInterviewService = totalResultInterviewService;
        }

        // GET: api/TotalResultInterview
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TotalResultInterviewDTO>>> GetAll()
        {
            var totalResults = await _totalResultInterviewService.GetAllAsync();
            return Ok(totalResults);
        }

        // GET api/TotalResultInterview/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TotalResultInterviewDTO>> GetById(int id)
        {
            var totalResult = await _totalResultInterviewService.GetByIdAsync(id);
            if (totalResult == null) return NotFound();
            return Ok(totalResult);
        }

        // POST api/TotalResultInterview
        [HttpPost]
        public async Task<ActionResult<TotalResultInterviewDTO>> Post([FromBody] TotalResultInterviewDTO totalResultInterviewDTO)
        {
            var createdTotalResult = await _totalResultInterviewService.AddAsync(totalResultInterviewDTO);
            return CreatedAtAction(nameof(GetById), new { id = createdTotalResult.Id }, createdTotalResult);
        }

        // PUT api/TotalResultInterview/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<TotalResultInterviewDTO>> Put(int id, [FromBody] TotalResultInterviewDTO totalResultInterviewDTO)
        {
            var updatedTotalResult = await _totalResultInterviewService.UpdateAsync(id, totalResultInterviewDTO);
            if (updatedTotalResult == null) return NotFound();
            return Ok(updatedTotalResult);
        }

        // DELETE api/TotalResultInterview/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (!await _totalResultInterviewService.DeleteAsync(id)) return NotFound();
            return NoContent();
        }


        [HttpGet("byInterview/{id}")]
        public async Task<ActionResult<TotalResultInterviewDTO>> GetByInterviewId(int id)
        {
            var question = await _totalResultInterviewService.GetAllTotalResultByInterviewIdAsync(id);
            if (question == null) return NotFound();
            return Ok(question);
        }
    }
}
