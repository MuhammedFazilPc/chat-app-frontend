import React, { useState } from 'react';
import './Register.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { registerRoute } from '../utils/APIroutes';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"

function Register() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
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
            console.log('in validation', registerRoute)
            const { name, email, password, confirmPassword } = user
            console.log(user)
            const { data } = await axios.post(registerRoute, {
                name,
                email,
                password
            });
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            } else {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                navigate('/setAvatar')
            }
        }

    }
    const handleValidation = () => {
        const { name, email, password, confirmPassword } = user;
        if (password !== confirmPassword) {
            toast.error('passwords should be the same', toastOptions);
            return false;
        } else if (name.length <= 3) {
            toast.error("name should be more than length three")
            return false; 
        } else if (email.length < 8) {
            toast.error('email should be greater than length 8')
            return false;
        } else return true;

    }

    return (

        <div className='container'>
            <form action="" method="post" onSubmit={handleSubmit} className='form'>
                <h2>SIGN UP</h2>
                <input type="email" className='input' name="email" placeholder="E-mail" onChange={handleChange} />
                <input type="text" className='input' name="name" placeholder="UserName" onChange={handleChange} />
                <input type="password" className='input' name="password" placeholder="password" onChange={handleChange} />
                <input type="password" className='input' name="confirmPassword" placeholder="confirm password" onChange={handleChange} />
                <button type="submit" className='button'>Submit</button>
                <span className='span'>already have account ?<Link to={'/login'}>login</Link></span>
            </form>
            <ToastContainer />

        </div>


    );
}

export default Register;
