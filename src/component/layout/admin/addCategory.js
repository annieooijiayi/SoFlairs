import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './header';
import Sidebar from './sidebar';
import Footer from './footer';
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts';
import axios from 'axios';
import swal from 'sweetalert';



const AddCategory = () => {

    const navigate = useNavigate();
    
    const [categoryInput, setCategory] = useState({
        slug: '',
        name: '',
        description: '',
        status: '',
        meta_title: '',
        meta_keywords: '',
        meta_description: '',
        error_list: [],
    });
    
    const handleInput = (e) =>{
        e.persist();
         setCategory({...categoryInput, [e.target.name]: e.target.value })
    }

    const submitCategory = (e) =>{
        e.preventDefault();

        const data = {
            slug: categoryInput.slug,
            name: categoryInput.name,
            description: categoryInput.description,
            status: categoryInput.status,
            meta_title: categoryInput.meta_title,
            meta_keywords: categoryInput.meta_keywords,
            meta_description: categoryInput.meta_description,
        }

        axios.post(`/api/store-category`,data).then(res => {
            if(res.data.status === 200){
                swal("Success", res.data.message, "success");
                document.getElementById('category_form').reset();
                navigate('/admin/category');
            }
            else if (res.data.status === 400){
                setCategory({...categoryInput, error_list:res.data.errors});
            }
        });
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
                            <h1 className='mt-4' style={{textAlign: 'left'}}>Add Category</h1>
                            <form onSubmit={submitCategory} id="category_form">
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
                                            <span style={{color: 'red'}}>{categoryInput.error_list.slug}</span>
                                        </div>
                                        <div className='form-group mb-3'>
                                            <label>Name</label>
                                            <input type={'text'} name="name" onChange={handleInput} value={categoryInput.name} className='form-control' />
                                            <span style={{color: 'red'}}>{categoryInput.error_list.name}</span>
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
                                            <span style={{color: 'red'}}>{categoryInput.error_list.meta_title}</span>
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
                                <button type="submit" className="btn btn-dark" style={{float: 'right'}}>Submit</button>
                            </form>
                        </div>
                    </main>
                    
                    <Footer />
                </div>
            </div>

        </div>
    )
}
export default AddCategory;