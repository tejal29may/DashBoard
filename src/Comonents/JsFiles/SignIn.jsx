import "../CSSFiles/SignIn.css";
import React, { useState } from "react";
import app from "../../Screens/Firebase";
import { db } from "../../Screens/Firebase";
// import { v4 as uuidv4 } from "uuid";

import { doc, setDoc, getDoc } from "firebase/firestore";



import userContext from "./UserContext";
import { useContext } from "react";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";

const auth = getAuth();
function SignIn() {
  const { setUser, setName} = useContext(userContext);

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  

  const navigate = useNavigate();

  async function handle() {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("this is results",result);
      alert("User created");

  

     

      
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }

  

  async function signInFun() {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result);
      navigate("/dashboard");
      console.log("home section");
      console.log(user);
    } catch (err) {
      console.log("error", err);
    }
  }
  return (
    <>
    <div className="page">
      <div className="left">
     
      
      <h3>Welcome to the Healthcare Dashboard Administrator Portal. Manage your healthcare platform with ease. Sign in to access vital tools and analytics, or request access to join our team of authorized administrators.✨</h3>
{/* <img src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" /> */}
      </div>
      <div className="right">
        {/* <h3>Welcome to the Healthcare Dashboard Administrator Portal. Manage your healthcare platform with ease. Sign in to access vital tools and analytics, or request access to join our team of authorized administrators.✨</h3> */}
      <div class="main2">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div class="signup">
          <label for="chk" aria-hidden="true">
            Sign up
          </label>

          <input
            type="text"
            placeholder="User name"
            className="input3"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <input
            type="email"
            placeholder="Email"
            required=""
            className="input3"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            required=""
            className="input3"
            value={password}
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
          <button onClick={handle}>Sign up</button>
        </div>

        <div class="login">
          <label for="chk" aria-hidden="true">
            Login
          </label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            required=""
            className="input3"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="text"
            name="pswd"
            placeholder="Password"
            required=""
            className="input3"
            value={password}
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />

          <button onClick={signInFun}>Login</button>
        </div>
      </div>
      </div>
    </div>
     
    </>
  );
}

export default SignIn;
