import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import axiosBaseURL from "../../httpCommon";

const AddCustomer = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  const saveCustomer = async (e) => {
    e.preventDefault();

    try {
      await axiosBaseURL.post("/customers", {
        name,
        email,
        gender,
      });

      navigate("/customers");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <section className="hero has-background-grey-light is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="column is-half is-offset-one-quarter">
              <h1 className="title">Add Customer</h1>

              <form onSubmit={saveCustomer}>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Customer name"
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      type="email"
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
                        <option value="">Pilih Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button type="submit" className="button is-success">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddCustomer;