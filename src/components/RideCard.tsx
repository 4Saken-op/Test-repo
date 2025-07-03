import { Link } from "react-router-dom";
import type { Ride } from "../types/ride_type";

export default function RideCard({ ride }: { ride: Ride }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Ride with {ride.driver}
      </h2>
      <p className="text-gray-600 mb-1">
        <strong>ID:</strong> {ride.id}
      </p>
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
        <strong>Seats:</strong> {ride.seats}
      </p>

      <Link
        to={`/booking/${ride.id}?`}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Request Ride
      </Link>
    </div>
  );
}
