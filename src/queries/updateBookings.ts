// src/mutations/useBookRide.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

type BookingPayload = {
  userId: number;
  rideId: number;
};

const bookRide = async ({ userId, rideId }: BookingPayload) => {
  // Step 1: Get the current user
  const res = await fetch(`http://localhost:3001/users/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  const user = await res.json();

  // Step 2: Update bookings list
  const updatedBookings = user.bookings.includes(rideId)
    ? user.bookings
    : [...user.bookings, rideId];

  // Step 3: PATCH user
  const patchRes = await fetch(`http://localhost:3001/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bookings: updatedBookings }),
  });

  if (!patchRes.ok) throw new Error("Failed to update bookings");

  return await patchRes.json(); // Updated user
};

export const useBookRide = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookRide,
    onSuccess: (data) => {
      // Optional: Invalidate any user-related queries
      queryClient.invalidateQueries({ queryKey: ["users", data.id] });
    },
  });
};
