import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../asset/Logo.png";
import { refreshToken, logoutUser } from "../../Services/authService";

const Navbar = () => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const loadUser = async () => {
      const result = await refreshToken(navigate);

      if (result.success) {
        setUser(result.user);
      }
    };

    loadUser();
  }, [navigate]);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  const logout = async () => {
    await logoutUser(navigate);
  };

  const initial = user.name
    ? user.name.charAt(0).toUpperCase()
    : "U";

  return (
    <nav className="navbar is-light" role="navigation">
      <div className="container is-fluid">
        {/* Logo */}
        <div className="navbar-brand">
          <Link to="/dashboard" className="navbar-item">
            <img
              src={Logo}
              alt="logo"
              style={{
                height: "40px",
                width: "auto",
              }}
            />
          </Link>
        </div>

        {/* Menu */}
        <div
          className="navbar-menu is-active"
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div className="navbar-start">
            <Link to="/dashboard" className="navbar-item">
              Home
            </Link>
            <Link to="/users" className="navbar-item">
              Users
            </Link>
            <Link to="/register" className="navbar-item">
              Register
            </Link>
            <Link to="/employee" className="navbar-item">
              Employee
            </Link>
            <Link to="/product" className="navbar-item">
              Product
            </Link>
            <Link to="/customer" className="navbar-item">
              Customer
            </Link>
            <Link to="/events" className="navbar-item">
              Events
            </Link>
          </div>

          {/* Profile Dropdown */}
          <div
            className="navbar-end"
            ref={dropdownRef}
            style={{ position: "relative" }}
          >
            <div className="navbar-item">
              <button
                onClick={() =>
                  setIsDropdownOpen(!isDropdownOpen)
                }
                className="button is-white"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    background: "#363636",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                  }}
                >
                  {initial}
                </span>

                <span>{user.name}</span>
              </button>

              {isDropdownOpen && (
                <div
                  className="box"
                  style={{
                    position: "absolute",
                    top: "60px",
                    right: 0,
                    minWidth: "220px",
                    zIndex: 100,
                  }}
                >
                  <p>
                    <strong>{user.name}</strong>
                  </p>

                  <p
                    style={{
                      fontSize: "12px",
                      marginBottom: "10px",
                    }}
                  >
                    {user.email}
                  </p>

                  <hr />

                  <Link
                    to="/userprofile"
                    className="dropdown-item"
                    onClick={() =>
                      setIsDropdownOpen(false)
                    }
                  >
                    Profile
                  </Link>

                  <button
                    onClick={logout}
                    className="button is-danger is-light is-fullwidth mt-2"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;