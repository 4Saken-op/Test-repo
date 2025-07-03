import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Users } from "../types/user_type";

type BookingPayload = {
  userId: string;
  rideId: string;
};

export const updateBooking = (handleOnSuccess: any) => {
  const queryClient = useQueryClient();

  const bookRide = async ({ userId, rideId }: BookingPayload) => {
    const user: Users | undefined = queryClient.getQueryData([
      "users",
      userId,
    ] as any);
    const rides = (queryClient.getQueryData(["rides"]) as any[]) || [];
    console.log("🚀 ~ cached ~ user:", user);
    console.log("🚀 ~ cached ~ rides:", rides);

    if (!user || !rides || !Array.isArray(rides))
      throw new Error("User or Ride not found");

    const ride = rides.find((r) => r.id === rideId);
    if (!ride) throw new Error("Ride not found");
    if (user.bookings.includes(rideId)) return user;
    if (ride.seats <= 0) throw new Error("No seats available");

    const updatedBookings = [...user.bookings, String(rideId)];

    const patchUser = fetch(`http://localhost:3001/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookings: updatedBookings }),
    });

    const patchRide = fetch(`http://localhost:3001/rides/${rideId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seats: ride.seats - 1 }),
    });

    const [userUpdated, rideUpdated] = await Promise.all([
      patchUser,
      patchRide,
    ]);

    if (!userUpdated.ok || !rideUpdated.ok)
      throw new Error("Failed to update user or ride");

    return await userUpdated.json();
  };

  return useMutation({
    mutationFn: bookRide,
    onSuccess: (data) => {
      console.log({ data });
      // queryClient.invalidateQueries({ queryKey: ["users", data.id] });
      // queryClient.invalidateQueries({ queryKey: ["rides"] });
      // queryClient.invalidateQueries({
      //   queryKey: ["user-bookings", data.id],
      // });

      if (handleOnSuccess) {
        // handleOnSuccess();
      }
    },
  });
};

// const queryClient = useQueryClient();

// const bookRide = async ({ userId, rideId }: BookingPayload) => {
//   // // Step 1: Get the current user
//   // const res = await fetch(`http://localhost:3001/users/${userId}`);
//   // if (!res.ok) throw new Error("Failed to fetch user");
//   // const user = await res.json();

//   // // Step 2: Get the ride
//   // const rideRes = await fetch(`http://localhost:3001/rides/${rideId}`);
//   // if (!rideRes.ok) throw new Error("Failed to fetch ride");
//   // const ride = await rideRes.json();

//   // Step 1: Get data from cache
//   const user: Users | undefined = queryClient.getQueryData(["users", userId]);
//   console.log("🚀 ~ cached ~ user:", user);
//   const rides = queryClient.getQueryData(["rides"]);
//   console.log("🚀 ~ cached ~ rides:", rides);

//   // Step 2: Validate
//   if (!user || !rides) throw new Error("User or Ride not found in cache");
//   if (!Array.isArray(rides)) {
//     throw new Error("Rides data not found. Please ensure rides are loaded.");
//   }
//   const ride = rides?.find((r) => r.id === rideId);
//   if (!ride) throw new Error("Ride not found");

//   // Step 3: Check if already booked or seats are 0
//   const alreadyBooked = user.bookings.includes(rideId);
//   if (alreadyBooked) return user;

//   if (ride.seats <= 0) throw new Error("No seats available");

//   // Step 4: Update user bookings
//   const updatedBookings = [...user.bookings, rideId];

//   const patchUser = fetch(`http://localhost:3001/users/${userId}`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ bookings: updatedBookings }),
//   });

//   // Step 5: Update ride seat count
//   const patchRide = fetch(`http://localhost:3001/rides/${rideId}`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ seats: ride.seats - 1 }),
//   });

//   // Step 6: Wait for both to complete
//   const [userUpdated, rideUpdated] = await Promise.all([patchUser, patchRide]);

//   if (!userUpdated.ok || !rideUpdated.ok)
//     throw new Error("Failed to update user or ride");

//   return await userUpdated.json(); // Return updated user
// };

// export const updateBooking = () => {
//   return useMutation({
//     mutationFn: bookRide,
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({ queryKey: ["users", data.id] });
//       queryClient.invalidateQueries({ queryKey: ["rides"] }); // Refresh rides data
//     },
//   });
// };
