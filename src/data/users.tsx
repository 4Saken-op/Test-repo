import type { Ride } from "../types/ride_type";

export type User = {
  id: number;
  name: string;
  email: string;
  joined: string;
  bookings: Ride[];
};

export const currentUser: User = {
  id: 1,
  name: "Erwin Jose",
  email: "erwin@example.com",
  joined: "Jan 2025",
  bookings: [],
};
