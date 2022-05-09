import Header from '../component/include/header';
import Footer from '../component/include/footer';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function Login(){

    const [username, setUsername] = useState("");
    const [userpassword, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const login = (e) =>{
        e.preventDefault();

        const data={
            username: username,
            userpassword: userpassword
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/login`, data).then(res => {
                if (res.data.status === 200){
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal("Success", res.data.message, "success");

                    if(res.data.role === 'admin'){
                        navigate('/admin/dashboard');
                    }
                    else{
                        navigate('/');
                    }

                    
                } 
                else if (res.data.status === 401){
                    swal("Warning", res.data.message, "warning");
                }
                else{
                    setUsernameError(res.data.validation_errors.username);
                    setPasswordError(res.data.validation_errors.userpassword);
                }
            });
        });
    }

    return(
        <div>
        <Header />
        <div className="container-fluid" style={{background: "linear-gradient(to right, #2c5364, #0f2027)"}}>
            <div className="container registration-container" style={{padding: '80px 0'}}>
                <div className="col-md-6 offset-md-3" style={{backgroundColor: "#fff", padding: '40px'}}>
                    <h1 style={{textAlign:'center'}}>Sign In</h1>
                    <form id="login-form" style={{textAlign: 'left', marginTop: '20px'}} onSubmit={login}>
                    
                        <div>
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type={'text'} value={username} onChange={(e)=>setUsername(e.target.value)} className="form-control" id="username" required></input>
                            <span style={{color: 'red'}}>{usernameError}</span>
                        </div>
                        
                        <div>
                            <label htmlFor="userpassword" className="form-label">Password</label>
                            <input type={'password'} value={userpassword} onChange={(e)=>setPassword(e.target.value)} className="form-control" id="userpassword" required></input>
                            <span style={{color: 'red'}}>{passwordError}</span>
                        </div>
                        
                        
                    </form>
                    <Link to="/forgot-password" style={{textDecoration: 'none', float:'right', color: '#000' }}>Forgot password?</Link>
                    <br />  
                    <div style={{textAlign:'center'}}>
                        <button type="submit" form="login-form">Sign In</button>
                        <div>
                            <Link to="/register" style={{textDecoration: 'none', color: '#000' }}>Doesn't have an account? Register</Link>
                        </div>
                    </div>                  
                    
                </div>
            </div>
        </div>
        <Footer />
        </div>
    )
}

export default Login;