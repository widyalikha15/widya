/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import Navbar from '../Login/Navbar';
import { Link } from "react-router-dom";

const UserList = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const history = useNavigate();
 
    useEffect(() => {
        refreshToken();
        getUsers();
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
    const deleteUser = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/users/${id}`);
        getUsers();
      } catch (error) {
        console.log(error);
      }
    };
    return (
        <div><Navbar/>
        <div className="container mt-5">
            <h1>Welcome Back: {name} - {email}</h1>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.gender}</td>
                            <td>
                            <Link
                              to={`edit/${user.id}`}
                              className="button is-small is-info mr-2"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="button is-small is-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                    ))}
 
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default UserList;