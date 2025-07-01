import { useParams, useNavigate } from "react-router-dom";
import { getAllRidesQuery } from "../queries/getAllRidesQuery";
import { toast } from "react-toastify";
import { useBookRide } from "../queries/updateBookings";

export default function BookingPage() {
  const { data: rides = [] } = getAllRidesQuery();
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUserId = 1; // 🔁 Replace with real user logic if needed

  const ride = rides.find((r) => Number(r.id) === Number(id));
  const { mutate, isPending } = useBookRide();

  if (!ride) return <p className="p-6">Ride not found.</p>;

  const handleConfirm = () => {
    mutate(
      { userId: currentUserId, rideId: ride.id },
      {
        onSuccess: () => {
          toast.success("✅ Booking confirmed!");
          navigate(`/my-bookings/${currentUserId}`);
        },
        onError: (error) => {
          console.error("Booking failed:", error);
          toast.error("❌ Booking failed. Please try again.");
        },
      }
    );
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
          disabled={isPending}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          {isPending ? "Booking..." : "✅ Confirm Booking"}
        </button>
      </div>
    </div>
  );
}
