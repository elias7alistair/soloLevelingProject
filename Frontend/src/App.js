import "./App.scss";
import "./components/CardComponents/Card.scss";

import { BrowserRouter as Router, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage/MainPage";
import Home from "./Pages/Input/Home";
import Navbar from "./components/Navbar/Navbar";
import Axios from "axios";

//Axios.defaults.baseURL = "https://sololeveling.herokuapp.com/";

Axios.defaults.baseURL = "http://127.0.0.1:5000/";

function App() {
  return (
    <Router>
      <div className="app">
        {/* <ParticlesJs /> */}
        <Navbar />
        <Route path="/" component={Home} exact />
        <Route path="/main" component={MainPage} exact />
      </div>
    </Router>
  );
}

export default App;
