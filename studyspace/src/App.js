import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import LandingPage from "./pages/Landing";
import NotesPage from "./pages/NotesPage";
import Calendar from "./pages/Calendar";
import TaskListPage from "./pages/TaskListPage";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <NotesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <TaskListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ShowSidebar />
      </Router>
    </div>
  );
}

function ShowSidebar() {
  const location = useLocation();
  const hideSidebarPaths = ["/", "/login", "/signup"];

  if (hideSidebarPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <div className="position-fixed bottom-0 end-0" style={{ padding: "2rem" }}>
      <Sidebar />
    </div>
  );
}

export default App;