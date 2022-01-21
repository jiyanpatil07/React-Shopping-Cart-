import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { CartContext } from '../CartContext'
function Cart() {
    let total=0;
    const [products, setproducts] = useState([]);
    const { cart, setcart } = useContext(CartContext)
    const [priceFetched, setpriceFetched] = useState(false);
    useEffect(() => {
        if (!cart.items) { return }
        if (priceFetched) {
            return ;
        }
        fetch('/api/products/cart-items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids: Object.keys(cart.items) })
        }).then(res => res.json())
            .then(products => {
                setproducts(products)
                setpriceFetched(true)
            })
    }, [cart]);
    const getQty = (productId) => {
        return cart.items[productId]
    }
    const increment = (productId) => {
        const oldQuantity = cart.items[productId]
        const _cart = { ...cart }
        _cart.items[productId] = oldQuantity + 1;
        _cart.totalItem += 1;
        setcart(_cart)
    }
    const decrement = (productId) => {
        const oldQuantity = cart.items[productId]
        if(oldQuantity==1){
            return 
        }
        const _cart = { ...cart }
        _cart.items[productId] = oldQuantity - 1;
        _cart.totalItem -= 1;
        setcart(_cart)
    }
    const getSum=(productId,price) => {
        const sum=price*getQty(productId)
        total+=sum
        return sum;
     }
     const handleDelete=(productId)=>{
         const _cart = { ...cart}
         const qty=_cart.items[productId]
        delete _cart.items[productId]
        _cart.totalItem -= qty
        setcart(_cart)
        const updatedQuantity=products.filter((product)=>product._id!==productId)
        let jiyan;
        setproducts(updatedQuantity)
     }
     const Ordernow= ()=>{ 
         window.alert("order placed successfully");
         setproducts([])
         setcart({})
     }
    return (
        products.length?
        <div className="container mx-auto lg:w-1/2 w-full pb-24">
            <h1 className="my-12 font-bold">Cart Items</h1>
            <ul>
                {
                    products.map(product => {
                        return (
                            <li className="mb-5" key={product._id}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img className="h-16 rounded-lg" src={product.image} alt="logo" />
                                        <span className="font-bold ml-4 w-48">{product.name}</span>
                                    </div>
                                    <div>
                                        <button onClick={() => { decrement(product._id) }} className=" font-bold bg-yellow-500 px-3 py-2 rounded-full leading-none ">-</button>
                                        <b className="px-4">{getQty(product._id)}</b>
                                        <button onClick={() => { increment(product._id) }} className="font-bold bg-yellow-500 px-3 py-2 rounded-full leading-none">+</button>
                                    </div>
                                    <span>${getSum(product._id,product.price)}</span>
                                    <button onClick={()=>{handleDelete(product._id)}} className=" font-bold bg-red-500 px-3 py-2 rounded-full leading-none text-white ">Delete</button>
                                </div>
                            </li>
                        )
                    })
                }


            </ul>
            <hr className="my-6" />
            <div className="text-right font-bold">
                Grand Total:{total}
            </div>
            <div className="text-right mt-6">
                <button onClick={Ordernow}  className=" font-bold bg-yellow-500 px-3 py-2 rounded-full leading-none ">Order Now</button>
            </div>
        </div>:
        <img className="mx-auto w-1/2 mt-12" src="images/empty-cart.png" alt="" />
    )
}

export default Cart
