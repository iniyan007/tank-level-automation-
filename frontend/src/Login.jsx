import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", { username, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-20 border rounded shadow">
      <h2 className="text-xl mb-4">Login</h2>
      <input className="w-full p-2 border mb-2" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input className="w-full p-2 border mb-2" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin} className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      <p className="mt-4 text-sm text-center">Don't have an account? <Link to="/register" className="text-blue-600">Register</Link></p>
    </div>
  );
}

export default Login;