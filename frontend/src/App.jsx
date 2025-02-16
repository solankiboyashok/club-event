import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ClubDashboard from './pages/ClubDashboard';
import EventDashboard from './pages/EventDashboard';
import EventPage from "./pages/EventPage";
import ManageAccount from './pages/ManageAccount';
import ClubDetails from "./pages/ClubDetails";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clubs" element={<ClubDashboard/>}/>
        <Route path="/events" element={<EventDashboard/>}/>
        <Route path="/event/:eventId" element={<EventPage />} />
        <Route path="/manage-account" element={<ManageAccount />} />
        <Route path="/club/:id" element={<ClubDetails />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;