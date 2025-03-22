using AutoMapper;
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
    public class UserController(IUserService userService, IMapper mapper) : ControllerBase
    {
         private readonly IUserService _userService = userService;
         private readonly IMapper _mapper = mapper;


         // GET: api/user
         [HttpGet]
         public ActionResult<IEnumerable<UserDTO>> Get()
         {
             var users = _userService.GetAll();
             return Ok(users);
         }

         // GET api/user/5
         [HttpGet("{id}")]
         public ActionResult<UserDTO> Get(int id)
         {
             var user = _userService.GetById(id);
             if (user == null)
             {
                 return NotFound();
             }
             return Ok(user);
         }

         // POST api/user
         [HttpPost]
         public ActionResult<UserDTO> Post([FromBody] UserDTO userDTO)
         {
             var createdUser = _userService.Add(userDTO);
             return CreatedAtAction(nameof(Get), new { id = createdUser.Id }, createdUser);
         }

         // PUT api/user/5
         [HttpPut("{id}")]
         public ActionResult<UserDTO> Put(int id, [FromBody] UserDTO userDTO)
         {
             var updatedUser = _userService.Update(id, userDTO);
             if (updatedUser == null)
             {
                 return NotFound();
             }
             return Ok(updatedUser);
         }

         // DELETE api/user/5
         [HttpDelete("{id}")]
         public ActionResult Delete(int id)
         {
             var result = _userService.Delete(id);
             if (!result)
             {
                 return NotFound();
             }
             return NoContent();
         }
        
    }
}
