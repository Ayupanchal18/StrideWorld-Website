import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [page]); // page is dependency

  useEffect(() => {
    if (!checked.length && !radio.length) {
      getAllProducts();
    }
  }, [checked.length, radio.length, getAllProducts]);

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };


  //load more
  const loadMore = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts((prevProducts) => [...prevProducts, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [page]);


  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page, loadMore]);

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };


  const filterProduct = useCallback(async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  }, [checked, radio]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio, filterProduct]);

  return (
    <Layout title={"ALl Products - Best offers "}>

      <div>
        <section className="landingpage">
          <div className="L-page D-F align-items-center">
            {/* Left Content */}
            <div className="Dis">
              <h2 className="tagline">Shop Online</h2>
              <h1 className="main-heading">Upto <span>50% Off</span></h1>
              <p className="description">
                Introducing our <span><strong>Elegant Essence High-Heeled Shoes</strong></span> where sophistication
                meets comfort in every step you take. Elevate your style game with these exquisite heels
                that are designed to capture attention and steal the spotlight.
              </p>

              <button id="Shop" className="shop-btn">
                <span>Shop Now</span>
                <svg
                  width={34}
                  height={34}
                  viewBox="0 0 74 74"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx={37} cy={37} r="35.5" stroke="black" strokeWidth={3} />
                  <path
                    d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>

            {/* Right Content */}
            <div className="Photo">
              <img src="/images/Landing-photo.png" alt="Hero Section" />
            </div>
          </div>
        </section>
        <div className="container-fluid row mt-4 home-page">
          {/* Title */}
          <h1 className="text-center mb-4 fw-bold text-uppercase">All Products</h1>

          {/* Filters Sidebar */}
          <div className="col-md-3 filters p-3 shadow-sm rounded bg-light">
            {/* Brand Filter */}
            <h4 className="text-center mb-3 text-primary">Filter By Brand</h4>
            <div className="d-flex flex-column catagoeriesDiv gap-2">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>

            {/* Price Filter */}
            <h4 className="text-center mt-4 mb-3 text-primary">Filter By Price</h4>
            <div className="d-flex flex-column gap-2">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p, index) => (
                  <div key={p._id || index}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>

            {/* Reset Button */}
            <div className="d-flex flex-column mt-4">
              <button
                className="btn btn-outline-danger fw-semibold"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div>

          {/* Products Section */}
          <div className="col-md-9">
            <div className="row products-grid">
              {products?.map((p) => (
                <div className="col-6 col-md-4 col-lg-3 product-col" key={p._id}>
                  <div className="card h-100 shadow-sm product-card">
                    {/* Product Image */}
                    <div className="product-image-container">
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top product-image"
                        alt={p.name}
                      />
                    </div>

                    {/* Card Body */}
                    <div className="card-body d-flex flex-column product-body">
                      <h6 className="card-title product-title" title={p.name}>
                        {p.name}
                      </h6>
                      <h5 className="text-success mb-2 fw-bold product-price">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </h5>
                      <p className="card-text text-muted mb-3 product-description">
                        {p.description.substring(0, 60)}...
                      </p>

                      {/* Buttons */}
                      <div className="product-buttons">
                        <button
                          className="btn btn-info btn-sm details-btn"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                        <button
                          className="btn btn-dark btn-sm cart-btn"
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem("cart", JSON.stringify([...cart, p]));
                            toast.success("Item Added to cart");
                          }}
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Load More Button */}
          <div className="m-2 p-3 text-center">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : <>Load More <AiOutlineReload /></>}
              </button>
            )}
          </div>
        </div>

      </div>

    </Layout >
  );
};

export default HomePage;