import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const View = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/get/${id}`)
      .then((resp) => setUser({ ...resp.data[0] }));
  }, [id]);
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center my-5">
      <div className="card w-25">
        <h1 className="card-title text-center">USER</h1>
        <br />
        <div className="ps-5">
          <strong className="me-3">ID:</strong>
          <span className="card-text">{id}</span>
          <br />

          <strong className="me-3">NAME:</strong>
          <span className="card-text">{user.name}</span>
          <br />

          <strong className="me-3">EMAIL:</strong>
          <span>{user.email}</span>
          <br />

          <strong className="me-3">CONTACT:</strong>
          <span>{user.contact}</span>
          <br />
        </div>
        <Link to="/" className="text-center m-2">
          <button className="btn btn-primary">GO BACK</button>
        </Link>
      </div>
    </div>
  );
};

export default View;
