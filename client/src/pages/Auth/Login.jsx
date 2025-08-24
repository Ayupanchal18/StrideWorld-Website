import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import "../../styles/loginstyle.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      if (res && res?.data?.success) {
        alert(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        })
        localStorage.setItem('auth', JSON.stringify(res.data))
        navigate(location.state || "/");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="page-content">
        <div className="form-v7-content">
          <h1>Login </h1>
          <div className="registrationBox">

            {/* Left Image Side */}
            <div className="form-left">
              <img src="/images/form-v7.jpg" alt="form" />
              <p className="text-2">Privacy policy & Terms of service</p>
            </div>

            {/* Right Login Form */}
            <form className="form-detail" onSubmit={handleSubmit}>

              <div className="form-row">
                <label htmlFor="your_email">E-MAIL</label>
                <input
                  type="email"
                  id="your_email"
                  className="input-text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  required
                />
              </div>

              <div className="form-row">
                <label htmlFor="password">PASSWORD</label>
                <input
                  type="password"
                  id="password"
                  className="input-text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Your Password"
                  required
                />
              </div>

              <div className="form-row-last">
                <input
                  type="submit"
                  name="login"
                  className="register"
                  value="Login"
                />
                <p>Don’t have an account? <a href="/register">Sign Up</a></p>
              </div>

            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login
