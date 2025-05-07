import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/register", { username, password });
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-20 border rounded shadow">
      <h2 className="text-xl mb-4">Register</h2>
      <input className="w-full p-2 border mb-2" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input className="w-full p-2 border mb-2" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleRegister} className="w-full bg-green-500 text-white p-2 rounded">Register</button>
      <p className="mt-4 text-sm text-center">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
    </div>
  );
}

export default Register;
