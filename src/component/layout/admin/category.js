import React, { useEffect, useState } from 'react';
import Navbar from './header';
import Sidebar from './sidebar';
import Footer from './footer';
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

const Category = () => {

    const [loading,setLoading] = useState(true);
    const [categoryList,setCategoryList] = useState([]);

    useEffect(() => {

        axios.get(`/api/category`).then(res => {
            //console.log(res.data.category);
            if (res.status === 200){
                setCategoryList(res.data.category)
            }
            setLoading(false);
        });
    }, []);

    const deleteCategory = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting..";

        axios.delete(`/api/delete-category/${id}`).then(res =>{
            if (res.data.status === 200){
                swal("Success", res.data.message, "success");
                thisClicked.closest("tr").remove();
            }
            else if (res.data.status === 404){
                swal("Failed", res.data.message, "error");
                thisClicked.innerText = "Delete";
            }
        });
    }

    var viewCategory_HTMLTable = "";
    if (loading){
        return <h4>Loading Category...</h4>
    }
    else{
        viewCategory_HTMLTable = 
        categoryList.map((item) =>{
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.slug}</td>
                    <td>{item.status}</td>
                    <td><Link to={`edit-category/${item.id}`} className="btn btn-success btn-sm">Edit</Link></td>
                    <td><button type='button' onClick={(e) => deleteCategory(e, item.id)} className="btn btn-danger btn-sm">Delete</button></td>
                </tr>
            )
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
                            <div className='title-row' style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                <h1 className='mt-4' style={{textAlign: 'left'}}>Category</h1>
                                <Link to="/admin/add-category" className='btn btn-primary' style={{backgroundColor:'#005b96', float:'right', margin: '18px'}}>Add Category</Link>
                            </div>
                            <div className='card card-body'>
                                <table className='table table-bordered table-striped'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Slug</th>
                                            <th>Status</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {viewCategory_HTMLTable}
                                    </tbody>
                                </table>
                            </div>
                            
                        </div>
                    </main>
                    
                    <Footer />
                </div>
            </div>

        </div>
    )
}
export default Category;