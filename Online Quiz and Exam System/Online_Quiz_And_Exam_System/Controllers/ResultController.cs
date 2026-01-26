using Microsoft.AspNetCore.Mvc;
using Online_Quiz_And_Exam_System.Models;
using Online_Quiz_API.DAL;

namespace Online_Quiz_And_Exam_System.Controllers
{
    [ApiController]
    [Route("api/result")]
    public class ResultController : ControllerBase
    {
        private readonly ResultDAL _dal;

        public ResultController(ResultDAL dal)
        {
            _dal = dal;
        }

        [HttpPost("save")]
        public IActionResult SaveResult([FromBody] TestResult r)
        {
            _dal.SaveResult(r);
            return Ok("Result saved successfully");
        }
    }
}
