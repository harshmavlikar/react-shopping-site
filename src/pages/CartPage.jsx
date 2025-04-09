// src/pages/CartPage.jsx
import { useCart } from "../context/CartContext";
import { useState } from "react";

function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [qtyInput, setQtyInput] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const handleQuantityChange = (id, value) => {
    const quantity = parseInt(value);
    if (quantity >= 1) {
      setQtyInput((prev) => ({ ...prev, [id]: quantity }));
      updateQuantity(id, quantity);
    }
  };

  const handleCheckout = () => {
    clearCart();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000);
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cart.length === 0 && !showPopup) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            borderBottom: "1px solid #ccc",
            padding: "10px 0",
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            style={{ height: "60px", width: "60px", objectFit: "contain" }}
          />
          <div style={{ flex: 1 }}>
            <h4>{item.title}</h4>
            <p>₹{item.price}</p>
          </div>

          <input
            type="number"
            value={qtyInput[item.id] ?? item.quantity}
            min="1"
            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
            style={{ width: "60px" }}
          />

          <button
            onClick={() => removeFromCart(item.id)}
            style={{
              padding: "5px 10px",
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Remove
          </button>
        </div>
      ))}

      <h3 style={{ marginTop: "20px" }}>Total: ₹{totalPrice.toFixed(2)}</h3>

      <button
        onClick={handleCheckout}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Checkout
      </button>

      {showPopup && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#d4edda",
            color: "#155724",
            border: "1px solid #c3e6cb",
            borderRadius: "5px",
          }}
        >
          ✅ Order placed successfully!
        </div>
      )}
    </div>
  );
}

export default CartPage;
