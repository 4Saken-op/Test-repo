import { Home, Car, User, Settings } from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: <Home size={18} />, path: "/" },
  { label: "Rides", icon: <Car size={18} />, path: "/rides" },
  { label: "Profile", icon: <User size={18} />, path: "/profile" },
  { label: "Settings", icon: <Settings size={18} />, path: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-white shadow-md border-r border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-8">🚗 Carpool</h2>

      <nav className="space-y-4">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.path}
            className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition"
          >
            {item.icon}
            <span className="text-md font-medium">{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
