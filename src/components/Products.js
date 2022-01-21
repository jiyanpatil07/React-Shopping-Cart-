import React from 'react'
import Product from './Product'
import { useState, useEffect } from 'react'
import {CartContext} from '../CartContext'
import { useContext } from 'react'
function Products() {
    const {name}=useContext(CartContext)
    const [products, setproducts] = useState([])
    useEffect(() => {
        fetch('/api/products')
            .then(response =>response.json() )
            .then(products => {
                setproducts(products)
                console.log(
                    products
                )
            })
    }, [])
    return (
        <div className="container mx-auto pb-24 ">
            <h1 className="text-lg font-bold my-8 ml-20 ">Products {name}</h1>
            <div className="grid grid-cols-5 my-8 gap-24 ml-20 mr-8">
               {
                   products.map((product) =>{
                       return <Product key={product._id} product={product}></Product>
                   })
               }
            </div>
        </div>
    )
}

export default Products
