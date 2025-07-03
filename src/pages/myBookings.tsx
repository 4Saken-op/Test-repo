import { useQueryClient } from "@tanstack/react-query";
import Sidebar from "../components/Sidebar";
import { currentUser } from "../data/users";
import type { Users } from "../types/user_type";
import type { Ride } from "../types/ride_type";

export default function MyBookings() {
  const queryClient = useQueryClient();
  const userId = currentUser.id;
  const user: Users | undefined = queryClient.getQueryData(["users", userId]);
  console.log("🚀 ~ Cached user:", user);

  const bookingIds: string[] = user?.bookings || [];
  console.log("🚀 ~ queryFn: ~ bookingIds:", bookingIds);

  const allRides = queryClient.getQueryData<Ride[]>(["rides"]) || [];
  console.log("🚀 ~ Cached rides:", allRides);

  // const bookings = getUserBookingsQuery(currentUser.id).data || [];
  const bookings = allRides.filter((ride) => bookingIds.includes(ride.id));
  console.log("🚀 ~ MyBookings ~ Recieved bookings:", bookings);

  if (bookings.length === 0) {
    return <p className="p-6 text-center">You have no bookings yet.</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="min-h-screen w-400 p-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">
          📋 My Bookings
        </h1>
        <div className="grid gap-4 max-w-3xl mx-auto">
          {bookings.map((ride: any, index: any) => (
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
    </div>
  );
}
