import { useQuery } from "@tanstack/react-query";
import type { Ride } from "../types/ride_type";

const getRides = async (): Promise<Ride[]> => {
  const response = await fetch("http://localhost:3001/rides");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getAllRidesQuery = () => {
  const { data: rides = [], isLoading } = useQuery<Ride[]>({
    queryKey: ["rides"],
    queryFn: getRides,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  return { rides, isLoadingRides: isLoading };
};
