import Header from '../component/include/header';
import Footer from '../component/include/footer';
import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';


function Register(){

    const [name, setName] = useState("");
    const [username, setUsername] =useState("");
    const [email, setEmail] =useState("");
    const [userpassword, setUserPassword] =useState("");
    const [passwordError, setPasswordError] = useState("");
    const [duplicatedEmailError, setDuplicatedEmailError] = useState("");
    const [duplicatedUsernameError, setDuplicatedUsernameError] = useState("");
    const navigate = useNavigate();

    {/*async function signUp(){

        let item={name, username, email, userpassword}
        console.warn(item);

        let result = await fetch("http://localhost:8000/api/register", {
            method: 'POST',
            body: JSON.stringify(item),
            headers:{
                "Content-Type":'application/json',
                "Accept":'application/json'
            }
        })

        result = await result.json();
        console.log("result", result);

    }}*/}

    const signUp = (e) => {
        e.preventDefault();

        const data ={
            name: name,
            username: username,
            email: email,
            userpassword: userpassword,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/register`, data).then(res =>{
                if (res.data.status === 200){
                    {/*localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);*/}
                    swal("Success", res.data.message, "success");
                    navigate('/');
                }
                else{
                    setPasswordError(res.data.validation_errors.userpassword);
                    setDuplicatedEmailError(res.data.validation_errors.email);
                    setDuplicatedUsernameError(res.data.validation_errors.username);
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
                    <h1 style={{textAlign:'center'}}>Sign Up</h1>
                    <form id="register-form" style={{textAlign: 'left', marginTop: '20px'}} onSubmit={signUp}>
                        <div>
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input type={'text'} value={name} onChange={(e)=>setName(e.target.value)} className="form-control" id="name" required></input>
                        </div>
                        
                        <div>
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type={'text'} value={username} onChange={(e)=>setUsername(e.target.value)} className="form-control" id="username" required></input>
                            <span style={{color: 'red'}}>{duplicatedUsernameError}</span>
                        </div>
                        
                        <div>
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type={'email'} value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="email" required></input>
                            <span style={{color: 'red'}}>{duplicatedEmailError}</span>
                        </div>
                        
                        <div>
                            <label htmlFor="userpassword" className="form-label">Password</label>
                            <input type={'password'} value={userpassword} onChange={(e)=>setUserPassword(e.target.value)} className="form-control" id="userpassword" required></input>
                            <span style={{color: 'red'}}>{passwordError}</span>
                        </div>
                        
                    </form>
                    <div style={{textAlign:'center'}}>
                        <button type="submit" form='register-form'>Sign Up</button>
                        <div>
                            <Link to="/login" style={{textDecoration: 'none', color: '#000' }}>Already have an account? Login</Link>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <Footer />
        </div>
    )
}

export default Register;