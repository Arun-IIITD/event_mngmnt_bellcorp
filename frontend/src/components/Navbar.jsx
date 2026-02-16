import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md flex justify-between items-center">
      <Link to="/events" className="font-bold text-2xl hover:text-gray-200">
        EventPlatform
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link to="/dashboard" className="hover:text-gray-200">
              User's Dashboard
            </Link>

            {/* Create Event Button */}
            {/* <Link
              to="/create-event"
              className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
            >
              Create Event
            </Link> */}

            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-200">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
