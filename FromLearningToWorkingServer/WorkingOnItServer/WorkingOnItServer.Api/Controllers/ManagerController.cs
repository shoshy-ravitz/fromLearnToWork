using FromLearningToWorking.Core.DTOs;
using FromLearningToWorking.Core.InterfaceService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FromLearningToWorking.Api.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ManagerController(IManagerService managerService) : ControllerBase
    {
        private readonly IManagerService _managerService = managerService;


        [HttpGet]
        public ActionResult<IEnumerable<ManagerDTO>> GetAll()
        {
            return Ok(_managerService.GetAll());
        }

        [HttpGet("{id}")]
        public ActionResult<ManagerDTO> GetById(int id)
        {
            var manager = _managerService.GetById(id);
            if (manager == null) return NotFound();
            return Ok(manager);
        }

        [HttpPost]
        public ActionResult<ManagerDTO> Post([FromBody] ManagerDTO managerDTO)
        {
            var createdManager = _managerService.Add(managerDTO);
            return CreatedAtAction(nameof(GetById), new { id = createdManager.Id }, createdManager);
        }

        [HttpPut("{id}")]
        public ActionResult<ManagerDTO> Put(int id, [FromBody] ManagerDTO managerDTO)
        {
            var updatedManager = _managerService.Update(id, managerDTO);
            if (updatedManager == null) return NotFound();
            return Ok(updatedManager);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            if (!_managerService.Delete(id)) return NotFound();
            return NoContent();
        }
    }

}
