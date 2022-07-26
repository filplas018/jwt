import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Content from "./components/Content";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

function App() {
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  useEffect(() => {
    axios
      .get("https://localhost:44327/api/user", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then(response => {
        console.log(response); 
        setUser(response.data)
      })
      .catch((error) => console.log());
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
