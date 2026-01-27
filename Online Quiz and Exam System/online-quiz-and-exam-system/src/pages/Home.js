import { useEffect, useState } from "react";
import { getModules } from "../services/api";
import { useNavigate } from "react-router-dom";

function Home() {
  const [modules, setModules] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    getModules().then(setModules);
  }, []);

  const ensureLogin = () => {
    const user = sessionStorage.getItem("user");
    if (!user) {
      nav("/login");
      return false;
    }
    return true;
  };

  return (
    <div className="container mt-4">

      <h2 className="text-center mb-4">
        CDAC DAC – Online Quiz & Mock Tests
      </h2>

      <div className="row">
        {modules.map(m => (
          <div className="col-md-4 mb-4" key={m.moduleId}>
            <div className="card h-100 shadow-sm">

              <div className="card-body text-center">

                <h5 className="card-title mb-3">
                  {m.moduleName}
                </h5>

                {/* ================= PRACTICE TEST ================= */}
                <button
                  className="btn btn-success w-100 mb-2"
                  onClick={() => {
                    if (ensureLogin()) {
                      nav(`/quiz/${m.moduleId}`);
                    }
                  }}
                >
                  Practice Test (Learning Mode)
                </button>

                <hr />

                {/* ================= MOCK TESTS ================= */}
                <h6 className="mb-2">Mock Tests</h6>

                {[1, 2, 3, 4, 5].map(mockId => (
                  <button
                    key={mockId}
                    className="btn btn-outline-primary btn-sm m-1"
                    onClick={() => {
                      if (ensureLogin()) {
                        nav(`/mock/${m.moduleId}/${mockId}`);
                      }
                    }}
                  >
                    Mock {mockId}
                  </button>
                ))}

              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Home;
