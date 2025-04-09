import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check against our own custom credentials
    if (username !== "harsh" || password !== "123456") {
      alert("Invalid username or password.");
      return;
    }

    try {
      // Still login to the API with default user (just for token)
      const response = await axios.post("https://fakestoreapi.com/auth/login", {
        username: "mor_2314",
        password: "83r5^_",
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      navigate("/home");
    } catch (error) {
      alert("Login failed. Please try again later.");
      console.error("Login Error:", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button type="submit" style={{ width: "100%" }}>
          Login
        </button>
      </form>

      <p style={{ fontSize: "14px", marginTop: "10px", color: "#555" }}>
        👉 Use <strong>harsh</strong> / <strong>123456</strong> to log in
      </p>
    </div>
  );
}

export default LoginPage;
