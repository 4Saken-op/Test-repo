export type Ride = {
  id: number;
  driver: string;
  from: string;
  to: string;
  seats: number;
  time: string;
};

type RideCardProps = {
  ride: Ride;
};

function RideCard({ ride }: RideCardProps) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
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
  );
}
export default RideCard;
