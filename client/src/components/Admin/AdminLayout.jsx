import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Mobile Toggle Button */}
      <div className="flex md:hidden px-4 bg-gray-900 text-white z-20">
        <button onClick={toggleSidebar} className="p-2">
          <FaBars size={24} />
        </button>
        <h1 className="ml-4 text-xl font-medium">Admin</h1>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-10"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`bg-gray-900 w-64 min-h-screen text-white absolute md:relative transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 md:static md:block ease-in-out z-20`}
      >
        <AdminSidebar toggleSidebar={toggleSidebar} />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
