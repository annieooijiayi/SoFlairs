import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './header';
import Sidebar from './sidebar';
import Footer from './footer';
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts';
import axios from 'axios';
import swal from 'sweetalert';



function EditCategory(props) {

    const navigate = useNavigate();
    
    const [categoryInput, setCategory] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState([]);
    const {id} = useParams();

    useEffect(() =>{
        
        //const category_id = props.match.params.id;
        axios.get(`api/edit-category/${id}`).then(res =>{
            if (res.data.status === 200){
                setCategory(res.data.category);
            }
            else if(res.data.status === 404){
                swal("Error", res.data.message, "error");
                navigate('/admin/category');
            }
            setLoading(false);
        });
    },[id]);
    
    const handleInput = (e) =>{
        e.persist();
         setCategory({...categoryInput, [e.target.name]: e.target.value });
    }

    const updateCategory = (e) => {
        e.preventDefault();

        const data = categoryInput;

        axios.put(`/api/update-category/${id}`, data).then(res => {
            if (res.data.status === 200){
                swal('Success', res.data.message, 'success');
                setError([]);
                navigate('/admin/category');
            }
            else if (res.data.status === 422){
                swal('All fields are mandatory', "", 'error');
                setError(res.data.errors);
            }
            else if (res.data.status === 404){
                swal('Error', res.data.message, 'error');
                navigate('/admin/category');
            }
        });
    }

    if (loading){
        return <h4>Loading...</h4>
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
                            <h1 className='mt-4' style={{textAlign: 'left'}}>Edit Category</h1>
                            <form onSubmit={updateCategory}>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link category-tab active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link category-tab" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className='form-group mb-3'>
                                            <label>Slug</label>
                                            <input type={'text'} name="slug" onChange={handleInput} value={categoryInput.slug} className='form-control' />
                                            <span style={{color: 'red'}}>{error.slug}</span>
                                        </div>
                                        <div className='form-group mb-3'>
                                            <label>Name</label>
                                            <input type={'text'} name="name" onChange={handleInput} value={categoryInput.name} className='form-control' />
                                            <span style={{color: 'red'}}>{error.name}</span>
                                        </div>
                                        <div className='form-group mb-3'>
                                            <label>Description</label>
                                            <textarea name="description" onChange={handleInput} value={categoryInput.description} className='form-control'></textarea>
                                        </div>
                                        <div className='form-group mb-3'>
                                            <label>Status</label>
                                            <input type={'checkbox'} name="status" onChange={handleInput} value={categoryInput.status} /> Ticked = shown / Unticked = hidden
                                            
                                        </div>
                                    </div>
                                    <div className="tab-pane card-body border fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
                                        <div className='form-group mb-3'>
                                            <label>Meta Title</label>
                                            <input type={'text'} name="meta_title" onChange={handleInput} value={categoryInput.meta_title} className='form-control' />
                                            <span style={{color: 'red'}}>{error.meta_title}</span>
                                        </div>
                                        <div className='form-group mb-3'>
                                            <label>Meta Keywords</label>
                                            <textarea name="meta_keywords" onChange={handleInput} value={categoryInput.meta_keywords} className='form-control'></textarea>
                                        </div>
                                        <div className='form-group mb-3'>
                                            <label>Meta Description</label>
                                            <textarea name="meta_description" onChange={handleInput} value={categoryInput.meta_description} className='form-control'></textarea>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-dark" style={{float: 'right'}}>Update</button>
                            </form>
                        </div>
                    </main>
                    
                    <Footer />
                </div>
            </div>

        </div>
    )
}
export default EditCategory;