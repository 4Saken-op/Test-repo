import { Link } from "react-router-dom";

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
          to="/profile"
          className="block px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Profile
        </Link>
      </nav>
    </div>
  );
}
