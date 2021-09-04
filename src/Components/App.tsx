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
