import RideCard, { type Ride } from "./components/RideCard";

const rides: Ride[] = [
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
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
        🚗 Carpooling App
      </h1>

      <div className="max-w-3xl mx-auto grid gap-6">
        {rides.map((ride) => (
          <RideCard key={ride.id} ride={ride} />
        ))}
      </div>
    </div>
  );
}
