import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/Landing';
import NotesPage from './pages/NotesPage';
import Calendar from './pages/Calendar';
import TaskListPage from './pages/TaskListPage';
import './App.css';
import HomePage from './pages/Home';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/tasks" element={<TaskListPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
        <ShowSidebar />
      </Router>
    </div>
  );
}

function ShowSidebar() {
  const location = useLocation();
  const hideSidebarPaths = ['/'];

  if (hideSidebarPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <div
      className="position-fixed bottom-0 end-0"
      style={{ padding: "2rem" }}
    >
      <Sidebar />
    </div>
  );
}

export default App;
