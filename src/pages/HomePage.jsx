import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HomePage({ searchQuery, selectedCategory }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const goToProductDetail = (id) => {
    navigate(`/product/${id}`);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Products</h2>
      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => goToProductDetail(product.id)}
            >
              <img src={product.image} alt={product.title} />
              <h4>{product.title}</h4>
              <p>₹{product.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;
