import React, { useEffect, useState } from 'react';
import Header from '../component/include/header';
import Footer from '../component/include/footer';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

function ProductDetails(){
    
    const [productList, setProductList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    //const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {category_slug,product_slug} = useParams();
    const [quantity, setQuantity] = useState(1);

    useEffect(() =>{
        let isMounted = true;

        
        axios.get(`/api/view-product-details/${category_slug}/${product_slug}`).then(res =>{
            if (isMounted){
                if (res.data.status === 200){
                    console.log(res.data.product);
                    setProductList(res.data.product);
                    setCategoryList(res.data.product.category);
                    //setLoading(false);
                }
                else if (res.data.status === 404){
                    navigate('/categories');
                    swal("Warning", res.data.message, "error");
                }
            }
        });

        return ()=>{
            isMounted = false;
        }
    }, [category_slug,product_slug]);

    const handleDecrement = () =>{
        if (quantity > 1){
            setQuantity(prevCount => prevCount - 1);
        }
    }

    const handleIncrement = () =>{
        if (quantity < 10){
            setQuantity(prevCount => prevCount + 1);
        }
    }

    const addToCart = (e) => {
        e.preventDefault();

        const data = {
            product_id: productList.id,
            product_qty:quantity
        }

        axios.post(`api/add-to-cart`, data).then(res =>{
            if (res.data.status === 201){
                swal("Success", res.data.message, "success");
            }
            else if(res.data.status === 409){
                swal("Warning", res.data.message, "warning");
            }
            else if(res.data.status === 401){
                swal("Error", res.data.message, "error");
            }
            else if(res.data.status === 404){
                swal("Warning", res.data.message, "warning");
            }
        });
    }

    var avail_stock = "";
    if (productList.qty > 0){
        avail_stock =
        <div>
            <label className='btn-sm btn-success px-4 mt-2'>In Stock</label>

            <div className='row'>
                <div className='col-md-3 mt-3'>
                    <div className='input-group'>
                        <button type='button' onClick={handleDecrement} className='input-group-text'>-</button>
                        <div className='form-control text-center' >{quantity}</div>
                        <button type='button' onClick={handleIncrement} className='input-group-text'>+</button>
                    </div>
                </div>
                <div className='col-md-3 mt-3'>
                    <button type='button' onClick={addToCart} className='btn btn-primary w-100 cart-btn'>Add to Cart</button>
                </div>
            </div>
        </div>
    }
    else{
        avail_stock =
        <div>
            <label className='btn-sm btn-danger px-4 mt-2'>Out of Stock</label>
        </div>    
    }

    return(
        <div>
            <Header />
                <div className='py-3 bg-warning'>
                    <div className='container'>
                        <h4>Category / {categoryList.name} / {productList.name}</h4>
                    </div>
                </div>
                <div className='py-3'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-4 border-end'>
                                <img src={`http://127.0.0.1:8000/${productList.image}`} alt='Product Image' className='w-100' />
                            </div> 
                            <div className='col-md-8'>
                                <h4>
                                    {productList.name}
                                    <span className='float-end badge btn-sm btn-danger badge-pil'>{productList.brand}</span> 
                                </h4>
                                <p>{productList.description}</p>
                                <h4 className='mb-1'>
                                    Rs:{productList.selling_price}
                                    <s className='ms-2'>Rs:{productList.original_price}</s>
                                </h4>
                                <div>
                                    {avail_stock}
                                </div>
                                <button type='button' className='btn btn-danger mt-3'>Add to Wishlist</button>
                            </div>
                        </div>
                    </div>
                </div>
            <Footer />
        </div>
    )
}

export default ProductDetails;