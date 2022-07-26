import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [state, setState] = useState(false);

  const submit = async() => {
    
    axios({
      method: 'post',
      url: "https://localhost:44327/api/login",
      headers: {"Content-Type": "application/json"}, 
      credentials: 'include',
      data: {
        email,
        password // This is the body part
      }
    })
    .then(setState(true))
    .catch((error) => alert(error))
    setState(true);
  };
  if(state){
    return <Navigate to="/"/>;
  }
  return (
    <form className="form-signin" onSubmit={submit}>
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        id="inputEmail"
        className="form-control"
        placeholder="Email address"
        required
        autoFocus
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        id="inputPassword"
        className="form-control"
        placeholder="Password"
        required
      />

      <button className="btn btn-lg btn-primary btn-block" type="submit">
        Sign in
      </button>
      <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
    </form>
  );
};
export default Login;
