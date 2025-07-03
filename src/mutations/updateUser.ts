import { useMutation } from "@tanstack/react-query";
import type { Users } from "../types/user_type";

export const updateUser = () => {
  return useMutation({
    mutationFn: async (user: Users) => {
      const patchUser = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!patchUser.ok) throw new Error("Failed to update user");
      return await patchUser.json();
    },
  });
};
