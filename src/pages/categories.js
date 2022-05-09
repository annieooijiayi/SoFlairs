import React, { useEffect, useState } from 'react';
import Header from '../component/include/header';
import Footer from '../component/include/footer';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Categories(){
    
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() =>{

        let isMounted = true;

        axios.get(`/api/getCategory`).then(res =>{

            if (isMounted){
                if (res.data.status === 200){
                    setCategory(res.data.category);
                    setLoading(false);
            }
            }
            
        });

        return ()=>{
            isMounted = false;
        }

    });

    if (loading){
        return <h4>Loading Category...</h4>
    }
    else{
        var showCategory = '';
        showCategory = category.map((item) =>{
            return(
                <div className='col-md-4' key={item.id} style={{paddingBottom:'20px'}}>
                    <div className='card'>
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

    return(
        <div>
            <Header />
                <div className='py-3 bg-warning'>
                    <div className='container'>
                        <h4>Category Page</h4>
                    </div>
                </div>
                <div className='py-3'>
                    <div className='container'>
                        <div className='row'>
                            {showCategory}
                        </div>
                    </div>
                </div>
            <Footer />
        </div>
    )
}

export default Categories;