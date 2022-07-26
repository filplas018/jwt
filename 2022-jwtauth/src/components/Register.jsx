import React, {useState} from "react"
import axios from "axios";
import { useEffect } from "react";
import{Navigate} from "react-router-dom"
const Register = () => {
    const[name, setName] = useState()
    const[email, setEmail] = useState()
    const[password, setPassword] = useState()
    const[state, setState] = useState(false);

    const submit = () =>{
        const data = {name: name, email: email, password:password}
        console.log(data)
        
        axios({
            method: 'post',
            url: "https://localhost:44327/api/register",
            headers: {}, 
            data: {
              name,
              email,
              password // This is the body part
            }
          })
          .then(setState(true))
          .catch((error) => alert(error))
          setState(true);
    }
    if(state){
        return <Navigate to="/login"/>
    }
  return (
    <form className="form-signin" onSubmit={submit}>
      <h1 className="h3 mb-3 font-weight-normal">Please Register</h1>

      
      <input
        onChange={e => setName(e.target.value)}
        type="text"
        id="inputName"
        className="form-control"
        placeholder="Name"
        required
        autoFocus
      />

      
      <input
        onChange={e => setEmail(e.target.value)}
        type="email"
        id="inputEmail"
        className="form-control"
        placeholder="Email address"
        required
        autoFocus
      />

      
      <input
        onChange={e => setPassword(e.target.value)}
        type="password"
        id="inputPassword"
        className="form-control"
        placeholder="Password"
        required
      />

      <button className="btn btn-lg btn-primary btn-block" type="submit">
        Register
      </button>
      <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
    </form>
  );
};
export default Register;
