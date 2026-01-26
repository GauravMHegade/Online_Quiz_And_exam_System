using Microsoft.AspNetCore.Mvc;
using Online_Quiz_And_Exam_System.Models;
using Online_Quiz_API.DAL;

namespace Online_Quiz_And_Exam_System.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly UserDAL _dal;

        public AuthController(UserDAL dal)
        {
            _dal = dal;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User u)
        {
            var user = _dal.ValidateUser(u.Email, u.Password);

            if (user == null)
                return Unauthorized("Invalid email or password");

            return Ok(user);
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] User u)
        {
            _dal.Register(u);
            return Ok("User registered successfully");
        }
    }
}
