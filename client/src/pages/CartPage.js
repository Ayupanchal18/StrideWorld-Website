import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import "../styles/CartStyles.css";

const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price;
            });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        } catch (error) {
            console.log(error);
        }
    };
    //detele item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Layout>
            <div className="cart-page">
                <h1 className="cart-header">
                    {auth?.user ? `Hello ${auth?.user?.name}` : "Hello Guest"}
                </h1>
                <p className="cart-subtext">
                    {cart?.length
                        ? `You have ${cart.length} items in your cart`
                        : "Your cart is empty"}
                </p>

                <div className="cart-container">
                    {/* Left - Product List */}
                    <div className="cart-products">
                        {cart?.map((p) => (
                            <div className="cart-item" key={p._id}>
                                <img
                                    src={`/api/v1/product/product-photo/${p._id}`}
                                    alt={p.name}
                                    className="cart-item-image"
                                />
                                <div className="cart-item-details">
                                    <h3 className="product-name">{p.name}</h3>
                                    <p className="product-desc">
                                        {p.description.substring(0, 50)}...
                                    </p>
                                    <p className="product-price">₹{p.price}</p>
                                    <div className="cart-actions">
                                        <button className="btn-remove" onClick={() => removeCartItem(p._id)}>Remove</button>
                                        <button className="btn-wishlist">Move to Wishlist</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right - Cart Summary */}
                    <div className="cart-summary">
                        <h2>Order Summary</h2>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>₹{totalPrice()}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span className="free-text">Free</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>₹{totalPrice()}</span>
                        </div>

                        <div className="address-box">
                            {auth?.user?.address ? (
                                <>
                                    <h4>Delivery Address</h4>
                                    <p>{auth?.user?.address}</p>
                                    <button className="btn-outline" onClick={() => navigate("/dashboard/user/profile")}>Update Address</button>
                                </>
                            ) : (
                                <button className="btn-outline" onClick={() => navigate("/login", { state: "/cart" })}>
                                    {auth?.token ? "Update Address" : "Please Login to Checkout"}
                                </button>
                            )}
                        </div>

                        <button
                            className="btn-checkout"
                            disabled={loading || !instance || !auth?.user?.address}
                        >
                            {loading ? "Processing..." : "Proceed to Checkout"}
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;