import React, { useEffect, useState } from 'react';
import Navbar from './header';
import Sidebar from './sidebar';
import Footer from './footer';
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

const Orders = () => {

    const [loading, setLoading] = useState(true);
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {

        document.title = "View Orders";

        axios.get(`/api/view-orders`).then(res=>{
            if (res.data.status === 200){
                setOrderList(res.data.orders);
                setLoading(false);
            }
        });
    },[]);

    var display_orders = "";
    if (loading){
        return <h4>Loading Orders..</h4>
    }
    else{
        display_orders = orderList.map((item) =>{
            
            return(
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.tracking_num}</td>
                    <td>{item.fullname}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    {/*<td>
                        <Link to={`view-orders/${item.id}`} className="btn btn-success btn-sm">View</Link>
                    </td>*/}
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
                                    <h2>Orders</h2>
                                </div>
                                <div className='card-body'>
                                    <div className='table-responsive'>
                                        <table className='table table-bordered table-striped'>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Tracking Number</th>
                                                    <th>Name</th>
                                                    <th>Phone</th>
                                                    <th>Email</th>
                                                    {/*<th>Action</th>*/}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {display_orders}
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
export default Orders;