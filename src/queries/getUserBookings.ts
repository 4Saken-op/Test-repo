import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Ride } from "../types/ride_type";
import type { Users } from "../types/user_type";

export const getUserBookingsQuery = (userId: string) => {
  const queryClient = useQueryClient();

  return useQuery<Ride[]>({
    queryKey: ["user-bookings", userId],
    queryFn: async () => {
      const user: Users | undefined = queryClient.getQueryData([
        "users",
        userId,
      ]);
      console.log("🚀 ~ Cached user:", user);

      const bookingIds: string[] = user?.bookings || [];
      console.log("🚀 ~ queryFn: ~ bookingIds:", bookingIds);

      const allRides = queryClient.getQueryData<Ride[]>(["rides"]);
      console.log("🚀 ~ Cached rides:", allRides);

      if (!allRides) {
        console.log(
          "🚀 ~ queryFn: ~ No cached rides found, returning empty array"
        );
        return [];
      }
      const filterRides = allRides.filter((ride) =>
        bookingIds.includes(ride.id)
      );
      console.log("🚀 ~ queryFn: ~ filterRides:", filterRides);

      return filterRides;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
