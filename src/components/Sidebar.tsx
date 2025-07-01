import { Link } from "react-router-dom";
import { currentUser } from "../data/users";

export default function Sidebar() {
  return (
    <div className="w-64 bg-blue-800 text-white min-h-screen p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-8">🚗 Carpool</h2>

      <nav className="space-y-2">
        <Link
          to="/"
          className="block px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Home
        </Link>
        <Link
          to={"/profile/" + currentUser.id}
          className="block px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Profile
        </Link>
        <Link
          to={"/my-bookings/" + currentUser.id}
          className="block px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          My Bookings
        </Link>
      </nav>
    </div>
  );
}
