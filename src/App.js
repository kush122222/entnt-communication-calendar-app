import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"; // Import Tailwind styles
import axios from "axios";
import CompanyList from "./components/Admin/CompanyList";
import CommunicationMethodList from "./components/Admin/CommunicationMethodList";
import DashboardTable from "./components/Users/DashboardTable";
import CalendarView from "./components/Users/CalendarView";
import NotificationPanel from "./components/Users/NotificationPanel";
import ReportingPage from "./components/Reporting/ReportingPage";
import CommunicationModel from "./components/Users/CommunicationModel";

// Toast Notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:5003/companies");
        setCompanies(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching companies:", error);
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <div className="App min-h-screen bg-fixed bg-cover bg-gradient-to-br from-blue-100 via-purple-100 to-pink-200">
        {/* Navigation Bar */}
        <nav className="bg-gradient-to-r from-blue-600 to-purple-700 p-4 text-white shadow-lg">
          <div className="container mx-auto">
            <ul className="flex justify-around space-x-6">
              <li>
                <a
                  href="/admin/companies"
                  className="hover:text-yellow-300 transition duration-300"
                >
                  Companies
                </a>
              </li>
              <li>
                <a
                  href="/admin/communication-methods"
                  className="hover:text-yellow-300 transition duration-300"
                >
                  Communication Methods
                </a>
              </li>
              <li>
                <a
                  href="/user/dashboard"
                  className="hover:text-yellow-300 transition duration-300"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/user/notifications"
                  className="hover:text-yellow-300 transition duration-300"
                >
                  Notifications
                </a>
              </li>
              <li>
                <a
                  href="/user/calendar"
                  className="hover:text-yellow-300 transition duration-300"
                >
                  Calendar
                </a>
              </li>
              <li>
                <a
                  href="/reports"
                  className="hover:text-yellow-300 transition duration-300"
                >
                  Reports
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Routes */}
        <div className="container mx-auto py-10">
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/companies" element={<CompanyList />} />
            <Route
              path="/admin/communication-methods"
              element={<CommunicationMethodList />}
            />

            {/* User Routes */}
            <Route path="/user/dashboard" element={<DashboardTable />} />
            <Route
              path="/user/notifications"
              element={<NotificationPanel companies={companies} />}
            />
            <Route
              path="/user/calendar"
              element={<CalendarView companies={companies} />}
            />
            <Route path="/user/communication" element={<CommunicationModel />} />

            {/* Reporting and Analytics Routes */}
            <Route path="/reports" element={<ReportingPage />} />

            {/* Default Route */}
            <Route
              path="*"
              element={
                <h1 className="text-center mt-10 text-3xl font-bold text-gray-800">
                  Welcome to the Communication App
                </h1>
              }
            />
          </Routes>
        </div>

        {/* Toast Notifications */}
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
