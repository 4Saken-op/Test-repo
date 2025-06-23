type Ride = {
  id: number;
  driver: string;
  from: string;
  to: string;
  seats: number;
  time: string;
};

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
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
        🚗 Carpool App
      </h1>

      <div className="max-w-3xl mx-auto grid gap-6">
        {rides.map((ride) => (
          <div
            key={ride.id}
            className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Ride with {ride.driver}
            </h2>
            <p className="text-gray-600 mb-1">
              <strong>From:</strong> {ride.from}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>To:</strong> {ride.to}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Time:</strong> {ride.time}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Available Seats:</strong> {ride.seats}
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Request Ride
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
