import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./Home";
import AdminPage from "./AdminPage";
import UserPage from "./UserPage";

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function App() {
  return (
    <Router basename={'/' + process.env.REACT_APP_BASE_FOLDER}>
      <main>
        <Switch>
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
    </Router>
  );
}
