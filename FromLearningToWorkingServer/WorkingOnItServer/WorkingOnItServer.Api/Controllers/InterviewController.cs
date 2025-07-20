using FromLearningToWorking.Core.DTOs;
using FromLearningToWorking.Core.InterfaceService;
using FromLearningToWorking.Core.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
[Authorize(Policy = "UserOrAdmin")]
public class InterviewController : ControllerBase
{
    private readonly IInterviewService _interviewService;
    private readonly IInterviewAIService _interviewAIService;

    public InterviewController(IInterviewService interviewService, IInterviewAIService interviewAIService)
    {
        _interviewService = interviewService;
        _interviewAIService = interviewAIService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<InterviewDTO>>> GetAll()
    {
        try
        {
            var interviews = await _interviewService.GetAllAsync();
            return Ok(interviews);
        }
        catch (Exception ex)
        {
            return BadRequest(new { ErrorType = ex.GetType().Name, ErrorMessage = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<InterviewDTO>> GetById(int id)
    {
        try
        {
            var interview = await _interviewService.GetByIdAsync(id);
            if (interview == null) return NotFound();
            return Ok(interview);
        }
        catch (Exception ex)
        {
            return BadRequest(new { ErrorType = ex.GetType().Name, ErrorMessage = ex.Message });
        }
    }

    [HttpPost]
    public async Task<ActionResult<InterviewDTO>> Post([FromBody] InterviewDTO interviewDTO)
    {
        try
        {
            var createdInterview = await _interviewService.AddAsync(interviewDTO);
            return CreatedAtAction(nameof(GetById), new { id = createdInterview.Id }, createdInterview);
        }
        catch (Exception ex)
        {
            return BadRequest(new { ErrorType = ex.GetType().Name, ErrorMessage = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<InterviewDTO>> Put(int id, [FromBody] InterviewDTO interviewDTO)
    {
        try
        {
            var updatedInterview = await _interviewService.UpdateAsync(id, interviewDTO);
            if (updatedInterview == null) return NotFound();
            return Ok(updatedInterview);
        }
        catch (Exception ex)
        {
            return BadRequest(new { ErrorType = ex.GetType().Name, ErrorMessage = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        try
        {
            if (!await _interviewService.DeleteAsync(id)) return NotFound();
            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest(new { ErrorType = ex.GetType().Name, ErrorMessage = ex.Message });
        }
    }

    [HttpGet("byUserId/{id}")]
    public async Task<ActionResult<List<InterviewDTO>>> GetAllByUserId(int id)
    {
        try
        {
            var interviews = await _interviewService.GetAllByUserIdAsync(id);
            if (interviews != null)
            {
                return Ok(interviews);
            }
            return NotFound();
        }
        catch (Exception ex)
        {
            return BadRequest(new { ErrorType = ex.GetType().Name, ErrorMessage = ex.Message });
        }
    }

    [HttpGet("createInterview")]
    public async Task<ActionResult<CreateInterviewResponse>> CreateInterview(int userId, string interviewLevel)
    {
        try
        {
            var question = await _interviewAIService.CreateInterview(userId, interviewLevel);
            if (question != null)
                return Ok(question);
            return BadRequest();
        }
        catch (Exception ex)
        {
            return BadRequest(new { ErrorType = ex.GetType().Name, ErrorMessage = ex.Message });
        }
    }

    [HttpGet("resultOfInterview/{id}")]
    public async Task<ActionResult<ResultInterviewModel>> GetResultOfInterview(int id)
    {
        try
        {
            var resultInterview = await _interviewService.GetResultInterview(id);
            if (resultInterview != null)
                return Ok(resultInterview);
            return BadRequest();
        }
        catch (Exception ex)
        {
            return BadRequest(new { ErrorType = ex.GetType().Name, ErrorMessage = ex.Message });
        }
    }
}
