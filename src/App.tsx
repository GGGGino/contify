import React from "react";
import QRCode from "react-qr-code";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const myInfo: any = {
  name: 'Gino',
  maxImporto: 0
};

export default function App() {
  reportWebVitals(console.log);
  const commonStyle: any = {
    width: '80%',
    height: '300px',
    borderRadius: '21px 21px 0 0',
  };

  return (
    <Router>
      <>
        <main>
          <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
            <div className="bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
              <div className="my-3 py-3">
                <h2 className="display-5">Another headline</h2>
                <p className="lead">And an even wittier subheading.</p>
                <Link className="btn btn-outline-secondary" to="/">Home</Link>
              </div>
            </div>
            <div className="bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
              <div className="my-3 p-3">
                <h2 className="display-5">Another headline</h2>
                <p className="lead">And an even wittier subheading.</p>
                <Link to="/generate-code">Generate code</Link>
              </div>
            </div>
            <div className="bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
              <div className="my-3 p-3">
                <h2 className="display-5">Another headline</h2>
                <p className="lead">And an even wittier subheading.</p>
                <Link to="/capture">Capture</Link>
              </div>
            </div>
          </div>

          <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
            <Switch>
              <Route path="/generate-code">
                <GenerateCode />
              </Route>
              <Route path="/capture">
                <Capture />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </main>

        <footer className="container py-5">
          <div className="row">
            <div className="col-12 col-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
                   stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="d-block mb-2" role="img"
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

function Home() {
  const handleInputChange = (event: any) => {
    const target = event.target;
    const name = target.name;

    myInfo[name] = target.value;
  };

  return <form>
    <label>
      Nome:
      <input
        name="name"
        type="text"
        onChange={handleInputChange} />
    </label>
    <label>
      Massimo che metto:
      <input
        name="maxImporto"
        type="number"
        onChange={handleInputChange} />
    </label>
  </form>;
}

function GenerateCode() {
  const myInfoBase64 = btoa(JSON.stringify(myInfo));
  return <QRCode value={myInfoBase64} />;
}

function Capture() {
  return <input type="file" name="image" accept="image/*" capture="environment" />;
}
