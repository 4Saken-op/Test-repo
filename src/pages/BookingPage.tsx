import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { currentUser } from "../data/users";
import { getAllRidesQuery } from "../queries/getAllRidesQuery";
import { useEffect } from "react";
import { getUserById } from "../queries/getUserByIdQuery";
import { updateUser } from "../mutations/updateUser";
import { updateRide } from "../mutations/updateRide";
import { useQueryClient } from "@tanstack/react-query";

export default function BookingPage() {
  // Log when the component mounts and unmounts
  useEffect(() => {
    console.log("Mounted BookingPage with ride:");
    return () => {
      console.log("Unmounted BookingPage");
    };
  }, []);

  const queryClient = useQueryClient();
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  const currentUserId = currentUser.id;

  const handleOnSuccess = () => {
    toast.success("✅ Booking confirmed!");
    navigate(`/my-bookings/${currentUserId}`);
  };

  const { rides } = getAllRidesQuery();
  const { data: user } = getUserById(currentUserId);

  const userMutate = updateUser();
  const rideMutate = updateRide();

  if (!rides || rides.length === 0) {
    return <p className="p-20">No rides available.</p>;
  }
  if (!user) {
    return <p className="p-20">User not found.</p>;
  }

  if (user.bookings.includes(id)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center max-w-md w-full">
          <p className="text-xl font-semibold text-green-700 mb-4 text-center">
            ✅ You have already booked this ride.
          </p>
          <Link
            to={`/my-bookings/${currentUserId}`}
            className="text-blue-600 underline text-lg hover:text-blue-800 transition"
          >
            View My Bookings
          </Link>
        </div>
      </div>
    );
  }
  const ride = rides.find((r: any) => Number(r.id) === Number(id));
  if (!ride) return <p className="p-6">Ride not found.</p>;

  const handleConfirm = async () => {
    try {
      await Promise.all([
        userMutate.mutateAsync({
          ...user,
          bookings: [...user.bookings, id],
        }),
        rideMutate.mutateAsync({ ...ride, seats: ride.seats - 1 }),
      ]);
      // Refetch data before navigating
      await queryClient.refetchQueries({ queryKey: ["rides"] });
      await queryClient.refetchQueries({ queryKey: ["users", currentUserId] });
      handleOnSuccess();
    } catch (error) {
      toast.error("❌ Booking failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Link to={`/`} className="absolute top-4 left-4 text-blue-600">
        Back to Home
      </Link>
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
          // disabled={isPending}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          "✅ Confirm Booking"
        </button>
      </div>
    </div>
  );
}
