import React from 'react';
import {Link} from 'react-router-dom'


const Sidebar = () => {
    return(
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading">Core</div>
                    <Link to="/admin/dashboard" className="nav-link" >
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Dashboard
                    </Link>
                    <Link to="/admin/profile" className="nav-link" >
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Profile
                    </Link>
                    <Link to="/admin/products" className="nav-link collapsed"  data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                        Products
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link to="/admin/add-products" className="nav-link" >Add Product</Link>
                            <Link to="/admin/view-products" className="nav-link" >View Product</Link>
                        </nav>
                    </div>
                    <Link to="/admin/category" className="nav-link" >
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Category
                    </Link>
                    <Link to="/admin/orders" className="nav-link" >
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Orders
                    </Link>
                    
                    
                    
                    
                </div>
            </div>
            <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                Start Bootstrap
            </div>
        </nav>
    );
}    

export default Sidebar;