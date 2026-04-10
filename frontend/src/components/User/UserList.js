import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import { refreshToken } from "../../Services/authService";
import { fetchUsers, removeUser } from "../../Services/userService";

const UserList = () => {
  const [authUser, setAuthUser] = useState({
    userId: "",
    name: "",
    email: "",
  });
  const [token, setToken] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loadUsers = useCallback(
    async (accessToken) => {
      try {
        const response = await fetchUsers(accessToken);
        setUsers(response.data);
      } catch (error) {
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
        setToken(result.token);
        await loadUsers(result.token);
      }
    };

    initializePage();
  }, [navigate, loadUsers]);

  const handleDelete = async (id) => {
    try {
      await removeUser(id, token);
      await loadUsers(token);
    } catch (error) {
      console.error(error);
    }
  };
return (
    <>
      <Navbar />

      <div className="hero has-background-grey-light is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="box">
              <h1 className="title is-4">
                Welcome Back: {authUser.name} - {authUser.email} - {authUser.userId}
              </h1>

              {loading ? (
                <p>Loading users...</p>
              ) : (
                <table className="table is-striped is-fullwidth">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Gender</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.id}</td>
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
                            onClick={() => handleDelete(user.id)}
                            className="button is-small is-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;