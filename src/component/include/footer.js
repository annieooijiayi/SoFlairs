import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Footer(){
    return(
        <div>
           <div className="footer-1 container-fluid" style={{backgroundColor: 'black'}}>
                <div className="container">
                    <div>
                        <ul className="footer-icons">
                            <li><span><FaFacebookF size="20px"/></span></li>
                            <li><span><FaTwitter size="20px"/></span></li>
                            <li><span><FaInstagram size="20px"/></span></li>
                        </ul>
                    </div>
                    
                    <div>
                        <ul className="footer-links">
                            <li><Link to="/" className="white">Home</Link></li>
                            <li><Link to="/categories" className="white">Collections</Link></li>
                        </ul>
                    </div>
                </div>
            </div> 
            <div className="footer-2 container-fluid" style={{backgroundColor: '#005b96'}}>
                <div className="container">
                    <p className="white">Copyright 2022 SoFlairs. All rights reserved.</p>
                </div>    
            </div>
        </div>
        
    )
}

export default Footer;