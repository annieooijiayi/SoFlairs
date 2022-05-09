import Header from '../component/include/header';
import Footer from '../component/include/footer';
import React, { useState } from 'react';

function ForgotPassword(){

    const [email, setEmail] = useState("");

    return(
        <div>
        <Header />
        <div className="container-fluid" style={{background: "linear-gradient(to right, #2c5364, #0f2027)"}}>
            <div className="container registration-container" style={{padding: '80px 0'}}>
                <div className="col-md-6 offset-md-3" style={{backgroundColor: "#fff", padding: '40px'}}>
                    <h1 style={{textAlign:'center'}}>Forgot Password</h1>
                    <form id="forgot-password-form" style={{textAlign: 'left', marginTop: '20px'}} /*onSubmit={}*/>
                    
                        <div>
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type={'text'} value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="email" required></input>
                        </div>
                        
                    </form>
                    <div style={{textAlign:'center'}}>
                        <button type="submit" form="forgot-password-form">Submit</button>
                    </div>
                    
                </div>
            </div>
        </div>
        <Footer />
        </div>
    )
}

export default ForgotPassword;