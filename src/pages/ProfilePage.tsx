import { useParams } from "react-router-dom";
import { getUserById } from "../queries/getUserByIdQuery";
import Spinner from "../components/Spinner";

export default function ProfilePage() {
  const { id } = useParams();
  const { data: currentUser, isLoading, error } = getUserById(id as string);

  if (isLoading) return <Spinner />;
  if (error)
    return <p className="p-6 text-red-600">Error loading user data.</p>;
  if (!currentUser) return <p className="p-6">User not found.</p>;
  console.log("🚀 ~ ProfilePage ~ currentUser:", currentUser);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">👤 User Profile</h1>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <p className="mb-4">
          <strong>Name:</strong> {currentUser.name}
        </p>
        <p className="mb-4">
          <strong>Email:</strong> {currentUser.email}
        </p>
        <p className="mb-4">
          <strong>Joined:</strong> {currentUser.joined}
        </p>
        <p className="mb-4">
          <strong>Bookings Count:</strong> {currentUser.bookings.length}
        </p>
        <p className="mb-4">
          <strong>Booking IDs:</strong>{" "}
          {currentUser.bookings.join(", ") || "None"}
        </p>
      </div>
    </div>
  );
}
