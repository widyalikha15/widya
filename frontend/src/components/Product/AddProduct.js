import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Login/Navbar";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    try {
      await axios.post("http://localhost:5000/products", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/product");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div><Navbar/>
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <form onSubmit={saveProduct}>
          <div className="field">
            <label className="label">Product Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Product Name"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Image</label>
            <div className="control">
              <div className="file">
                <label className="file-label">
                  <input
                    type="file"
                    className="file-input"
                    onChange={loadImage}
                  />
                  <span className="file-cta">
                    <span className="file-label">Choose a file...</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {preview ? (
            <figure className="image is-128x128">
              <img src={preview} alt="" />
            </figure>
          ) : (
            ""
          )}

          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success"> 
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddProduct;

// import React, { useState } from 'react'
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Navbar from '../Login/Navbar';
 
// const AddProduct = () => {
//     const [name, setName] = useState('');
//     const [image, setImage] = useState('');
//     const [url, setUrl] = useState('');
//     const [msg, setMsg] = useState('');
//     const history = useNavigate();
//     const AddProduct = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('http://localhost:5000/products', {
//                 name: name,
//                 image: image,
//                 url: url
//             });
//             history("/product");
//         } catch (error) {
//             if (error.response) {
//                 setMsg(error.response.data.msg);
//             }
//         }
//     }
    
 
//     return (
//         <div><Navbar/>
//         <section className="hero has-background-grey-light is-fullheight is-fullwidth">
//             <div className="hero-body">
//                 <div className="container">
//                     <div className="columns is-centered">
//                         <div className="column is-4-desktop">
//                             <form onSubmit={AddProduct} className="box" enctype="multipart/form-data">
//                                 <p className="has-text-centered">{msg}</p>
//                                 <div className="field mt-5">
//                                     <label className="label">Name</label>
//                                     <div className="controls">
//                                         <input type="text" className="input" placeholder="Name"
//                                             value={name} onChange={(e) => setName(e.target.value)} />
//                                     </div>
//                                 </div>
//                                  {/* <div className="field mt-5">
//                                     <label className="label">image</label>
//                                     <div className="controls">
//                                         <input type="text" className="input" placeholder="image" value={image} onChange={(e) => setImage(e.target.value)} />
//                                     </div>
//                                 </div> */}
//                                 <input type="file" name="avatar" className="input" placeholder="image" 
//                                 value={image} onChange={(e) => setImage(e.target.value)}/>
                                
//                                 <div className="field mt-5">
//                                     <label className="label">url</label>
//                                     <div className="controls">
//                                         <input type="text" className="input" placeholder="url" value={url} onChange={(e) => setUrl(e.target.value)} />
//                                     </div>
//                                 </div>
//                                 <div className="field mt-5">
//                                     <button className="button is-success is-fullwidth">Add Product</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//         </div>
//     )
// }
 
// export default AddProduct