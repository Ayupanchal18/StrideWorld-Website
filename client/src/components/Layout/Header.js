import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../hooks/useCategory"
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import Categories from './../../pages/Categories';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg custom-navbar fixed-top shadow-sm">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            {/* Logo + Nav Links */}
            <div className="navBarImageandNavLinksDiv d-flex align-items-center">
              <NavLink to="/" className="navbar-brand d-flex align-items-center">
                <img src="/images/logo1.png" alt="StrideWorld Logo" className="nav-logo" />
              </NavLink>

              <ul className="navbar-nav ms-3">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link custom-link">
                    Home
                  </NavLink>
                </li>

                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle custom-link"
                    to={"/categories"}
                    data-bs-toggle="dropdown"
                  >
                    Categories
                  </NavLink>
                  <ul className="dropdown-menu custom-dropdown">
                    <li>
                      <NavLink className="dropdown-item" to={"/categories"}>
                        All Categories
                      </NavLink>
                    </li>
                    {categories?.map((c) => (
                      <li key={c._id}>
                        <NavLink className="dropdown-item" to={`/category/${c.slug}`}>
                          {c.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="nav-item">
                  <NavLink to="/Categories" className="nav-link custom-link">
                    Shop
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/Blog" className="nav-link custom-link">
                    Contact Us
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/About" className="nav-link custom-link">
                    About Us
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/contact" className="nav-link custom-link">
                    Blog
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Right Side Items */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <SearchInput />

              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link custom-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link custom-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle custom-link"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu custom-dropdown">
                      <li>
                        <NavLink
                          to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink onClick={handleLogout} to="/login" className="dropdown-item">
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              <li className="nav-item ms-2">
                <NavLink to="/cart" className="nav-link custom-link cart-link">
                  <Badge count={cart?.length} showZero offset={[10, -5]}>
                    Cart
                  </Badge>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>
  );
};

export default Header;