import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function Home() {
  const words: string[] = ['dinner', 'lunch', 'stuff'];

  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('timer');
      setIndex((index + 1) % words.length);
    }, 2000);
    return () => clearTimeout(timer);
  }, [index, words.length]);

  return (
    <>
      <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
          <div className="my-3 py-3">
              <h2 className="display-5">Contify</h2>
              <p className="lead">Share with others the cost of your {words[index]}</p>
          </div>
      </div>
      <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
        <div className="w-50 bg-light me-md-3 py-2 px-3 py-md-3 px-md-5 text-center overflow-hidden position-relative">
          <div className="my-3 py-3">
            <h2 className="display-5">Checker</h2>
            <p className="lead">Handle the process of organizing the users and the prize they have to put in.</p>
            <Link className="btn btn-outline-secondary stretched-link" to="/admin-page">Go</Link>
          </div>
        </div>
        <div className="w-50 bg-dark me-md-3 py-2 px-3 py-md-3 px-md-5 text-center overflow-hidden text-white position-relative">
          <div className="my-3 p-3">
            <h2 className="display-5">User</h2>
            <p className="lead">Use this to only set your personal and economical information.</p>
            <Link className="btn btn-outline-secondary stretched-link" to="/user-page">Go</Link>
          </div>
        </div>
      </div>
    </>
  );
}
