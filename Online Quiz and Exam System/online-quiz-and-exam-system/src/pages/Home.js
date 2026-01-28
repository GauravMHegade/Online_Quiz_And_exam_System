import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getModules } from "../services/api";
import "./Home.css";
import { checkMockAttempt } from "../services/api";


function Home() {
  const [modules, setModules] = useState([]);
  const nav = useNavigate();

  const user = sessionStorage.getItem("user"); // 🔑 login check

  useEffect(() => {
    getModules().then(setModules);
  }, []);

  const startPractice = (moduleId) => {
    if (!user) {
      nav("/login");
    } else {
      nav(`/quiz/${moduleId}`);
    }
  };

  const startDemo = (moduleId) => {
    nav(`/demo/${moduleId}`);
  };


const startMock = async (moduleId, mockNo) => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const res = await checkMockAttempt(
    user.userId,
    moduleId,
    mockNo
  );

  if (res.attempted) {
    const confirmRetry = window.confirm(
      `You have already attempted Mock ${mockNo}.
Do you want to reattempt?`
    );

    if (!confirmRetry) return;
  }

  nav(`/mock/${moduleId}/${mockNo}`);
};


  return (
    <div className="page-container">
      <h2 className="page-title text-center">
        CDAC DAC – Online Quiz & Mock Tests
      </h2>

      <div className="row g-4">
        {modules.map((m) => (
          <div className="col-md-4" key={m.moduleId}>
            <div className="module-card">

              {/* MODULE NAME */}
              <h5 className="module-title">{m.moduleName}</h5>

              {/* ✅ FREE DEMO BUTTON (ONLY BEFORE LOGIN) */}
              {!user && (
                <button
                  className="btn btn-outline-primary w-100 mb-2"
                  onClick={() => startDemo(m.moduleId)}
                >
                  Attempt Free Test
                </button>
              )}

              {/* PRACTICE TEST */}
              <button
                className={`btn btn-primary w-100 ${
                  !user ? "blur-disabled" : ""
                }`}
                onClick={() => startPractice(m.moduleId)}
              >
                Practice Test
              </button>

              <hr />

              <div className={`mock-section ${!user ? "blur-disabled" : ""}`}>
                <p className="mock-title">Mock Tests</p>

                <div className="mock-buttons">
                  {[1, 2, 3, 4, 5].map((mockId) => (
                    <button
                      key={mockId}
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => startMock(m.moduleId, mockId)}
                    >
                      Mock {mockId}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
