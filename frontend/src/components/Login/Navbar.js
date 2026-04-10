import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Logo from '../../asset/Logo.png';

 
const Navbar = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [setUsers] = useState([]);
    const history = useNavigate();
 
    useEffect(() => {
        refreshToken();
        getUsers();
        // eslint-disable-next-line
    }, []);
 
    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.name);
            setEmail(decoded.email);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                history("/");
            }
        }
    }
 
    const axiosJWT = axios.create();
 
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
 
    const getUsers = async () => {
    try{
        const response = await axiosJWT.get('http://localhost:5000/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(response.data);
    } catch (error) {
        if (error.response) {
            history("/");
        }
    }
    }
    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout');
            history("/");
        } catch (error) {
            console.log(error);
        }
    }
 
    return (
        <nav className="navbar is-light" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item" href="\dashboard">
                        <img src={Logo} width="112" height="28" alt="logo" />
                    </a>
 
                    <a href="/dashboard" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
 
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a href="/dashboard" className="navbar-item">
                            Home
                        </a>
                        <a href="/users" className="navbar-item">
                            Users
                        </a>
                        <a href="/register" className="navbar-item">
                            Register
                        </a>
                        <a href="/employee" className="navbar-item">
                            Employee
                        </a>
                        <a href="/product" className="navbar-item">
                            Product
                        </a>
                        <a href="/customer" className="navbar-item">
                            Customer
                        </a>
                        <a href="/events" className="navbar-item">
                            events
                        </a>
                    </div>
 
                    <div className="navbar-end">
                    <h1>Welcome Back: {name} - {email}</h1>
                        <div className="navbar-item">
                            <div className="buttons">
                                <button onClick={Logout} className="button is-light">
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
 
export default Navbar