//using Microsoft.AspNetCore.Mvc;

//// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

//namespace FromLearningToWorking.Api.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class AudioController : ControllerBase
//    {

//        private readonly IAudioService _audioService;

//        public AudioController(IAudioService audioService)
//        {
//            _audioService = audioService;
//        }

//        [HttpPost("translate-audio")]
//        public async Task<IActionResult> TranslateAudio([FromForm] AudioUploadModel model)
//        {
//            if (model.AudioFile == null || model.AudioFile.Length == 0)
//            {
//                return BadRequest("Audio file is required.");
//            }

//            try
//            {
//                var transcription = await _audioService.TranslateAudioAsync(model.AudioFile);
//                return Ok(new { Transcription = transcription });
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, $"Error: {ex.Message}");
//            }
//        }
        
    
//        // GET: api/<AudioController>
//        [HttpGet]
//        public IEnumerable<string> Get()
//        {
//            return new string[] { "value1", "value2" };
//        }

//        // GET api/<AudioController>/5
//        [HttpGet("{id}")]
//        public string Get(int id)
//        {
//            return "value";
//        }

//        // POST api/<AudioController>
//        [HttpPost]
//        public void Post([FromBody] string value)
//        {
//        }

//        // PUT api/<AudioController>/5
//        [HttpPut("{id}")]
//        public void Put(int id, [FromBody] string value)
//        {
//        }

//        // DELETE api/<AudioController>/5
//        [HttpDelete("{id}")]
//        public void Delete(int id)
//        {
//        }
//    }
//}
