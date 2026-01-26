import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import SystemLogs from "./pages/SystemLogs";
import DriverDashboard from "./pages/DriverDashboard";
import PostLoad from "./pages/PostLoad";
import PostTruck from "./pages/PostTruck";
import Navbar from "./components/Navbar";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;
  if (role && role !== userRole) return <Navigate to="/login" />;

  return children;
};

const AppLayout = ({ children, role }) => (
  <ProtectedRoute role={role}>
    <Navbar />
    {children}
  </ProtectedRoute>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/"
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          }
        />

        <Route
          path="/admin"
          element={
            <AppLayout role="admin">
              <AdminDashboard />
            </AppLayout>
          }
        />

        <Route
          path="/superadmin"
          element={
            <AppLayout role="superadmin">
              <SuperAdminDashboard />
            </AppLayout>
          }
        />

        <Route
          path="/superadmin/logs"
          element={
            <AppLayout role="superadmin">
              <SystemLogs />
            </AppLayout>
          }
        />

        <Route
          path="/driver"
          element={
            <AppLayout role="driver">
              <DriverDashboard />
            </AppLayout>
          }
        />

        <Route
          path="/post-load"
          element={
            <AppLayout role="customer">
              <PostLoad />
            </AppLayout>
          }
        />

        <Route
          path="/post-truck"
          element={
            <AppLayout role="driver">
              <PostTruck />
            </AppLayout>
          }
        />

        <Route
          path="*"
          element={
            <div style={{ padding: "100px 20px", textAlign: "center", background: "#f3f4f6", minHeight: "100vh" }}>
              <h1 style={{ fontSize: "4rem", color: "#111827", margin: "0" }}>404</h1>
              <p style={{ fontSize: "1.5rem", color: "#4b5563", marginBottom: "30px" }}>Oops! The page you're looking for doesn't exist.</p>
              <Link to="/" style={{ padding: "12px 24px", background: "#2563eb", color: "#fff", borderRadius: "8px", textDecoration: "none", fontWeight: "600" }}>Go Back Home</Link>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
