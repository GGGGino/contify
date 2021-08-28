import React from "react";
import QRCode from "react-qr-code";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import reportWebVitals from "../reportWebVitals";
import Home from "./Home";
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminPage from "./AdminPage";
import UserPage from "./UserPage";

const myInfo: any = {
  name: 'Gino',
  maxImporto: 0
};

export default function App() {
  reportWebVitals(console.log);

  return (
    <Router>
      <>
        <main>
          <Switch>
            <Route path="/generate-code">
              <GenerateCode />
            </Route>
            <Route path="/capture">
              <Capture />
            </Route>
            <Route path="/user-page">
              <UserPage />
            </Route>
            <Route path="/admin-page">
              <AdminPage />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>

        <footer className="container py-5">
          <div className="row">
            <div className="col-12 col-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
                   strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="d-block mb-2" role="img"
                   viewBox="0 0 24 24"><title>Product</title>
                <circle cx="12" cy="12" r="10"></circle>
                <path
                  d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"></path>
              </svg>
              <small className="d-block mb-3 text-muted">© 2017–2021</small>
            </div>
          </div>
        </footer>
      </>
    </Router>
  );
}

function GenerateCode() {
  const myInfoBase64 = btoa(JSON.stringify(myInfo));
  return <QRCode value={myInfoBase64} />;
}

function Capture() {
  return <input type="file" name="image" accept="image/*" capture="environment" />;
}
