export type Ride = {
  id: number;
  driver: string;
  from: string;
  to: string;
  seats: number;
  time: string;
};

export const rides: Ride[] = [
  {
    id: 1,
    driver: "Alice",
    from: "Downtown",
    to: "Tech Park",
    seats: 2,
    time: "9:00 AM",
  },
  {
    id: 2,
    driver: "Bob",
    from: "City Mall",
    to: "University",
    seats: 3,
    time: "8:30 AM",
  },
  {
    id: 3,
    driver: "Charlie",
    from: "Airport",
    to: "City Center",
    seats: 1,
    time: "10:15 AM",
  },
  {
    id: 4,
    driver: "Dana",
    from: "Suburb Station",
    to: "Downtown",
    seats: 4,
    time: "7:45 AM",
  },
  {
    id: 5,
    driver: "Evan",
    from: "City Center",
    to: "Tech Park",
    seats: 2,
    time: "11:00 AM",
  },
  {
    id: 6,
    driver: "Fiona",
    from: "Hilltop",
    to: "University",
    seats: 3,
    time: "8:00 AM",
  },
  {
    id: 7,
    driver: "George",
    from: "Lakeview",
    to: "Airport",
    seats: 2,
    time: "9:30 AM",
  },
  {
    id: 8,
    driver: "Hannah",
    from: "Old Town",
    to: "Downtown",
    seats: 1,
    time: "7:00 AM",
  },
  {
    id: 9,
    driver: "Ian",
    from: "Train Station",
    to: "Tech Park",
    seats: 4,
    time: "8:15 AM",
  },
  {
    id: 10,
    driver: "Jane",
    from: "Suburb Station",
    to: "City Mall",
    seats: 3,
    time: "10:45 AM",
  },
];
