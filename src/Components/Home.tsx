import React from "react";
import {Link} from "react-router-dom";

export default function Home() {
  const itemStyle = {minHeight: '50%'};

  return (
    <div className="d-md-flex flex-md-equal w-100 py-md-3 ps-md-3" style={{height: '100vh'}}>
      <div className="bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden" style={itemStyle}>
        <div className="my-3 py-3">
          <h2 className="display-5">Manager</h2>
          <p className="lead">Handle the process of organizing the users and the prize they have to put in.</p>
          <Link className="btn btn-outline-secondary" to="/admin-page">Go</Link>
        </div>
      </div>
      <div className="bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden text-white" style={itemStyle}>
        <div className="my-3 p-3">
          <h2 className="display-5">User</h2>
          <p className="lead">Use this to only set your personal and economical information.</p>
          <Link className="btn btn-outline-secondary" to="/user-page">Go</Link>
        </div>
      </div>
    </div>
  );
}
