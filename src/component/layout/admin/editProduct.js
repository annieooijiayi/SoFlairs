import React, { useEffect, useState } from 'react';
import Navbar from './header';
import Sidebar from './sidebar';
import Footer from './footer';
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

const EditProduct = () => {

    const [categoryList, setCategoryList] = useState([]);
    const [productInput, setProductInput] = useState({
        category_id: '',
        slug:'',
        name:'',
        description:'',
        meta_title:'',
        meta_keywords:'',
        meta_description:'',
        selling_price:'',
        original_price:'',
        qty:'',
        brand:''
    });

    const [picture, setPicture] = useState([]);
    const [errorList, setError] = useState([]);
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [allcheckbox, setCheckboxes] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setProductInput({...productInput,[e.target.name]:e.target.value});
    }

    const handleImage = (e) => {
        setPicture({image:e.target.files[0]});
    }

    const handleCheckbox = (e) => {
        e.persist();
        setCheckboxes({...allcheckbox,[e.target.name]:e.target.checked});
    }
    
    useEffect(() => {

        axios.get(`/api/all-category`).then(res =>{
            if(res.data.status === 200){
                setCategoryList(res.data.category);
            }
        });

        axios.get(`/api/edit-product/${id}`).then(res =>{
                if (res.data.status === 200){
                    setProductInput(res.data.product);
                    setCheckboxes(res.data.product);
                }
                else if (res.data.status === 404){
                    swal("Error", res.data.message, "error");
                    navigate('/admin/view-products');
                }
                setLoading(false);
        });

    }, [id]);

    const updateProduct = (e) =>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', picture.image);
        formData.append('category_id', productInput.category_id);
        formData.append('slug', productInput.slug);
        formData.append('name', productInput.name);
        formData.append('description', productInput.description);
        formData.append('meta_title', productInput.meta_title);
        formData.append('meta_keywords', productInput.meta_keywords);
        formData.append('meta_description', productInput.meta_description);
        formData.append('selling_price', productInput.selling_price);
        formData.append('original_price', productInput.original_price);
        formData.append('qty', productInput.qty);
        formData.append('brand', productInput.brand);
        formData.append('featured', allcheckbox.featured ? '1':'0');
        formData.append('popular', allcheckbox.popular ? '1':'0');
        formData.append('status', allcheckbox.status ? '1':'0');

        axios.post(`/api/update-product/${id}`, formData).then(res =>{
            if (res.data.status === 200){
                swal("Success", res.data.message, "success");
                navigate('/admin/view-products');
                console.log(allcheckbox);
                setError([]);
            }
            else if (res.data.status === 422){
                swal("All fields are mandatory","","error");
                setError(res.data.errors);
            }
            else if (res.data.status === 404){
                swal("Error", res.data.message, "error");
                navigate('/admin/view-products');
            }
        });
    }

    if (loading){
        return <h4>Loading data...</h4>
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
                                    <h2>Edit Product
                                        <Link to="/admin/view-products" className='btn btn-primary btn-sm float-end' style={{marginTop:'8px'}}>View Products</Link>
                                    </h2>
                                </div>
                                <div className='card-body'>
                                    <form onSubmit={updateProduct} encType='multipart/form-data'>
                                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link product-tab active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link product-tab" id="seotags-tab" data-bs-toggle="tab" data-bs-target="#seotags" type="button" role="tab" aria-controls="seotags" aria-selected="false">SEO Tags</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link product-tab" id="otherdetails-tab" data-bs-toggle="tab" data-bs-target="#otherdetails" type="button" role="tab" aria-controls="otherdetails" aria-selected="false">Others</button>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="myTabContent">
                                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                <div className='form-group mb-3'>
                                                    <label>Select Category</label>
                                                    <select name='category_id' onChange={handleInput} value={productInput.category_id} className='form-control'>
                                                        <option>Select Category</option>
                                                        {
                                                            categoryList.map( (item) => {
                                                                return(
                                                                    <option value={item.id} key={item.id}>{item.name}</option>
                                                                )
                                                            })
                                                        }
                                                        
                                                    </select>
                                                    <span style={{color: 'red'}}>{errorList.category_id}</span>
                                                </div>
                                                <div className='form-group mb-3'>
                                                    <label>Slug</label>
                                                    <input type={'text'} name="slug" onChange={handleInput} value={productInput.slug} className='form-control' />
                                                    <span style={{color: 'red'}}>{errorList.slug}</span>
                                                </div>
                                                <div className='form-group mb-3'>
                                                    <label>Name</label>
                                                    <input type={'text'} name="name" onChange={handleInput} value={productInput.name} className='form-control' />
                                                    <span style={{color: 'red'}}>{errorList.name}</span>
                                                </div>
                                                <div className='form-group mb-3'>
                                                    <label>Description</label>
                                                    <textarea name='description' onChange={handleInput} value={productInput.description} className='form-control'></textarea>
                                                </div>
                                            </div>
                                            <div className="tab-pane card-body border fade" id="seotags" role="tabpanel" aria-labelledby="seotags-tab">
                                                <div className='form-group mb-3'>
                                                    <label>Meta Title</label>
                                                    <input type={'text'} name="meta_title" onChange={handleInput} value={productInput.meta_title} className='form-control' />
                                                    <span style={{color: 'red'}}>{errorList.meta_title}</span>
                                                </div>
                                                <div className='form-group mb-3'>
                                                    <label>Meta Keywords</label>
                                                    <textarea name="meta_keywords" onChange={handleInput} value={productInput.meta_keywords} className='form-control'></textarea>
                                                </div>
                                                <div className='form-group mb-3'>
                                                    <label>Meta Description</label>
                                                    <textarea name="meta_description" onChange={handleInput} value={productInput.meta_description} className='form-control'></textarea>
                                                </div>
                                            </div>
                                            <div className="tab-pane card-body border fade" id="otherdetails" role="tabpanel" aria-labelledby="otherdetails-tab">
                                                <div className='row'>
                                                    <div className='col-md-4 form-group mb-3'>
                                                        <label>Selling Price</label>
                                                        <input type={'text'} name="selling_price" onChange={handleInput} value={productInput.selling_price} className='form-control' />
                                                        <span style={{color: 'red'}}>{errorList.selling_price}</span>
                                                    </div>
                                                    <div className='col-md-4 form-group mb-3'>
                                                        <label>Original Price</label>
                                                        <input type={'text'} name="original_price" onChange={handleInput} value={productInput.original_price} className='form-control' />
                                                        <span style={{color: 'red'}}>{errorList.original_price}</span>
                                                    </div>
                                                    <div className='col-md-4 form-group mb-3'>
                                                        <label>Stock Quantity</label>
                                                        <input type={'text'} name="qty" onChange={handleInput} value={productInput.qty} className='form-control' />
                                                        <span style={{color: 'red'}}>{errorList.qty}</span>
                                                    </div>
                                                    <div className='col-md-4 form-group mb-3'>
                                                        <label>Brand</label>
                                                        <input type={'text'} name="brand" onChange={handleInput} value={productInput.brand} className='form-control' />
                                                        <span style={{color: 'red'}}>{errorList.brand}</span>
                                                    </div>
                                                    <div className='col-md-8 form-group mb-3'>
                                                        <label>Image</label>
                                                        <input type={'file'} name="image" onChange={handleImage} className='form-control' />
                                                        <img src={`http://127.0.0.1:8000/${productInput.image}`} width={'60px'} alt={productInput.name} />
                                                        <span style={{color: 'red'}}>{errorList.image}</span>
                                                    </div>
                                                    <div className='col-md-4 form-group mb-3'>
                                                        <label>Featured (check to show)</label> 
                                                        <input type={'checkbox'} name="featured" onChange={handleCheckbox} defaultChecked={allcheckbox.featured === 1 ? true:false} className='h-50 w-50' />
                                                    </div>
                                                    <div className='col-md-4 form-group mb-3'>
                                                        <label>Popular (check to show)</label>
                                                        <input type={'checkbox'} name="popular" onChange={handleCheckbox} defaultChecked={allcheckbox.popular === 1 ? true:false} className='h-50 w-50' />
                                                    </div>
                                                    <div className='col-md-4 form-group mb-3'>
                                                        <label>Status (check to hide)</label>
                                                        <input type={'checkbox'} name="status" onChange={handleCheckbox} defaultChecked={allcheckbox.status === 1 ? true:false} className='h-50 w-50' />
                                                    </div>
                                                </div>                                            
                                            </div>
                                        </div>
                                        <button type='submit' className='btn btn-primary float-end px-4 mt-2'>Submit</button>
                                    </form>
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
export default EditProduct;