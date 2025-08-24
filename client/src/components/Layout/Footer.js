import React from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css"
import { FaInstagram, FaEnvelope, FaFacebook, FaYoutube, FaShoePrints, FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { SiAppstore, SiGoogleplay } from "react-icons/si";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Left Section */}
        <div className="footer-section">
          <h2 className="footer-logo">
            <FaShoePrints className="logo-icon" /> STRIDEWORLD
          </h2>
          <h4>Contact</h4>
          <p>Address: xxxxxxxx, xxxxx, Rajasthan, *****</p>
          <p>Phone number: 99xxxxx571</p>
          <p>Hours: 10:00 - 6:00 Mon-Sat</p>

          <h4>Follow Us</h4>
          <div className="social-icons">
            <FaInstagram />
            <FaEnvelope />
            <FaFacebook />
            <FaYoutube />
          </div>
        </div>

        {/* Customer Service */}
        <div className="footer-section">
          <h4 className="footer-heading">CUSTOMER SERVICE</h4>
          <ul className="footer-list">
            <li>FAQs</li>
            <li>Track an Order</li>
            <li>Privacy Policy</li>
            <li>Terms and Conditions</li>
            <li>Return and Refund Policy</li>
            <li>Shipping and Delivery Policy</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* StrideWorld.in */}
        <div className="footer-section">
          <h4 className="footer-heading">StrideWorld.in</h4>
          <ul className="footer-list">
            <li>FAQs</li>
            <li>About Us</li>
            <li>Technologies</li>
            <li>Sustainability</li>
            <li>Inspirer Me</li>
          </ul>
        </div>

        {/* Install App */}
        <div className="footer-section">
          <h4>Install App</h4>
          <p>From App store or Google store</p>
          <div className="app-buttons">
            <button className="app-btn">
              <SiAppstore /> Download on the App Store
            </button>
            <button className="app-btn">
              <SiGoogleplay /> Google Store
            </button>
          </div>

          <h4>Secured Payment Gateway</h4>
          <div className="payment-icons">
            <FaCcVisa />
            <FaCcMastercard />
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;