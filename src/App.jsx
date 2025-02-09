import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { DarkModeProvider } from "./context/DarkModeContext";
import GlobalStyles from "./styles/GlobalStyles";
import { Toaster } from "react-hot-toast";

// Pages
import AppLayout from "./ui/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import Cabins from "./pages/Cabins";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Account from "./pages/Account";

import ProtectedRoute from "./ui/ProtectedRoute";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
        },
    },
});

function App() {
    return (
        <DarkModeProvider>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <GlobalStyles />
                <BrowserRouter>
                    <Routes>
                        <Route
                            element={
                                <ProtectedRoute>
                                    <AppLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route
                                index
                                element={<Navigate replace to="/dashboard" />}
                            />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/bookings" element={<Bookings />} />
                            <Route
                                path="/bookings/:bookingId"
                                element={<Booking />}
                            />
                            <Route
                                path="/checkin/:bookingId"
                                element={<Checkin />}
                            />
                            <Route path="/cabins" element={<Cabins />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/users" element={<Users />} />
                            <Route path="/account" element={<Account />} />
                        </Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </BrowserRouter>
                <Toaster
                    position="top-center"
                    gutter={12}
                    toastOptions={{
                        success: {
                            duration: 3000,
                        },
                        error: {
                            duration: 5000,
                        },
                        style: {
                            fontSize: "16px",
                            maxWidth: "500px",
                            padding: "16px 24px",
                            backgroundColor: "var(--color-grey-0)",
                            color: "var(--color-grey-700)",
                        },
                    }}
                />
            </QueryClientProvider>
        </DarkModeProvider>
    );
}

export default App;
