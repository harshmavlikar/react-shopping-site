import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import Header from "./components/Header";

function App() {
  const location = useLocation();
  const hideHeader = location.pathname === "/";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
  };

  return (
    <>
      {!hideHeader && (
        <Header
          onSearch={setSearchQuery}
          onCategory={setSelectedCategory}
          onReset={resetFilters}
        />
      )}
      <Routes>
        <Route
          path="/home"
          element={
            <HomePage
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
            />
          }
        />
        <Route path="/" element={<LoginPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
}

export default App;
