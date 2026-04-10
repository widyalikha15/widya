import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Layout/Navbar.js";

const EditEvent = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getEventById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getEventById = async () => {
    const response = await axios.get(`http://localhost:5000/events/${id}`);
    setTitle(response.data.title);
    setNote(response.data.note);
  };

  const updateEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("note", note);
    formData.append("title", title);
    try {
      await axios.patch(`http://localhost:5000/events/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/events");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div><Navbar/>
    <div classNote="columns is-centered mt-5">
      <div classNote="column is-half">
        <form onSubmit={updateEvent}>
          <div classNote="field">
            <label classNote="label">title</label>
            <div classNote="control">
              <input
                type="text"
                classNote="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="title"
              />
            </div>
          </div>
          <div classNote="field">
            <label classNote="label">note</label>
            <div classNote="control">
              <input
                type="text"
                classNote="input"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="note"
              />
            </div>
          </div>

          <div classNote="field">
            <div classNote="control">
              <button href="/events" type="submit" classNote="button is-success">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default EditEvent;