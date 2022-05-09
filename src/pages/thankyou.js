import Header from '../component/include/header';
import Footer from '../component/include/footer';
import React ,{ useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

function Cart(){

    return(
        <div>
        <Header />
            <div className='py-3 bg-warning'>
                <div className='container'>
                    <h4>Home / Order Placed</h4>
                </div>
            </div>
            <div className='py-4'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='card card-body py-5 text-center shadow-sm'>
                                <h4>
                                    Your order is placed successfully.<br />
                                    Thank you for shopping with us!
                                </h4>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            
        <Footer />
        </div>
    )
}

export default Cart;