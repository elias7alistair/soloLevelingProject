import "./App.scss";
import "./components/CardComponents/Card.scss";
import ParticlesJs from "./components/particlesJs/ParticlesJs";

import { BrowserRouter as Router, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage/MainPage";

function App() {
  return (
    <Router>
      <div className='app'>
        <ParticlesJs />
        <h1>Solo Leveling</h1>
        <Route path='/' component={MainPage} exact />
      </div>
    </Router>
  );
}

export default App;
