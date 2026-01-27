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

        [HttpPost]
        public IActionResult Save([FromBody] TestResult r)
        {
            try
            {
                if (r == null)
                    return BadRequest("Request body is null");

                _dal.Save(r);
                return Ok("Saved successfully");
            }
            catch (Exception ex)
            {
                // THIS LINE IS CRITICAL
                return BadRequest(ex.Message);
            }
        }




        [HttpGet("attempts/{userId}")]
        public IActionResult GetAttempts(int userId)
        {
            return Ok(_dal.GetAttemptSummary(userId));
        }



        [HttpGet("latest/{userId}")]
        public IActionResult Latest(int userId)
        {
            return Ok(_dal.GetLatestStats(userId));
        }



    }
}
