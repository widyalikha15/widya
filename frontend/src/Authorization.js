import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const Authorization = () => {
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [setUsers] = useState([]);
    const [setName] = useState('');
    const [setEmail] = useState('');
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
}
 
export default Authorization