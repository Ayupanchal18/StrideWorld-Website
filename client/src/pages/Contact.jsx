import React, { useState } from "react";
import Layout from "./../components/Layout/Layout";
// import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import ".././styles/contactpage.css"
const Contact = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  {/* // Sample blog data */ }
  const blogPosts = [
    {
      id: 1,
      title: "The Ultimate Guide to Choosing the Perfect Running Shoes",
      excerpt: "Discover the key factors that make a great running shoe and how to find the perfect pair for your running style and foot type.",
      image: "https://picsum.photos/600/400",
      category: "guides",
      author: "Sarah Johnson",
      date: "2024-08-15",
      readTime: "8 min read",
      tags: ["running", "fitness", "guide"]
    },
    {
      id: 2,
      title: "Top 10 Sustainable Shoe Brands Leading the Eco Revolution",
      excerpt: "Explore the most innovative sustainable footwear brands that are revolutionizing the industry with eco-friendly practices.",
      image: "https://picsum.photos/600/400",
      category: "sustainability",
      author: "Marcus Green",
      date: "2024-08-12",
      readTime: "6 min read",
      tags: ["sustainable", "eco-friendly", "brands"]
    },
    {
      id: 3,
      title: "How to Style Sneakers for Every Occasion",
      excerpt: "From casual weekends to business meetings, learn how to incorporate sneakers into any outfit with confidence.",
      image: "https://picsum.photos/600/400",
      category: "style",
      author: "Emma Davis",
      date: "2024-08-10",
      readTime: "5 min read",
      tags: ["fashion", "styling", "sneakers"]
    },
    {
      id: 4,
      title: "The Science Behind Comfortable Shoe Design",
      excerpt: "Understand the biomechanics and technology that go into creating shoes that support your feet all day long.",
      image: "https://picsum.photos/600/400",
      category: "technology",
      author: "Dr. Michael Chen",
      date: "2024-08-08",
      readTime: "10 min read",
      tags: ["technology", "comfort", "science"]
    },
    {
      id: 5,
      title: "Leather Care 101: Keeping Your Shoes Looking New",
      excerpt: "Master the art of leather shoe maintenance with our comprehensive guide to cleaning, conditioning, and storing.",
      image: "https://picsum.photos/600/400",
      category: "care",
      author: "Robert Wilson",
      date: "2024-08-05",
      readTime: "7 min read",
      tags: ["leather", "maintenance", "tips"]
    },
    {
      id: 6,
      title: "The Rise of Minimalist Footwear: Benefits and Best Practices",
      excerpt: "Explore the growing trend of minimalist shoes and how they can improve your natural walking and running form.",
      image: "https://picsum.photos/600/400",
      category: "health",
      author: "Lisa Thompson",
      date: "2024-08-03",
      readTime: "9 min read",
      tags: ["minimalist", "health", "barefoot"]
    },
    {
      id: 7,
      title: "From Sketch to Shelf: The Journey of Shoe Design",
      excerpt: "Go behind the scenes to see how our favorite shoes are conceived, designed, and brought to life.",
      image: "https://picsum.photos/600/400",
      category: "design",
      author: "Alex Rodriguez",
      date: "2024-08-01",
      readTime: "12 min read",
      tags: ["design", "process", "manufacturing"]
    },
    {
      id: 8,
      title: "Athletic Performance: How Shoes Impact Your Game",
      excerpt: "Learn how the right athletic footwear can enhance your performance across different sports and activities.",
      image: "https://picsum.photos/600/400",
      category: "sports",
      author: "Coach Jennifer Lee",
      date: "2024-07-30",
      readTime: "8 min read",
      tags: ["athletic", "performance", "sports"]
    },
    {
      id: 9,
      title: "The History of Iconic Shoe Designs",
      excerpt: "Take a journey through time to discover the stories behind some of the most influential shoe designs in history.",
      image: "https://picsum.photos/600/400",
      category: "history",
      author: "David Martinez",
      date: "2024-07-28",
      readTime: "11 min read",
      tags: ["history", "iconic", "design"]
    },
    {
      id: 10,
      title: "Budget-Friendly Shoe Shopping: Quality on a Dime",
      excerpt: "Discover strategies for finding high-quality footwear without breaking the bank.",
      image: "https://picsum.photos/600/400",
      category: "guides",
      author: "Amanda Clark",
      date: "2024-07-25",
      readTime: "6 min read",
      tags: ["budget", "shopping", "tips"]
    },
    {
      id: 11,
      title: "The Future of Footwear: Smart Shoes and Wearable Tech",
      excerpt: "Explore cutting-edge innovations in footwear technology and what the future holds for smart shoes.",
      image: "https://picsum.photos/600/400",
      category: "technology",
      author: "Tech Reporter Jay Park",
      date: "2024-07-22",
      readTime: "9 min read",
      tags: ["technology", "smart", "future"]
    },
    {
      id: 12,
      title: "Seasonal Shoe Transitions: Building a Year-Round Wardrobe",
      excerpt: "Learn how to seamlessly transition your shoe collection through the seasons with versatile choices.",
      image: "https://picsum.photos/600/400",
      category: "style",
      author: "Fashion Stylist Nina Adams",
      date: "2024-07-20",
      readTime: "7 min read",
      tags: ["seasonal", "wardrobe", "versatile"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts', count: blogPosts.length },
    { id: 'guides', name: 'Guides', count: blogPosts.filter(post => post.category === 'guides').length },
    { id: 'style', name: 'Style & Fashion', count: blogPosts.filter(post => post.category === 'style').length },
    { id: 'technology', name: 'Technology', count: blogPosts.filter(post => post.category === 'technology').length },
    { id: 'sustainability', name: 'Sustainability', count: blogPosts.filter(post => post.category === 'sustainability').length },
    { id: 'health', name: 'Health & Wellness', count: blogPosts.filter(post => post.category === 'health').length },
    { id: 'care', name: 'Care & Maintenance', count: blogPosts.filter(post => post.category === 'care').length }
  ];

  {/* // Filter posts based on category and search term */ }
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };


  return (
    <Layout title={"Contact us"}>
      <div className="blog-page">
        {/* Hero Section */}
        <section className="blog-hero">
          <div className="container">
            <div className="hero-content">
              <h1>Strideworld Blog</h1>
              <p>Discover the latest insights, tips, and trends in footwear fashion, technology, and lifestyle.</p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="blog-filters">
          <div className="container">
            <div className="filter-header">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="search-input"
                />
                <button className="search-btn">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                    <path d="21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.name}
                  <span className="count">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="blog-content">
          <div className="container">
            {currentPosts.length > 0 ? (
              <>
                <div className="posts-grid">
                  {currentPosts.map((post, index) => (
                    <article key={post.id} className={`post-card ${index === 0 && currentPage === 1 ? 'featured' : ''}`}>
                      <div className="post-image">
                        <img src={post.image} alt={post.title} />
                        <div className="post-category">{categories.find(cat => cat.id === post.category)?.name}</div>
                      </div>
                      <div className="post-content">
                        <div className="post-meta">
                          <span className="author">By {post.author}</span>
                          <span className="date">{formatDate(post.date)}</span>
                          <span className="read-time">{post.readTime}</span>
                        </div>
                        <h3 className="post-title">
                          <a href={`/blog/${post.id}`}>{post.title}</a>
                        </h3>
                        <p className="post-excerpt">{post.excerpt}</p>
                        <div className="post-footer">
                          <div className="post-tags">
                            {post.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="tag">#{tag}</span>
                            ))}
                          </div>
                          <a href={`/blog/${post.id}`} className="read-more">
                            Read More
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="pagination">
                    <button
                      className={`page-btn prev ${currentPage === 1 ? 'disabled' : ''}`}
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Previous
                    </button>

                    <div className="page-numbers">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                        <button
                          key={number}
                          className={`page-number ${currentPage === number ? 'active' : ''}`}
                          onClick={() => setCurrentPage(number)}
                        >
                          {number}
                        </button>
                      ))}
                    </div>

                    <button
                      className={`page-btn next ${currentPage === totalPages ? 'disabled' : ''}`}
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="no-results">
                <h3>No articles found</h3>
                <p>Try adjusting your search terms or browse all categories.</p>
                <button
                  className="reset-filters"
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchTerm('');
                    setCurrentPage(1);
                  }}
                >
                  Show All Posts
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="newsletter-section">
          <div className="container">
            <div className="newsletter-content">
              <h2>Stay Updated</h2>
              <p>Subscribe to our newsletter for the latest footwear insights, style tips, and exclusive offers.</p>
              <form className="newsletter-form">
                <input type="email" placeholder="Enter your email address" className="newsletter-input" />
                <button type="submit" className="newsletter-btn">Subscribe</button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Contact;