import React from 'react'
import { useState,useEffect } from 'react'
import {useParams} from 'react-router-dom'
import { useNavigate  } from 'react-router-dom'
function SingelProduct() {
    const [product, setproduct] = useState([])
    const Params=useParams();
    const navigate = useNavigate();
   useEffect(() => {
     fetch(`/api/products/${Params._id}`)
     .then((response) => response.json())
     .then(product =>{
         setproduct(product)
         
     })
   }, [])
   
    return (
        <div className="container mx-auto mt-12 ml-20">
           <button className="font-bold mb-12" onClick={() => {navigate('/')}}>Back</button>
           <div className="flex">
               <img src={product.image} alt="pizza" />
                <div className="ml-16">
                    <h1 className="text-xl font-bold">{product.name}</h1>
                    <div className="text-md">{product.size}</div>
                    <div className="font-bold mt-2">{product.price}</div>
                    <button className="bg-yellow-500 py-1 px-8 rounded-full font-bold mt-4">Add to cart</button>                </div>
           </div>
        </div>
    )
}

export default SingelProduct
