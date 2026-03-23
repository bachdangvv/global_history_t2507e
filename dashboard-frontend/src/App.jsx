import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard.jsx";
import UserDashboard from "./UserDashboard.jsx";
import "./App.css";

export default function App() {
  return (
    <div className="workspace-frame">
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
      </Routes>
    </div>
  );
}
