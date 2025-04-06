import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import RoutesMain from "./routes/routesmain";
import AuthProvider from "./context/auth-context.jsx";
import InstructorProvider from "./context/instructor-context";
import StudentProvider from "./context/student-context";
import { ToastContainer } from "react-toastify";
import { AdminProvider } from "./context/admin-context";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <AuthProvider>
    <InstructorProvider>
      <StudentProvider>
        <AdminProvider> {/* ✅ ADD THIS */}
          <RoutesMain />
          <ToastContainer autoClose={3000} />
        </AdminProvider>
      </StudentProvider>
    </InstructorProvider>
  </AuthProvider>
</BrowserRouter>
);
