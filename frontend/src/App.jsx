import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ClubDashboard from './pages/ClubDashboard';
import EventDashboard from './pages/EventDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clubs" element={<ClubDashboard/>}/>
        <Route path="/events" element={<EventDashboard/>}/>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;