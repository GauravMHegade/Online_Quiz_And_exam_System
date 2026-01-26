import { useEffect, useState } from "react";
import { getModules } from "../services/api";
import { useNavigate } from "react-router-dom";

function Home() {
  const [modules, setModules] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    getModules().then(setModules);
  }, []);

  const openModule = (id) => {
    const user = sessionStorage.getItem("user");
    if (!user) nav("/login");
    else nav(`/quiz/${id}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">CDAC DAC – Online Quiz</h2>

      <div className="row">
        {modules.map(m => (
          <div className="col-md-4 mb-3" key={m.moduleId}>
            <div className="card h-100">
              <div className="card-body text-center">
                <h5 className="card-title">{m.moduleName}</h5>
                <button
                  className="btn btn-success"
                  onClick={() => openModule(m.moduleId)}
                >
                  Start Test
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
