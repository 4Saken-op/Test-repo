export default function MyBookings() {
  const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

  if (bookings.length === 0) {
    return <p className="p-6 text-center">You have no bookings yet.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">📋 My Bookings</h1>
      <div className="grid gap-4 max-w-3xl mx-auto">
        {bookings.map((ride, index) => (
          <div key={index} className="bg-white shadow p-4 rounded-lg">
            <p>
              <strong>Driver:</strong> {ride.driver}
            </p>
            <p>
              <strong>From:</strong> {ride.from}
            </p>
            <p>
              <strong>To:</strong> {ride.to}
            </p>
            <p>
              <strong>Time:</strong> {ride.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
