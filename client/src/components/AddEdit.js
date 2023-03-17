import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { name, email, contact } = state;

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/get/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const navigate = useNavigate();
  const handlSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("provide all the vlues");
    } else {
      if (!id) {
        axios
          .post("http://localhost:3001/api/post", {
            name,
            email,
            contact,
          })
          .then(() => {
            setState({ name: "", email: "", contact: "" });
          })
          .catch((err) => console.log(err.response.data));
        toast.success("CONTACT ADDED");
      } else {
        axios
          .put(`http://localhost:3001/api/update/${id}`, {
            name,
            email,
            contact,
          })
          .then(() => {
            setState({ name: "", email: "", contact: "" });
          })
          .catch((err) => console.log(err.response.data));
        toast.success("CONTACT UPDATED");
      }

      setTimeout(() => navigate("/"), 500);
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center m-5 w-100">
      <form onSubmit={handlSubmit}>
        <label htmlfor="name" className="form-label">
          Name:
        </label>
        <input
          class="form-control w-100"
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={name || ""}
          onChange={handleInput}
        />
        <br />
        <label htmlfor="email" className="form-label">
          Email:
        </label>
        <input
          class="form-control"
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          value={email || ""}
          onChange={handleInput}
        />
        <br />
        <label htmlfor="contact" className="form-label">
          Contact:
        </label>
        <input
          class="form-control"
          type="number"
          name="contact"
          id="contact"
          placeholder="Contact"
          value={contact || ""}
          onChange={handleInput}
        />
        <br />
        <input
          type="Submit"
          className="btn btn-primary me-2"
          value={id ? "UPDATE" : "SAVE"}
        />
        <Link to="/">
          <input
            type="button"
            className="btn btn-primary ms-3"
            value="GO BACK"
          />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
