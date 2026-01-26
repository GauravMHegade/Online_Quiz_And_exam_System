import { useNavigate } from "react-router-dom";

function Dashboard() {
  const nav = useNavigate();
  const score = Number(sessionStorage.getItem("score"));

  let performance = "Average";
  if (score >= 30) performance = "Excellent";
  else if (score >= 20) performance = "Good";

  return (
    <div className="container mt-5">
      <div className="card p-4 col-md-6 mx-auto text-center">
        <h3>Test Result</h3>
        <p><strong>Score:</strong> {score} / 40</p>
        <p><strong>Performance:</strong> {performance}</p>

        <div className="mt-3">
          <button className="btn btn-primary me-2" onClick={() => nav("/")}>
            New Attempt
          </button>
          <button className="btn btn-secondary" onClick={() => nav("/")}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
