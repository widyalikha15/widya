/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import Navbar from "../Layout/Navbar.js";
import { Link } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const EventList = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [events, setEvents] = useState([]);
    const [kalenders, setKalenders] = useState([]);
    const history = useNavigate();
 
    useEffect(() => {
        refreshToken();
        getEvents();
    }, []);

    const formatTableDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };
 
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
    const updateEvent = async (info) => {
      await axios.put(
        `http://localhost:5000/events/${info.event.id}`,
        {
          start: info.event.start.toISOString(),
          end: info.event.end?.toISOString()
        }
      );
    };
    const getEvents = async () => {
    try{
        const response = await axiosJWT.get('http://localhost:5000/events', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setEvents(response.data);
        
        const formatDate = (date) => {
          return new Date(date).toISOString().split('T')[0];
        };
        setKalenders(
          response.data.map(e => ({
            id: e.id,
            title: e.title,
            start: formatDate(e.start_time),
            end: formatDate(e.end_time),
            color: e.color,
            backgroundColor: e.color,
           borderColor: e.color
          }))
        );
    } catch (error) {
        if (error.response) {
            history("/");
        }
    }
    }

    const addEvent = async (info) => {
      const title = prompt("Judul event");
      if (!title) return;

      await axios.post("http://localhost:5000/events/", {
        title,
        start_time: info.startStr,
        end_time: info.endStr,
        color: "#2196f3"
      });

      // refresh data calendar
      getEvents();

      // 🔥 redirect ke /events
      history("/events");
    };
    const deleteEvent = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/events/${id}`);
        getEvents();
      } catch (error) {
        console.log(error);
      }
    };
    return (
        <div><Navbar/>
        <h1>Welcome Back: {name} - {email}</h1>
        <div className="columns is-variable is-8">
        <div className="column is-12-mobile is-6-desktop">
          <table className="table is-striped is-fullwidth">
            <thead>
                          <tr>
                              <th>No</th>
                              <th>Title</th>
                              <th>Note</th>
                              <th>start_time</th>
                              <th>end_time</th>
                              <th>color</th>
                          </tr>
                      </thead>
                      <tbody>
                          {events.map((event, index) => (
                              <tr key={event.id}>
                                  <td>{index + 1}</td>
                                  <td>{event.title}</td>
                                  <td>{event.note}</td>
                                  <td>{formatTableDate(event.start_time)}</td>
                                  <td>{formatTableDate(event.end_time)}</td>
                                  <td>{event.color}</td>
                                  <td>
                                  <Link
                                    to={`edit/${event.id}`}
                                    className="button is-small is-info mr-2"
                                  >
                                    Edit
                                  </Link>
                                  <button
                                    onClick={() => deleteEvent(event.id)}
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

        <div className="column is-6">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable
            editable
            events={kalenders}
            select={addEvent}
            eventDrop={updateEvent}
          />
        </div>
      </div>
    </div>
    )
}

export default EventList;
