import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { Members } from './pages/Members';
import { Events } from './pages/Events';
import { Coaching } from './pages/Coaching';
import { Finances } from './pages/Finances';
import { Attendance } from './pages/Attendance';
import { Navbar } from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Signup from './pages/Signup';
import AuthChecker from './Wrapper/AuthChecker';
<<<<<<< HEAD
import Profile from './components/Profile';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import AdminPanel from './components/AdminPanel';
=======
import { AdminPanel } from './pages/AdminPanel'; // Import AdminPanel

>>>>>>> be8619c (AdminpanlAdd)
// A wrapper to conditionally show components based on route
function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/signup';

  
  return (
    <>
        {!isLoginPage && <Navbar />} {/* Hide Navbar on login/signup */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/members" element={<Members />} />
          <Route path="/events" element={<Events />} />
          <Route path="/coaching" element={<Coaching />} />
          <Route path="/finances" element={<Finances />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/register" element={<Register />} />
<<<<<<< HEAD
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<div>404 Not Found</div>} />
=======
           <Route path="/admin" element={<AdminPanel />} /> {/* Add Admin route */}
>>>>>>> be8619c (AdminpanlAdd)
        </Routes>
    </>
  );
} 

// kch khass nhi admin panned add kr rhe the nhi ho rha


function App() {
  return (
    <AuthChecker>
      <AppContent />
    </AuthChecker>
  );
}


export default App;