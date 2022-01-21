import React from 'react'
import {Link} from 'react-router-dom'
import {CartContext} from '../CartContext'
import { useContext } from 'react'
function Navigation() {
    const {cart}=useContext(CartContext)
    const cartStyle={
        background:'#F59E0D',
        display:'flex',
        padding:'6px 12px',
        borderRadius:'50px'
    }
    return (
        <>
                <nav className="container mx-auto flex item-center justify-between py-5  ">
             
                    <Link to="/">
                        <div className="ml-20">

                        <img style={{height:45}} src="/images/logo.png" alt="logo"></img>
                        </div>
                    </Link>
                    <ul className="flex items-center mr-8">
                        <li className="font-semibold"><Link to="/">Home</Link></li>
                        <li className="ml-6 font-semibold"><Link to="/products ">Product</Link></li>
                        <li className="ml-6">
                            <Link to="/cart">
                                <div style={cartStyle}>
                                    <span className="text-black">{cart.totalItem?cart.totalItem:0}</span>
                                    <img className="ml-3 " src="/images/cart.png" alt="cart"/>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </nav>
        </>
    )
}

export default Navigation
