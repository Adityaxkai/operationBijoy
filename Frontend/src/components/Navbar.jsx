import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Button, Dropdown } from "react-bootstrap";
import logo from '../assets/Picture2.png'; // ✅ Use proper image import
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/login');
    setMenuOpen(false);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/members', label: 'Members' },
    { path: '/events', label: 'Events' },
    { path: '/coaching', label: 'Coaching' },
    { path: '/finances', label: 'Finances' },
    { path: '/attendance', label: 'Attendance' },
  ];

  if (isLoggedIn) {
    navLinks.push({ path: '/admin', label: 'Admin' });
  }

  return (
    <header className="navbar-header shadow-sm" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <div className="container py-3 d-flex justify-content-between align-items-center">
        {/* Logo + Title */}
        <div className="d-flex align-items-center">
          <img
            src={logo}
            alt="Bijoy Institute Logo"
            style={{ height: '60px', cursor: 'pointer', transition: 'transform 0.2s' }}
            onClick={() => navigate('/')}
            onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')}
          />
          <h1 className="ms-3 fs-4 fw-bold mb-0 text-dark">Bijoy Institute</h1>
        </div>

        {/* Desktop Nav */}
        <nav className="d-none d-md-flex align-items-center">
          <ul className="nav mb-0">
            {navLinks.map(({ path, label }) => (
              <li className="nav-item" key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `nav-link fw-bold px-3 py-2 rounded ${isActive ? 'text-primary' : 'text-dark'}`
                  }
                  style={{ fontSize: '1.6rem' }}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="ms-4">
            {isLoggedIn ? (
              <Dropdown>
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic" className="fs-5">
                  <i className="bi bi-person-circle me-2"></i>Account
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate('/profile')}>
                    <i className="bi bi-person me-2"></i> Profile
                  </Dropdown.Item>
                  <Dropdown.Item className="text-danger" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button onClick={() => navigate('/login')} className="fs-5 px-4 py-2">
                <i className="bi bi-box-arrow-in-right me-2"></i>Login
              </Button>
            )}
          </div>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={toggleMenu}
          className="btn btn-outline-secondary d-md-none"
          style={{ width: '44px', height: '44px' }}
        >
          <RxHamburgerMenu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="d-md-none bg-white p-4 shadow-sm">
          <ul className="nav flex-column">
            {navLinks.map(({ path, label }) => (
              <li className="nav-item" key={path}>
                <NavLink
                  to={path}
                  className="nav-link fw-medium py-2"
                  style={{ fontSize: '1.1rem' }}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-3 d-grid gap-2">
            {isLoggedIn ? (
              <>
                <Button variant="outline-primary" onClick={() => { navigate('/profile'); setMenuOpen(false); }}>
                  <i className="bi bi-person me-2"></i>Profile
                </Button>
                <Button variant="danger" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>Logout
                </Button>
              </>
            ) : (
              <Button variant="primary" onClick={() => { navigate('/login'); setMenuOpen(false); }}>
                <i className="bi bi-box-arrow-in-right me-2"></i>Login
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
