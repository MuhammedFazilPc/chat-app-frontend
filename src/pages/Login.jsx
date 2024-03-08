import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { loginRoute } from '../utils/APIroutes';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"

function Login() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (handleValidation()) {
            // console.log('in validation', loginRoute)
            const { email, password } = user
            const { data } = await axios.post(loginRoute, {
                email,
                password
            });
            if (data.status === false)
                toast.error(data.msg, toastOptions);

            else {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                navigate('/')
            }
        }

    }
    const handleValidation = () => {
        const { email, password } = user;
        if (password.length < 4) {
            toast.error('password should minimum length 4 ', toastOptions);
            return false;
        } else if (email.length <= 8) {
            toast.error('minimum email length is 8', toastOptions)
            return false;
        }
        return true;

    }

    return (

        <div className='container'>
            <form action="" method="post" onSubmit={handleSubmit} className='form'>
                <h2>LOGIN</h2>
                <input type="email" className='input' name="email" placeholder="E-mail" onChange={handleChange} />
                <input type="password" className='input' name="password" placeholder="password" onChange={handleChange} />
                <button type="submit" className='button'>Submit</button>
                <span className='span'>don't have account ?<Link to={'/register'}>register</Link></span>
            </form>
            <ToastContainer />

        </div>


    );
}

export default Login;
