import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { logout, user } = useAuth();
  return (
    <nav>
      <Link to="/">Homepage</Link>
      <Link to="/entries">all entries</Link>
      {user ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/create-entry">create entry</Link>
          <Link to="/my-entries"> my entries </Link>
          <button onClick={logout}>Sign Out</button>
        </>
      ) : (
        <>
          <Link to="/sign-up">Sign Up</Link>
          <Link to="/sign-in">Sign In</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
