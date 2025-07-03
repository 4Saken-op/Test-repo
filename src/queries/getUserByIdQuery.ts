import { useQuery } from "@tanstack/react-query";
import type { Users } from "../types/user_type";

export const getUserById = (id: string) => {
  return useQuery<Users>({
    queryKey: ["users", id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3001/users/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    // staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
