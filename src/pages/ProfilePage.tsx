import { currentUser } from "../data/users";

export default function ProfilePage() {
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
          <strong>Bookings:</strong> {currentUser.bookings.length}
        </p>
      </div>
    </div>
  );
}
