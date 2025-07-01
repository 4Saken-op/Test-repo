import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ✅ import provider
import { Slide, ToastContainer } from "react-toastify";
import Spinner from "./components/Spinner";

const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const BookingPage = React.lazy(() => import("./pages/BookingPage"));
const MyBookings = React.lazy(() => import("./pages/myBookings"));
const App = React.lazy(() => import("./App"));

const queryClient = new QueryClient(); // ✅ initialize client

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {" "}
      {/* ✅ wrap your app here */}
      <BrowserRouter>
        <ToastContainer
          transition={Slide}
          hideProgressBar={true}
          position="bottom-center"
          autoClose={4000}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          theme="colored"
        />
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/my-bookings/:id" element={<MyBookings />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
