import React, { useEffect, useState } from 'react';
import Navbar from './header';
import Sidebar from './sidebar';
import Footer from './footer';
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts';
import { Link } from 'react-router-dom';
import axios from 'axios';





const ViewProduct = () => {

    const [loading, setLoading] = useState(true);
    const [productList, setProductList] = useState([]);

    useEffect(() => {

        document.title = "View Product";

        axios.get(`/api/view-product`).then(res=>{
            if (res.data.status === 200){
                setProductList(res.data.products);
                setLoading(false);
            }
        });
    },[]);

    var display_ProductData = "";
    if (loading){
        return <h4>Loading Products..</h4>
    }
    else{
        var product_Status ='';
        display_ProductData = productList.map((item) =>{
            if (item.status == '0'){
                product_Status = 'Shown';
            }
            else if (item.status == '1'){
                product_Status = 'Hidden';
            }
            return(
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td><img src={`http://127.0.0.1:8000/${item.image}`} width={'60px'} alt={item.name} /></td>
                    <td>{item.name}</td>
                    <td>{item.category.name}</td>
                    <td>{item.selling_price}</td>
                    <td>{product_Status}</td>
                    <td>
                        <Link to={`edit-product/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                </tr>
            )
        })
    }

    return(
        <div className='sb-nav-fixed'>
            <Navbar />

            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <Sidebar />
                </div>

                <div id="layoutSidenav_content">
                    <main>
                        <div className='container-fluid px-4'>
                            <div className='card mt-4'>
                                <div className='card-header'>
                                    <h2>View Products
                                    <Link to="/admin/add-products" className='btn btn-primary btn-sm float-end' style={{marginTop:'8px'}}>Add Products</Link>
                                    </h2>
                                </div>
                                <div className='card-body'>
                                    <div className='table-responsive'>
                                        <table className='table table-bordered table-striped'>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Image</th>
                                                    <th>Product Name</th>
                                                    <th>Category Name</th>
                                                    <th>Selling Price</th>
                                                    <th>Status</th>
                                                    <th>Edit</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {display_ProductData}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    
                    <Footer />
                </div>
            </div>

        </div>
    )
}
export default ViewProduct;