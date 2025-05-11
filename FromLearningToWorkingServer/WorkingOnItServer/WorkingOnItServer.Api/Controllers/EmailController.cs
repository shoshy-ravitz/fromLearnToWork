using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FromLearningToWorking.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {

            [HttpPost("send-email")]
            public IActionResult SendEmail([FromBody] EmailRequest request)
            {
                try
                {
                    var smtpClient = new SmtpClient("smtp.gmail.com")
                    {
                        Port = 587,
                        Credentials = new NetworkCredential("s583281009@gmail.com","password"),
                        EnableSsl = true,
                    };

                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress("shevi3151@gmail.com"),
                        Subject = request.Subject,
                        Body = request.Message,
                        IsBodyHtml = false,
                    };
                    mailMessage.To.Add(request.Email);

                    smtpClient.Send(mailMessage);

                    return Ok("Email sent successfully");
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"Error sending email: {ex.Message}");
                }
            }

    }

        public class EmailRequest
        {
            public string Email { get; set; }
            public string Subject { get; set; }
            public string Message { get; set; }
        };
}
