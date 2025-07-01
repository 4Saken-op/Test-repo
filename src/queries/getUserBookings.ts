import { useQuery } from "@tanstack/react-query";

type Ride = {
  id: number;
  driver: string;
  from: string;
  to: string;
  time: string;
  seats: number;
};

const getUserBookings = async (userId: number): Promise<Ride[]> => {
  // Step 1: Get user
  const userRes = await fetch(`http://localhost:3001/users/${userId}`);
  if (!userRes.ok) {
    throw new Error("Failed to fetch user data");
  }
  const user = await userRes.json();

  const bookingIds: number[] = user.bookings || [];

  // Step 2: Get each ride info
  const ridePromises = bookingIds.map((rideId) =>
    fetch(`http://localhost:3001/rides/${rideId}`).then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch ride with id ${rideId}`);
      }
      return res.json();
    })
  );

  // Step 3: Return all resolved rides
  return Promise.all(ridePromises);
};

export const getUserBookingsQuery = (userId: number) => {
  return useQuery<Ride[]>({
    queryKey: ["user-bookings", userId],
    queryFn: () => getUserBookings(userId),
  });
};
