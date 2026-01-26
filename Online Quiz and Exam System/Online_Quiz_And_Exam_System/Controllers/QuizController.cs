using Microsoft.AspNetCore.Mvc;
using Online_Quiz_API.DAL;

namespace Online_Quiz_API.Controllers
{
    [ApiController]
    [Route("api/quiz")]
    public class QuizController : ControllerBase
    {
        private readonly QuestionDAL _dal;

        public QuizController(QuestionDAL dal)
        {
            _dal = dal;
        }

        [HttpGet("{moduleId}")]
        public IActionResult Start(int moduleId)
        {
            var questions = _dal.GetRandomQuestions(moduleId);
            return Ok(questions);
        }
    }
}
