import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function AdminPrivateRoute({children}){

    const [Authenticated, setAuthenticated] = useState(false);
    const [Loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get(`/api/checkingAuthenticated`).then( res => {
            if (res.status === 200){
                setAuthenticated(true);
            }
            setLoading(false)
        });

        return () => {
            setAuthenticated(false);
        };
    }, []);

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if (err.response.status === 401){
            swal("Unauthorised", err.response.data.message, "warning");
            navigate('/');
        }
        return Promise.reject(err);
    });

    axios.interceptors.response.use(function(response) {
        return response;
        },function (error) {
            if (error.response.status === 403){ //Access Denied
                swal("Forbidden", error.response.data.message, "warning");
                navigate('/403');
            }
            else if (error.response.status === 404){ //Page Not Found
                swal("404 Error", "Url/Page Not Found", "warning");
                navigate('/404');
            }
            return Promise.reject(error);
        }
    );

    if (Loading){
        return <h2>Loading</h2>
    }
    
    {/*const auth = localStorage.getItem('auth_token');*/}

    return Authenticated ? children : <Navigate to='/login' />;
}

export default AdminPrivateRoute;