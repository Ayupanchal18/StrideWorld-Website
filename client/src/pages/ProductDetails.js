import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);

    //initalp details
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug]);
    //getProduct
    const getProduct = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/get-product/${params.slug}`
            );
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };
    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/related-product/${pid}/${cid}`
            );
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout>
            {/* // ProductDetails.jsx */}
            <div className="pd-wrapper">
                {/* Main Product Section */}
                <div className="container-fluid pd-main-section">
                    <div className="row align-items-center">
                        {/* Product Image */}
                        <div className="col-lg-6 pd-image-section">
                            <div className="pd-image-container">
                                <img
                                    src={`/api/v1/product/product-photo/${product._id}`}
                                    className="pd-main-image"
                                    alt={product.name}
                                />
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="col-lg-6 pd-info-section">
                            <div className="pd-info-content">
                                {/* Category Badge */}
                                <div className="pd-category-badge">
                                    {product?.category?.name}
                                </div>

                                {/* Product Name */}
                                <h1 className="pd-title">{product.name}</h1>

                                {/* Price */}
                                <div className="pd-price">
                                    {product?.price?.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                    })}
                                </div>

                                {/* Description */}
                                <div className="pd-description">
                                    <p>{product.description}</p>
                                </div>

                                {/* Add to Cart Button */}
                                <div className="pd-actions">
                                    <button className="pd-cart-btn">
                                        <span>ADD TO CART</span>
                                    </button>
                                </div>

                                {/* Product Features */}
                                <div className="pd-features">
                                    <div className="pd-feature-item">
                                        <i className="pd-feature-icon">🚚</i>
                                        <span>Free Shipping</span>
                                    </div>
                                    <div className="pd-feature-item">
                                        <i className="pd-feature-icon">↩️</i>
                                        <span>Easy Returns</span>
                                    </div>
                                    <div className="pd-feature-item">
                                        <i className="pd-feature-icon">✨</i>
                                        <span>Premium Quality</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Products Section */}
                <div className="sp-section">
                    <div className="container">
                        <div className="sp-header">
                            <h2 className="sp-title">You might also like</h2>
                            <div className="sp-subtitle">Similar products just for you</div>
                        </div>

                        {relatedProducts.length < 1 ? (
                            <div className="sp-no-products">
                                <p>No similar products found</p>
                            </div>
                        ) : (
                            <div className="sp-grid">
                                {relatedProducts?.map((p) => (
                                    <div className="sp-card" key={p._id}>
                                        <div className="sp-card-image">
                                            <img
                                                src={`/api/v1/product/product-photo/${p._id}`}
                                                alt={p.name}
                                            />
                                        </div>

                                        <div className="sp-card-info">
                                            <h3 className="sp-card-name">{p.name}</h3>
                                            <div className="sp-card-price">
                                                {p.price.toLocaleString("en-US", {
                                                    style: "currency",
                                                    currency: "USD",
                                                })}
                                            </div>
                                            <p className="sp-card-desc">
                                                {p.description.substring(0, 60)}...
                                            </p>

                                            <button
                                                className="sp-card-btn"
                                                onClick={() => navigate(`/product/${p.slug}`)}
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetails;