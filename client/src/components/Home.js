import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:3001/api/get");
    setData(response.data);
  };
  useEffect(() => {
    loadData();
  }, []);

  const deleteContact = (id) => {
    if (window.confirm("Ok to delet contact!!!")) {
      axios.delete(`http://localhost:3001/api/remove/${id}`);
      toast.success("DELETED SUCCESSFULLY");
      setTimeout(() => loadData(), 500);
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center ">
      <Link to="/addContact">
        <button className="btn btn-primary m-5">ADD CONTACT</button>
      </Link>
      <table className="table table-hover table-bordered m-5">
        <thead>
          <tr>
            <th className="text-center">No</th>
            <th className="text-center">Name</th>
            <th className="text-center">Email</th>
            <th className="text-center">Contact</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th className="text-center">{index + 1}</th>
                <td className="text-center">{item.name}</td>
                <td className="text-center">{item.email}</td>
                <td className="text-center">{item.contact}</td>
                <td className="text-center">
                  <Link to={`/update/${item.id}`}>
                    <button className="btn btn-primary">EDIT</button>
                  </Link>
                  <button
                    className="btn btn-danger ms-3"
                    onClick={() => deleteContact(item.id)}
                  >
                    DELETE
                  </button>
                  <Link to={`/view/${item.id}`}>
                    <button className="btn btn-info ms-3">VIEW</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
