import React, { useState, useEffect, Link } from "react";

const Home = (props) => {
  const logout = () => {
    axios.post("https://localhost:44327/api/logout", {
      
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    });
  };
  let data = {props}
  if(data.props.user != undefined){
    console.log(data.props.user.name)
  }
  
  return (
    <>
      <h1>Home</h1>
      <p>
       
      </p>

    </>
  );
};
export default Home;
//{props.name ? "Hi" + props.name : "You are not logged in"}