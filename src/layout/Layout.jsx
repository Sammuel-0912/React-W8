import { Outlet, Link, NavLink } from "react-router-dom";
import '../assets/all.scss';

const Layout = () => {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg sticky-top"
        style={{
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <div className="container">
          <Link
            className="navbar-brand fw-semibold"
            style={{ color: "#4a5568" }}
            to="/"
          >
            Sam's Store
          </Link>

          <div className="navbar-nav ms-auto">
            <NavLink
              className="nav-item nav-link me-4"
              to="/products"
              style={({ isActive }) => ({
                color: isActive ? "#38b2ac" : "#718096",
                fontWeight: isActive ? "600" : "400",
              })}
            >
              Products
            </NavLink>

            <NavLink
              className="nav-item nav-link"
              to="/cart"
              style={({ isActive }) => ({
                color: isActive ? "#38b2ac" : "#718096",
                fontWeight: isActive ? "600" : "400",
              })}
            >
              Cart
            </NavLink>
          </div>
        </div>
      </nav>

      <main
        style={{
          minHeight: "calc(100vh - 160px)",
          backgroundColor: "#f8fafc",
          padding: "40px 0",
        }}
      >
        <div className="container">
          <Outlet />
        </div>
      </main>

      <footer
        style={{
          backgroundColor: "#edf2f7",
          padding: "30px 0",
        }}
      >
        <div className="container text-center">
          <p style={{ color: "#a0aec0", margin: 0 }}>
            Copyright © 2026 Sam's Page
          </p>
        </div>
      </footer>
    </>
  );
};

export default Layout;