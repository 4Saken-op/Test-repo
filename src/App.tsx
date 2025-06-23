import { useState } from "react";
import RideCard from "./components/RideCard";
import Sidebar from "./components/Sidebar";
import { rides } from "./data/rides";

export default function App() {
  const [selectedFrom, setSelectedFrom] = useState("");
  const [selectedTo, setSelectedTo] = useState("");

  // 🧠 Get unique "from" and "to" locations from rides
  const fromOptions = Array.from(new Set(rides.map((r) => r.from)));
  const toOptions = Array.from(new Set(rides.map((r) => r.to)));

  // 🔍 Filter rides by dropdown selections
  const filteredRides = rides.filter((ride) => {
    return (
      (selectedFrom === "" || ride.from === selectedFrom) &&
      (selectedTo === "" || ride.to === selectedTo)
    );
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Available Rides
        </h1>

        {/* 🚘 From & To Dropdown Filters */}
        <div className="flex gap-4 mb-6 flex-wrap">
          {/* FROM dropdown */}
          <select
            value={selectedFrom}
            onChange={(e) => setSelectedFrom(e.target.value)}
            className="px-4 py-2 border rounded-md shadow-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">From: All</option>
            {fromOptions.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>

          {/* TO dropdown */}
          <select
            value={selectedTo}
            onChange={(e) => setSelectedTo(e.target.value)}
            className="px-4 py-2 border rounded-md shadow-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">To: All</option>
            {toOptions.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* 🎯 Filtered Ride List */}
        <div className="grid gap-6 max-w-4xl">
          {filteredRides.length > 0 ? (
            filteredRides.map((ride) => <RideCard key={ride.id} ride={ride} />)
          ) : (
            <p className="text-gray-600">No rides match your selection.</p>
          )}
        </div>
      </main>
    </div>
  );
}
