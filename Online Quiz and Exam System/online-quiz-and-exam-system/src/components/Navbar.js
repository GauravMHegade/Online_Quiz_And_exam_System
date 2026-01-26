import { useNavigate } from "react-router-dom";

function Navbar() {
  const nav = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span
        className="navbar-brand"
        style={{ cursor: "pointer" }}
        onClick={() => nav("/")}
      >
        CDAC Quiz System
      </span>

      <span className="text-white">
        {user ? `Welcome, ${user.fullName}` : "Guest"}
      </span>
    </nav>
  );
}

export default Navbar;
