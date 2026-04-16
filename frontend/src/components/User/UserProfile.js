import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import { refreshToken } from "../../Services/authService";
import { getEmployees } from "../../Services/employeeService";

const UserProfile = () => {
  const [authUser, setAuthUser] = useState({
    userId: "",
    name: "",
    email: "",
  });

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loadProfile = useCallback(
    async (loginEmail) => {
      try {
        const response = await getEmployees();

        const foundEmployee = response.data.find(
          (emp) => emp.email === loginEmail
        );

        setProfile(foundEmployee || null);
      } catch (error) {
        console.error(error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  useEffect(() => {
    const initializePage = async () => {
      const result = await refreshToken(navigate);

      if (result.success) {
        setAuthUser(result.user);
        await loadProfile(result.user.email);
      }
    };

    initializePage();
  }, [navigate, loadProfile]);

  const initial = (profile?.name || authUser.name || "U")
    .charAt(0)
    .toUpperCase();

  return (
    <>
      <Navbar />

      <section className="hero has-background-grey-light is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div
              className="box"
              style={{ maxWidth: "700px", margin: "0 auto" }}
            >
              {loading ? (
                <div className="has-text-centered">
                  <button className="button is-loading is-white">
                    Loading
                  </button>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div
                    style={{
                      textAlign: "center",
                      marginBottom: "30px",
                    }}
                  >
                    <div
                      style={{
                        width: "90px",
                        height: "90px",
                        borderRadius: "50%",
                        background: "#363636",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "32px",
                        fontWeight: "bold",
                        margin: "0 auto 15px",
                      }}
                    >
                      {initial}
                    </div>

                    <h1 className="title is-4">My Profile</h1>
                    <p className="subtitle is-6">
                      Employee account information
                    </p>
                  </div>

                  {/* Profile Content */}
                  <div className="content">
                    <div className="field">
                      <label className="label">Full Name</label>
                      <input
                        className="input"
                        value={profile?.name || authUser.name}
                        readOnly
                      />
                    </div>

                    <div className="field">
                      <label className="label">Email</label>
                      <input
                        className="input"
                        value={profile?.email || authUser.email}
                        readOnly
                      />
                    </div>

                    {/* ✅ FIXED USER ID */}
                    <div className="field">
                      <label className="label">ID</label>
                      <input
                        className="input"
                        value={authUser.userId}
                        readOnly
                      />
                    </div>

                    <div className="field">
                      <label className="label">Nomor HP</label>
                      <input
                        className="input"
                        value={profile?.phone ?? ""}
                        readOnly
                      />
                    </div>

                    <div className="field">
                      <label className="label">Jabatan</label>
                      <input
                        className="input"
                        value={profile?.position?.name ?? ""}
                        readOnly
                      />
                    </div>

                    <div className="field">
                      <label className="label">Status</label>
                      <input
                        className="input"
                        value={profile?.status ?? ""}
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Activity */}
                  <div
                    className="box"
                    style={{
                      background: "#fafafa",
                      marginTop: "25px",
                    }}
                  >
                    <h2 className="title is-6 mb-3">
                      Recent Activity
                    </h2>

                    <div className="content">
                      <p>
                        <strong>Last Login:</strong>{" "}
                        14 April 2026, 08:30 WIB
                      </p>
                      <p>
                        <strong>Last Profile Update:</strong>{" "}
                        13 April 2026, 19:10 WIB
                      </p>
                      <p>
                        <strong>Latest Activity:</strong>{" "}
                        Updated employee profile information
                      </p>
                      <p>
                        <strong>Login Device:</strong>{" "}
                        Windows PC - Edge Browser
                      </p>
                    </div>
                  </div>

                  {/* ✅ FIXED EDIT LINK */}
                  <div className="has-text-centered mt-5">
                    <Link
                      to={`/userprofile/edit/${authUser.userId}`}
                      className="button is-info"
                    >
                      Edit Profile
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;