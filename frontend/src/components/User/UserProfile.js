import React, { useEffect, useState } from "react";
import Navbar from "../Layout/Navbar";
import { useNavigate } from "react-router-dom";
import { refreshToken } from "../../Services/authService.js";

const UserProfile = () => {
  const [user, setUser] = useState({
    userId: "",
    name: "",
    email: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      const result = await refreshToken(navigate);
      if (result.success) {
        setUser(result.user);
      }
    };

    loadProfile();
  }, [navigate]);

  const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <>
      <Navbar />

      <section className="hero has-background-grey-light is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="box" style={{ maxWidth: "600px", margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: "30px" }}>
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
                <p className="subtitle is-6">User account information</p>
              </div>

              <div className="content">
                <div className="field">
                  <label className="label">Full Name</label>
                  <div className="control">
                    <input
                      className="input"
                      value={user.name}
                      readOnly
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      className="input"
                      value={user.email}
                      readOnly
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">ID</label>
                  <div className="control">
                    <input
                      className="input"
                      value={user.userId}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default UserProfile;


// import React, { useEffect, useState, useCallback } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import Navbar from "../Layout/Navbar";
// import { refreshToken } from "../../Services/authService";
// import { fetchUsers, removeUser } from "../../Services/userService";

// const UserProfile = () => {
//   const [authUser, setAuthUser] = useState({
//     userId: "",
//     name: "",
//     email: "",
//   });
//   const [token, setToken] = useState("");
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();

//   const loadUsers = useCallback(
//   async (accessToken, loginUserId) => {
//     try {
//       const response = await fetchUsers(accessToken);

//       const filteredUsers = response.data.filter(
//         (user) => user.id === loginUserId
//       );

//       setUsers(filteredUsers);
//     } catch (error) {
//       navigate("/");
//     } finally {
//       setLoading(false);
//     }
//   },
//   [navigate]
// );

//  useEffect(() => {
//   const initializePage = async () => {
//     const result = await refreshToken(navigate);

//     if (result.success) {
//       setAuthUser(result.user);
//       setToken(result.token);

//       await loadUsers(result.token, result.user.userId);
//     }
//   };

//   initializePage();
// }, [navigate, loadUsers]);

//   const handleDelete = async (id) => {
//     try {
//       await removeUser(id, token);
//       await loadUsers(token);
//     } catch (error) {
//       console.error(error);
//     }
//   };
// return (
//     <>
//       <Navbar />

//       <div className="hero has-background-grey-light is-fullheight">
//         <div className="hero-body">
//           <div className="container">
//             <div className="box">
//               <h1 className="title is-4">
//                 Welcome Back: {authUser.name} - {authUser.email} - {authUser.userId}
//               </h1>

//               {loading ? (
//                 <p>Loading users...</p>
//               ) : (
//                 <table className="table is-striped is-fullwidth">
//                   <thead>
//                     <tr>
//                       <th>No</th>
//                       <th>Id</th>
//                       <th>Name</th>
//                       <th>Email</th>
//                       <th>Gender</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {users.map((user, index) => (
//                       <tr key={user.id}>
//                         <td>{index + 1}</td>
//                         <td>{user.id}</td>
//                         <td>{user.name}</td>
//                         <td>{user.email}</td>
//                         <td>{user.gender}</td>
//                         <td>
//                           <Link
//                             to={`edit/${user.id}`}
//                             className="button is-small is-info mr-2"
//                           >
//                             Edit
//                           </Link>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserProfile;