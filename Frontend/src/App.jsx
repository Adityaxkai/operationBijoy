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
import Profile from './components/Profile';
import "bootstrap-icons/font/bootstrap-icons.css";
import AdminPanel from './components/AdminPanel';
import AdmissionForm from './pages/AdmissionForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/signup';
  const isAdmission=location.pathname === '/admission';
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPanel />} />
          {isAdmission?null:<Route path="*" element={<div>404 Not Found</div>} />}
        </Routes>
    </>
  );
}

function App() {
  return (
    <>
    <AuthChecker>
      <AppContent />
    </AuthChecker>
    <Routes>
      <Route path='/admission' element={<AdmissionForm />} />
    </Routes>
    </>
  );
}


export default App;