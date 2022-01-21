import React, { useContext, useState } from 'react'
import { CartContext } from '../CartContext';

import { Link } from 'react-router-dom'

function Product(props) {
    const [isAdding, setisAdding] = useState(false);
    const { cart,setcart } = useContext(CartContext)
    const { product } = props;
    const addtoCart = (event, product) => {
        setisAdding(true)
        setTimeout(() => {
            setisAdding(false)
        }, 1000);
        event.preventDefault();
        let _cart = { ...cart }
        if (!_cart.items) {
            _cart.items = {}
        }
        if (_cart.items[product._id]) {
            _cart.items[product._id] += 1;
        }
        else {
            _cart.items[product._id] = 1;
        }
        if (!_cart.totalItem){
            _cart.totalItem =0;
        }
        _cart.totalItem += 1;
        setcart(_cart)   
    }

    return (
        <Link to={`/products/${product._id}`}>
            <div className="">

                <img className="" src={product.image} alt="logo" />
                <div className="text-center">


                    <h2 className=" text-lg font-bold py-2">{product.name}</h2>
                    <span className=" bg-gray-200 py-1 rounded-full text-sm px-4">{product.size}</span>
                </div>
                <div className=" flex justify-between items-center mt-4  ">
                    <span className="mx-2 font-bold">{product.price}</span>
                    {/* <button disabled={isAdding} onClick={(event) => { addtoCart(event, product) }} className={`${ isAdding ? 'bg-green-500': 'bg-yellow-500' } py-1 px-4 rounded-full font-bold text-sm`}>ADD{isAdding ? 'ED': ''}</button> */}
                    <button  onClick={(event) => { addtoCart(event, product) }} className={`${isAdding?'bg-green-500':'bg-yellow-500'} py-1 px-4 rounded-full font-bold text-sm`}>ADD{isAdding ? 'ED': ''}</button>

                    {/* <button onClick={(event) => { addtoCart(event, product) }} className={`${isAdding ?'bg-green-500':'bg-yellow-500'}mx-2  py-1 px-4 rounded-full font-bold text-sm`}>Add</button> */}
                </div>

            </div>
        </Link>
    )
}

export default Product
