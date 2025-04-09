import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import axios from "axios";

function Header({ onSearch, onCategory, onReset }) {
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [categories, setCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="sticky-header">
      {/* Hamburger Button for Mobile */}
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>

      {/* Navigation Menu */}
      <div className={`nav-container ${menuOpen ? "open" : ""}`}>
        <div className="nav-left">
          <Link to="/home" className="nav-btn" onClick={() => setMenuOpen(false)}>
            🏠 Home
          </Link>

          <Link to="/cart" className="nav-btn" style={{ position: "relative" }} onClick={() => setMenuOpen(false)}>
            🛒 Cart
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </Link>

          {location.pathname === "/home" && (
            <>
              <input
                type="text"
                placeholder="Search products..."
                onChange={(e) => onSearch(e.target.value)}
              />

              <select defaultValue="" onChange={(e) => onCategory(e.target.value)}>
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.toUpperCase()}
                  </option>
                ))}
              </select>

              <button onClick={onReset} className="reset-btn">
                Reset
              </button>
            </>
          )}
        </div>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
