import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import LandingPage from './pages/Landing';
import NotesPage from './pages/NotesPage';
import Calendar from './pages/Calendar';
import TaskListPage from './pages/TaskListPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/tasks" element={<TaskListPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;