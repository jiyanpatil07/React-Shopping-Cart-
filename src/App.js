import React, { createContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Navigation from './components/Navigation'
// import Products from './pages/Products'
import ProductsPage from './pages/ProductsPage'
import Cart from './pages/Cart'
import SingleProduct from './pages/SingelProduct'
import {CartContext} from './CartContext'
import {getCart,storeCart} from './helpers'
function App() {
    const [cart, setcart] = useState({});
    useEffect(() => {
        const cart =window.localStorage.getItem('cart');
        console.log(JSON.parse(cart));

        setcart(JSON.parse(cart));
    }, []);
    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cart));
    },[cart])
    return (

        <>
            <Router>
                <CartContext.Provider value={{cart,setcart}}>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} exact></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/products" exact element={<ProductsPage />} ></Route>
                    <Route path="/products/:_id" exact element={<SingleProduct />} ></Route>
                    <Route path="/cart" element={<Cart />} ></Route>
                </Routes>
                </CartContext.Provider>
            </Router>
        </>

    )
}

export default App
