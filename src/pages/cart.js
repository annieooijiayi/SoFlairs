import Header from '../component/include/header';
import Footer from '../component/include/footer';
import React ,{ useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

function Cart(){

    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    var totalCartPrice = 0;

    if (!localStorage.getItem('auth_token')){
        navigate('/');
        swal("Warning", 'Login to proceed to Cart Page', "error");
    }
    
    useEffect(() =>{
        let isMounted = true;
        
        axios.get(`/api/cart`).then(res =>{
            if (isMounted){
                if (res.data.status === 200){
                    //console.log(res.data.product);
                    setCart(res.data.cart);
                    //setLoading(false);
                }
                else if (res.data.status === 401){
                    navigate('/');
                    //swal("Warning", res.data.message, "warning");
                }
            }
        });

        return ()=>{
            isMounted = false;
        }
    }, []);

    const handleDecrement = (cart_id) =>{
        setCart(cart =>
            cart.map((item)=>
                cart_id === item.id ? {...item, product_qty:item.product_qty - (item.product_qty > 1 ? 1 : 0) } : item
            )
        );
        updateQuantity(cart_id, "dec");
    }

    const handleIncrement = (cart_id) =>{
        setCart(cart =>
            cart.map((item)=>
                cart_id === item.id ? {...item, product_qty:item.product_qty + (item.product_qty < 10 ? 1 : 0)} : item
            )
        );
        updateQuantity(cart_id, "inc");
    }

    function updateQuantity(cart_id, scope){
        axios.put(`/api/cart-update-quantity/${cart_id}/${scope}`).then(res =>{
            if (res.data.status === 200){
                console.log(res.data.message);
            }
        });
    }

    const deleteCartItem = (e, cart_id) =>{
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Removing..";
        axios.delete(`/api/delete-cart-item/${cart_id}`).then(res=>{
            if (res.data.status === 200){
                swal("Success", res.data.message, "success");
                thisClicked.closest("tr").remove();
            }
            else if (res.data.status === 404){
                swal("Error", res.data.message, "error");
                thisClicked.innerText = "Remove";
            }
        });
    }

    var cartList = '';
    if (cart.length > 0){
        cartList = 
        <div>
            <div className='table-responsive'>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product</th>
                            <th className='text-center'>Price</th>
                            <th className='text-center'>Quantity</th>
                            <th className='text-center'>Total Price</th>
                            <th>Product</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item) =>{

                            totalCartPrice += item.product.selling_price * item.product_qty;
                            return(
                            
                            <tr key={item.id}>
                                <td width={'10%'}>
                                    <img src={`http://127.0.0.1:8000/${item.product.image}`} alt={item.product.name} width={'50px'} height='50px' />
                                </td>
                                <td>{item.product.name}</td>
                                <td width={'15%'} className='text-center'>{item.product.selling_price}</td>
                                <td width={'15%'}>
                                    <div className='input-group'>
                                        <button type='button' onClick={() =>handleDecrement(item.id)} className='input-group-text' >-</button>
                                        <div className='form-control text-center' >{item.product_qty}</div>
                                        <button type='button' onClick={() =>handleIncrement(item.id)} className='input-group-text'>+</button>
                                    </div>
                                </td>
                                <td width={'15%'} className='text-center'>{item.product.selling_price * item.product_qty}</td>
                                <td width={'15%'}>
                                    <button type='button' onClick={(e)=> deleteCartItem(e,item.id)} className='btn btn-danger btn-sm'>Remove</button>
                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className='row'>
                <div className='col-md-8'></div>
                <div className='col-md-4'>
                    <div className='card card-body mt-3'>
                        {/*<h5>Sub Total:
                            <span className='float-end'>00</span>
                        </h5>*/}
                        <h5>Grand Total:
                            <span className='float-end'>{totalCartPrice}</span>
                        </h5>
                        <hr />
                        <Link to={"/checkout"} className="btn btn-primary">Checkout</Link>
                    </div>
                </div>
            </div>
        </div>
    }
    else{
        cartList =
        <div>
            <div className='card card-body py-5 text-center shadow-sm'>
                <h4>Your Shopping Cart is empty</h4>
            </div>
        </div>
    }

    return(
        <div>
        <Header />
            <div className='py-3 bg-warning'>
                <div className='container'>
                    <h4>Home / Cart</h4>
                </div>
            </div>
            <div className='py-4'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            {cartList}
                        </div>
                        
                    </div>
                </div>
            </div>
        <Footer />
        </div>
    )
}

export default Cart;