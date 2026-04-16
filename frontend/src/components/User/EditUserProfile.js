import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axiosBaseURL from "../../httpCommon";

const EditUserProfile = () => {
  const [expire, setExpire] = useState('');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const { id } = useParams();
  const history = useNavigate();
  
  useEffect(() => {
      getUserById();
        refreshToken();
        // eslint-disable-next-line
    }, []);
 
    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            const decoded = jwtDecode(response.data.accessToken);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                history("/");
            }
        }
    }
 
    const axiosJWT = axios.create(
      {
            baseURL:axiosBaseURL
        }
    );
 
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axiosBaseURL.get('/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            const decoded = jwtDecode(response.data.accessToken);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });


  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axiosBaseURL.patch(`/users/${id}`, {
        name,
        email,
        gender,
      });
      history("/userprofile");
    } catch (error) {
      console.log(error);
    }
  };

  const getUserById = async () => {
    const response = await axiosBaseURL.get(`/users/${id}`);
    setName(response.data.name);
    setEmail(response.data.email);
    setGender(response.data.gender);
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={updateUser}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Gender</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <button type="submit" className="button is-success">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserProfile;