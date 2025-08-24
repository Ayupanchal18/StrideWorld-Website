import React from "react";
import Layout from "./../components/Layout/Layout";
import ".././styles/aboutus.css"
import { NavLink } from "react-router-dom";

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="about-us">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">We Are StepForward</h1>
              <p className="hero-subtitle">
                Crafting premium footwear that combines timeless style with modern comfort.
                Every step tells a story, and we're here to make yours unforgettable.
              </p>
            </div>
            <div className="hero-image">
              <img src="https://picsum.photos/600/400" alt="Premium shoes display" />
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mission-section">
          <div className="container">
            <div className="mission-grid">
              <div className="mission-text">
                <h2>Our Mission</h2>
                <p>
                  At Strideworld, we believe that the right pair of shoes can transform not just your outfit,
                  but your entire day. We're dedicated to creating footwear that doesn't compromise between
                  style and comfort, using premium materials and innovative designs that stand the test of time.
                </p>
                <p>
                  Since our founding, we've been committed to sustainable practices, ethical manufacturing,
                  and delivering an exceptional customer experience that goes beyond the purchase.
                </p>
              </div>
              <div className="mission-stats">
                <div className="stat-item">
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">Happy Customers</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Years of Excellence</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">200+</span>
                  <span className="stat-label">Unique Designs</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <div className="container">
            <h2 className="section-title">What We Stand For</h2>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3>Premium Quality</h3>
                <p>Every pair is crafted with the finest materials and meticulous attention to detail, ensuring durability that lasts for years.</p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3>Innovative Comfort</h3>
                <p>Advanced cushioning technology and ergonomic designs ensure all-day comfort without sacrificing style.</p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3>Sustainable Practices</h3>
                <p>We're committed to environmental responsibility through eco-friendly materials and ethical manufacturing processes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <div className="container">
            <h2 className="section-title">Meet Our Team</h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-image">
                  <img src="https://avatar.iran.liara.run/public/girl" alt="Sarah Chen - Founder & CEO" />
                </div>
                <div className="member-info">
                  <h3>Sarah Chen</h3>
                  <p className="member-role">Founder & CEO</p>
                  <p className="member-bio">
                    With 20 years in fashion design, Sarah leads our creative vision and strategic direction.
                  </p>
                </div>
              </div>
              <div className="team-member">
                <div className="member-image">
                  <img src="https://avatar.iran.liara.run/public/boy" alt="Marcus Rodriguez - Head of Design" />
                </div>
                <div className="member-info">
                  <h3>Marcus Rodriguez</h3>
                  <p className="member-role">Head of Design</p>
                  <p className="member-bio">
                    Marcus brings innovative designs to life, blending traditional craftsmanship with modern aesthetics.
                  </p>
                </div>
              </div>
              <div className="team-member">
                <div className="member-image">
                  <img src="https://avatar.iran.liara.run/public" alt="Emily Watson - Sustainability Director" />
                </div>
                <div className="member-info">
                  <h3>Emily Watson</h3>
                  <p className="member-role">Sustainability Director</p>
                  <p className="member-bio">
                    Emily ensures our environmental commitments are met through innovative sustainable practices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to Find Your Perfect Pair?</h2>
              <p>Discover our latest collection and experience the StepForward difference.</p>
              <div className="cta-buttons">
                <NavLink to="/" ><button className="btn-primary" >Shop Now</button></NavLink>
                <NavLink to="/contact"><button className="btn-secondary">Contact Us</button></NavLink>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;