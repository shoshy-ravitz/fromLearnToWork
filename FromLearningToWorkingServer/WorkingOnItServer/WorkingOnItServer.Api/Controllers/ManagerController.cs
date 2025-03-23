using FromLearningToWorking.Core.DTOs;
using FromLearningToWorking.Core.InterfaceService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FromLearningToWorking.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManagerController : ControllerBase
    {
        private readonly IManagerService _managerService;

        public ManagerController(IManagerService managerService)
        {
            _managerService = managerService;
        }

        // GET: api/manager
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ManagerDTO>>> GetAll()
        {
            var managers = await _managerService.GetAllAsync();
            return Ok(managers);
        }

        // GET api/manager/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ManagerDTO>> GetById(int id)
        {
            var manager = await _managerService.GetByIdAsync(id);
            if (manager == null) return NotFound();
            return Ok(manager);
        }

        // POST api/manager
        [HttpPost]
        public async Task<ActionResult<ManagerDTO>> Post([FromBody] ManagerDTO managerDTO)
        {
            var createdManager = await _managerService.AddAsync(managerDTO);
            return CreatedAtAction(nameof(GetById), new { id = createdManager.Id }, createdManager);
        }

        // PUT api/manager/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<ManagerDTO>> Put(int id, [FromBody] ManagerDTO managerDTO)
        {
            var updatedManager = await _managerService.UpdateAsync(id, managerDTO);
            if (updatedManager == null) return NotFound();
            return Ok(updatedManager);
        }

        // DELETE api/manager/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (!await _managerService.DeleteAsync(id)) return NotFound();
            return NoContent();
        }
    }
}
