import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import axiosBaseURL from "../../httpCommon";

const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  const getCustomerById = useCallback(async () => {
    try {
      const response = await axiosBaseURL.get(`/customers/${id}`);

      setName(response.data.name);
      setEmail(response.data.email);
      setGender(response.data.gender);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    getCustomerById();
  }, [getCustomerById]);

  const updateCustomer = async (e) => {
    e.preventDefault();

    try {
      await axiosBaseURL.patch(`/customers/${id}`, {
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
              <h1 className="title">Edit Customer</h1>

              <form onSubmit={updateCustomer}>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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

                <button type="submit" className="button is-info">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditCustomer;