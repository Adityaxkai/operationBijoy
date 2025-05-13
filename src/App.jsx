import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { Members } from './pages/Members';
import { Events } from './pages/Events';
import { Coaching } from './pages/Coaching';
import { Finances } from './pages/Finances';
import { Attendance } from './pages/Attendance';
import { Navbar } from './components/Navbar';
import { Login } from './pages/Login';       // 👈 Import Login page
import { Signup } from './pages/Signup';     // 👈 Import Signup page

function AppContent() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<Members />} />
        <Route path="/events" element={<Events />} />
        <Route path="/coaching" element={<Coaching />} />
        <Route path="/finances" element={<Finances />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/login" element={<Login />} />     {/* 👈 Login route */}
        <Route path="/signup" element={<Signup />} />   {/* 👈 Signup route */}
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
