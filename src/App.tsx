import type { Ride } from "./components/RideCard";
import RideCard from "./components/RideCard";
import Sidebar from "./components/Sidebar";
const rides: Ride[] = [
  {
    id: 1,
    driver: "Alice",
    from: "Downtown",
    to: "Tech Park",
    seats: 2,
    time: "9:00 AM",
  },
  {
    id: 2,
    driver: "Bob",
    from: "City Mall",
    to: "University",
    seats: 3,
    time: "8:30 AM",
  },
  {
    id: 3,
    driver: "Charlie",
    from: "Airport",
    to: "City Center",
    seats: 1,
    time: "10:15 AM",
  },
];

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Available Rides
        </h1>

        <div className="grid gap-6 max-w-4xl">
          {rides.map((ride) => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </div>
      </main>
    </div>
  );
}
