import { useMutation } from "@tanstack/react-query";
import type { Ride } from "../types/ride_type";

export const updateRide = () => {
  return useMutation({
    mutationFn: async (ride: Ride) => {
      const patchRide = await fetch(`http://localhost:3001/rides/${ride.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ride),
      });
      if (!patchRide.ok) throw new Error("Failed to update ride");
      return await patchRide.json();
    },
  });
};
