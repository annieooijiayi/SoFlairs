import React, { useEffect, useState } from 'react';
import Header from '../component/include/header';
import Footer from '../component/include/footer';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

function Products(){
    
    const [productList, setProductList] = useState([]);
    const [category, setCategory] = useState([]);
    //const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {slug} = useParams();

    const productCount = productList.length;

    useEffect(() =>{
        let isMounted = true;

        
        axios.get(`/api/fetch-products/${slug}`).then(res =>{
            if (isMounted){
                if (res.data.status === 200){
                    setProductList(res.data.product_data.product);
                    setCategory(res.data.product_data.category);
                    //setLoading(false);
                }
                else if (res.data.status === 400){
                    swal("Warning", res.data.message, "error");
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
    }, [slug]);

    {/*if (loading){
        return <h4>Loading Products..</h4>
    }
    else{
        setLoading(false);*/}
        var showProductList = '';
        if (productCount){
            showProductList = productList.map((item) =>{
                return(
                    <div className='col-md-3' key={item.id}>
                        <div className='card'>
                            <Link to={`${item.slug}`}>
                                <img src={`http://127.0.0.1:8000/${item.image}`} className='w-100' alt='' />
                            </Link>
                            <div className='card-body'>
                                <Link to={`${item.slug}`}>
                                    <h5>{item.name}</h5>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            });
        }
        else{
            showProductList = 
            <div className='col-md-12'>
                <h4>No Product Available for {category.name}</h4>
            </div>
        }
    //}

    return(
        <div>
            <Header />
                <div className='py-3 bg-warning'>
                    <div className='container'>
                        <h4>Category / {category.name}</h4>
                    </div>
                </div>
                <div className='py-3'>
                    <div className='container'>
                        <div className='row'>
                            {showProductList}
                        </div>
                    </div>
                </div>
            <Footer />
        </div>
    )
}

export default Products;