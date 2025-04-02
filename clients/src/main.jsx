import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import RoutesMain from "./routes/routesmain";
import AuthProvider from "./context/auth-context.jsx";
import InstructorProvider from "./context/instructor-context";
import StudentProvider from "./context/student-context";
import { ToastContainer } from "react-toastify";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <InstructorProvider>
        <StudentProvider>
          <RoutesMain />
          {/* <App /> */}
          <ToastContainer autoClose={3000} />
        </StudentProvider>
      </InstructorProvider>
    </AuthProvider>
  </BrowserRouter>
);
