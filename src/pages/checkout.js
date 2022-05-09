import Header from '../component/include/header';
import Footer from '../component/include/footer';
import React ,{ useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import ReactDOM from 'react-dom';

function Checkout(){

    const [cart, setCart] = useState([]);
    const [error, setError] = useState([]);
    const [checkoutInput, setCheckoutInput] = useState({
        fullname:'',
        phonenum:'',
        email:'',
        address:'',
        city:'',
        state:'',
        zipcode:''
    });
    const navigate = useNavigate();
    var totalCartPrice = 0;

    if (!localStorage.getItem('auth_token')){
        navigate('/');
        swal("Warning", 'Login to proceed to Checkout Page', "error");
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

    const handleInput = (e) =>{
        e.persist();
        setCheckoutInput({...checkoutInput, [e.target.name]:e.target.value});
    }

    var orderinfo_data = {
        fullname: checkoutInput.fullname,
        phone: checkoutInput.phone,
        email: checkoutInput.email,
        address: checkoutInput.address,
        city: checkoutInput.city,
        state: checkoutInput.state,
        zipcode: checkoutInput.zipcode,
        payment_mode: 'Paid by PayPal',
        payment_id:'',
    }

    //Paypal Code
    const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
    const createOrder = (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: totalCartPrice,
              },
            },
          ],
        });
    };
    const onApprove = (data, actions) => {
        //return actions.order.capture();
        return actions.order.capture().then(function(details){
            console.log(details);
            orderinfo_data.payment_id = details.id;

            axios.post(`/api/place-order`, orderinfo_data).then(res =>{
                if (res.data.status === 200){
                    swal("Order placed successfully", res.data.message,"success");
                    setError([]);
                    navigate('/thank-you');
                }
                else if (res.data.status === 422){
                    swal("All fields are mandatory", "","error");
                    setError(res.data.errors);
                }
            });
        });
    };
    //Paypal code end

    const submitOrder = (e, payment_mode) =>{
        e.preventDefault();

        var data = {
            fullname: checkoutInput.fullname,
            phone: checkoutInput.phone,
            email: checkoutInput.email,
            address: checkoutInput.address,
            city: checkoutInput.city,
            state: checkoutInput.state,
            zipcode: checkoutInput.zipcode,
            payment_mode: payment_mode,
            payment_id:'',
        }

        switch(payment_mode){
            case 'cod':
                axios.post(`/api/place-order`, data).then(res =>{
                    if (res.data.status === 200){
                        swal("Order placed successfully", res.data.message,"success");
                        setError([]);
                        navigate('/thank-you');
                    }
                    else if (res.data.status === 422){
                        swal("All fields are mandatory", "","error");
                        setError(res.data.errors);
                    }
                });

                break;

            case 'payonline':
                axios.post(`api/validate-order`, data).then(res =>{
                    if (res.data.status === 200){
                        setError([]);
                        var myModal = new window.bootstrap.Modal(document.getElementById('onlinePaymentModal'));
                        myModal.show();
                        
                    }
                    else if (res.data.status === 422){
                        swal("All fields are mandatory","","error");
                        setError(res.data.errors);
                    }
                });
                break;

            default:
                break;
        }

        
        
    }

    var checkoutList = '';
    if (cart.length > 0){
        checkoutList = 
        <div>
            <div className='row'>
                <div className='col-md-7'>
                    <div className='card'>
                        <div className='card-header'>
                            <h5>Basic Information</h5>
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='form-group mb-3'>
                                        <label>Full Name</label>
                                        <input type={'text'} name="fullname" onChange={handleInput} value={checkoutInput.fullname} className='form-control' />
                                        <small className='text-danger'>{error.fullname}</small>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group mb-3'>
                                        <label>Phone Number</label>
                                        <input type={'text'} name="phone" onChange={handleInput} value={checkoutInput.phone} className='form-control' />
                                        <small className='text-danger'>{error.phone}</small>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group mb-3'>
                                        <label>Email Address</label>
                                        <input type={'email'} name="email" onChange={handleInput} value={checkoutInput.email} className='form-control' />
                                        <small className='text-danger'>{error.email}</small>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group mb-3'>
                                        <label>Full Address</label>
                                        <textarea rows={2} name="address" onChange={handleInput} value={checkoutInput.address} className='form-control' />
                                        <small className='text-danger'>{error.address}</small>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='form-group mb-3'>
                                        <label>City</label>
                                        <input type={'text'} name="city" onChange={handleInput} value={checkoutInput.city} className='form-control' />
                                        <small className='text-danger'>{error.city}</small>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='form-group mb-3'>
                                        <label>State</label>
                                        <input type={'text'} name="state" onChange={handleInput} value={checkoutInput.state} className='form-control' />
                                        <small className='text-danger'>{error.state}</small>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='form-group mb-3'>
                                        <label>Zip Code</label>
                                        <input type={'text'} name="zipcode" onChange={handleInput} value={checkoutInput.zipcode} className='form-control' />
                                        <small className='text-danger'>{error.zipcode}</small>
                                    </div>
                                </div>
                                <div className='col-md-12'>
                                    <div className='form-group text-end'>
                                        <button type='button' className='btn btn-primary mx-1' onClick={(e) => submitOrder(e,'cod')}>Place Order</button>
                                        <button type='button' className='btn btn-primary mx-1' onClick={(e) => submitOrder(e,'payonline')}>Pay Online</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-5'>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th width="50%">Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) =>{

                            totalCartPrice += item.product.selling_price * item.product_qty;
                            return(

                            <tr key={item.id}>
                                <td>{item.product.name}</td>
                                <td>{item.product.selling_price}</td>
                                <td>{item.product_qty}</td>
                                <td>{item.product.selling_price * item.product_qty}</td>
                            </tr>
                            )
                        })}
                            <tr>
                                <td colSpan={2} className="text-end fw-bold">Grand Total</td>
                                <td colSpan={2} className="text-end fw-bold">{totalCartPrice}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
    else{
        checkoutList =
        <div>
            <div className='card card-body py-5 text-center shadow-sm'>
                <h4>Your Checkout List is Empty</h4>
            </div>
        </div>
    }

    return(
        <div>
        <Header />
            {/* Modal */}
            <div className="modal fade" id="onlinePaymentModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Online Payment</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <hr />
                        <PayPalButton
                            createOrder={(data, actions) => createOrder(data, actions)}
                            onApprove={(data, actions) => onApprove(data, actions)}
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>


            <div className='py-3 bg-warning'>
                <div className='container'>
                    <h4>Home / Checkout</h4>
                </div>
            </div>
            <div className='py-4'>
                <div className='container'>
                    {checkoutList}
                </div>
            </div>
        <Footer />
        </div>
    )
}

export default Checkout;