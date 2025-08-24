import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/RegisterTemplate.css"
import "../../styles/AuthStyles.css"


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });

      if (res && res?.data?.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register - Ecommer App">
      <div className="page-content">
        <div className="form-v7-content ">
          <h1>Register </h1>
          <div className="registrationBox">

            {/* Left Side with Image */}
            <div className="form-left">
              <img src="/images/form-v7.jpg" alt="form" />
              <p className="text-2">Privacy Policy & Terms of Service</p>
            </div>

            {/* Registration Form */}
            <form className="form-detail" onSubmit={handleSubmit}>
              <div className="form-row">
                <label>USERNAME</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-text"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-row">
                <label>E-MAIL</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-text"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-row">
                <label>PASSWORD</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-text"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="form-row">
                <label>CONFIRM PASSWORD</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-text"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <div className="form-row">
                <label>PHONE</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-text"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="form-row">
                <label>ADDRESS</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="input-text"
                  placeholder="Enter your address"
                  required
                />
              </div>

              <div className="form-row">
                <label>SECURITY QUESTION</label>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="input-text"
                  placeholder="What is your favorite sport?"
                  required
                />
              </div>

              <div className="form-row-last">
                <input type="submit" className="register" value="Register" />
                <p>
                  Or <a href="/login">Sign in</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
