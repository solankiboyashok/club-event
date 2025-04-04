import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ClubDashboard from './pages/Club/ClubDashboard';
import EventDashboard from './pages/EventD/EventDashboard';
import EventDetails from "./pages/EventD/EventDetails";
import ManageAccount from './pages/ManageAccount';
import ClubDetails from "./pages/Club/ClubDetail";
import ClubRegistration from "./pages/Club/ClubRegistration";
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminLogin from './pages/Admin/AdminLogin';
import SubAdminDashboard from './pages/Subadmin/Subadmindashboard';
import UserManagement from './pages/Admin/UserManagement';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clubs" element={<ClubDashboard/>}/>
        <Route path="/events" element={<EventDashboard/>}/>
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/manage-account" element={<ManageAccount />} />
        <Route path="/clubs/:id" element={<ClubDetails />} />
        <Route path="/Clubregister/:id" element={<ClubRegistration />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-login" element={<AdminLogin/>} />
        
        <Route path="/admin-users" element={<UserManagement />} />


        <Route path="/subadmin" element={<SubAdminDashboard/>} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;