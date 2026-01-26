import { useEffect, useState, useRef } from "react";
import { getQuestions, saveResult } from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

function Quiz() {
  const { moduleId } = useParams();
  const nav = useNavigate();

  // ================= STATE =================
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [time, setTime] = useState(3600); // change to 3600 for 60 min

  const answersRef = useRef({}); // always latest answers
  const timerRef = useRef(null); // timer reference

  const user = JSON.parse(sessionStorage.getItem("user"));

  // ================= KEEP REF UPDATED =================
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  // ================= LOAD QUESTIONS =================
  useEffect(() => {
    getQuestions(moduleId).then(setQuestions);
  }, [moduleId]);

  // ================= START TIMER (AFTER QUESTIONS LOAD) =================
  useEffect(() => {
    if (questions.length === 0) return;

    timerRef.current = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          autoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [questions]);

  // ================= AUTO SUBMIT =================
  const autoSubmit = async () => {
    alert("Time is over. Test will be submitted automatically.");
    await submitTestInternal(true);
  };

  // ================= SUBMIT (SINGLE SOURCE OF TRUTH) =================
  const submitTestInternal = async (isAuto) => {
    const latestAnswers = answersRef.current;

    const attempted = Object.keys(latestAnswers).length;
    const unattempted = questions.length - attempted;

    if (!isAuto && unattempted > 0) {
      const confirmSubmit = window.confirm(
        `You have ${unattempted} unattempted questions.\nDo you want to submit the test?`
      );
      if (!confirmSubmit) return;
    }

    let score = 0;
    questions.forEach((q, i) => {
      if (
        latestAnswers[i] &&
        latestAnswers[i].toUpperCase() === q.correctOption.toUpperCase()
      ) {
        score++;
      }
    });

    await saveResult({
      userId: user.userId,
      moduleId,
      score
    });

    sessionStorage.setItem("score", score);
    nav("/dashboard");
  };

  if (questions.length === 0) return <h4>Loading...</h4>;

  const q = questions[current];
  const attemptedCount = Object.keys(answers).length;
  const unattemptedCount = questions.length - attemptedCount;

  // ================= CLEAR ANSWER =================
  const clearAnswer = () => {
    const newAnswers = { ...answers };
    delete newAnswers[current];
    setAnswers(newAnswers);
  };

  return (
    <div className="container-fluid mt-3">

      {/* ================= HEADER ================= */}
      <div className="d-flex justify-content-between align-items-center mb-3 px-3">
        <h5>Welcome, {user.fullName}</h5>
        <h5 className="text-danger">
          Time Left: {Math.floor(time / 60)}:
          {String(time % 60).padStart(2, "0")}
        </h5>
      </div>

      <div className="row">

        {/* ================= QUESTION AREA ================= */}
        <div className="col-md-9">
          <div className="card p-4">
            <h5>
              Question {current + 1} of {questions.length}
            </h5>

            <p className="mt-3">{q.questionText}</p>

            {["A", "B", "C", "D"].map(opt => (
              <div className="form-check" key={opt}>
                <input
                  className="form-check-input"
                  type="radio"
                  name={`q${current}`}
                  checked={answers[current] === opt}
                  onChange={() =>
                    setAnswers({ ...answers, [current]: opt })
                  }
                />
                <label className="form-check-label">
                  {q["option" + opt]}
                </label>
              </div>
            ))}
          </div>

          {/* ================= NAV BUTTONS ================= */}
          <div className="d-flex justify-content-between mt-3">

            <button
              className="btn btn-secondary"
              disabled={current === 0}
              onClick={() => setCurrent(current - 1)}
            >
              Previous
            </button>

            <button
              className="btn btn-warning"
              disabled={!answers[current]}
              onClick={clearAnswer}
            >
              Clear Answer
            </button>

            <button
              className="btn btn-primary"
              disabled={current === questions.length - 1}
              onClick={() => setCurrent(current + 1)}
            >
              Next
            </button>

            <button
              className="btn btn-danger"
              onClick={() => submitTestInternal(false)}
            >
              Submit Test
            </button>

          </div>
        </div>

        {/* ================= QUESTION STATUS (RIGHT SIDE) ================= */}
        <div className="col-md-3">
          <div className="card p-3">
            <h6 className="text-center">Question Status</h6>

            <div className="d-flex flex-wrap justify-content-center">
              {questions.map((_, i) => (
                <button
                  key={i}
                  className={`btn btn-sm m-1 ${
                    answers[i] ? "btn-success" : "btn-outline-danger"
                  }`}
                  onClick={() => setCurrent(i)}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <hr />

            <p className="mb-1">
              <span className="badge bg-success">
                Attempted : {attemptedCount}
              </span>
            </p>

            <p>
              <span className="badge bg-danger">
                Unattempted : {unattemptedCount}
              </span>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Quiz;
