// ✅ ProductDetail.jsx (in src/pages/ProductDetail.jsx)
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error loading product:", err));
  }, [id]);

  if (!product) return <p style={{ padding: "20px" }}>Loading product...</p>;

  const handleAddToCart = () => {
    addToCart(product);
    alert("Product added to cart!");
    console.log("Added to cart:", product);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>{product.title}</h2>
      <img
        src={product.image}
        alt={product.title}
        style={{ width: "100%", height: "300px", objectFit: "contain" }}
      />
      <h3>₹{product.price}</h3>
      <p>{product.description}</p>
      <button
        onClick={handleAddToCart}
        style={{
          padding: "10px 20px",
          marginTop: "10px",
          backgroundColor: "#008cba",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetail;
