import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ✅ import provider
import { Slide, ToastContainer } from "react-toastify";
import Spinner from "./components/Spinner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const BookingPage = React.lazy(() => import("./pages/BookingPage"));
const MyBookings = React.lazy(() => import("./pages/myBookings"));
const App = React.lazy(() => import("./App"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min
      refetchOnWindowFocus: false, // optional: disable refetch on tab focus
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
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
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/my-bookings/:id" element={<MyBookings />} />
            <Route path="/" element={<App />} />
          </Routes>
        </Suspense>
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
