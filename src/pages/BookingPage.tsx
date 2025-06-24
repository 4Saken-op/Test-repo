import { useParams, useNavigate } from "react-router-dom";
import { rides } from "../data/rides";
import { currentUser } from "../data/users";

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const ride = rides.find((r) => r.id === Number(id));

  if (!ride) return <p className="p-6">Ride not found.</p>;

  const handleConfirm = () => {
    // Save to bookings (could be localStorage or backend in real app)
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.push({ ...ride, user: currentUser.name });
    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert("✅ Booking confirmed!");
    navigate("/my-bookings");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
          Confirm Your Ride
        </h2>
        <p className="mb-2">
          <strong>Driver:</strong> {ride.driver}
        </p>
        <p className="mb-2">
          <strong>From:</strong> {ride.from}
        </p>
        <p className="mb-2">
          <strong>To:</strong> {ride.to}
        </p>
        <p className="mb-2">
          <strong>Time:</strong> {ride.time}
        </p>
        <p className="mb-4">
          <strong>Seats Available:</strong> {ride.seats}
        </p>

        <button
          onClick={handleConfirm}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          ✅ Confirm Booking
        </button>
      </div>
    </div>
  );
}
