import { Col, Row } from "react-bootstrap";
import "./App.scss";
import "./components/CardComponents/Card.scss";
import MainHud from "./components/CardComponents/MainHud";
import ResourcesTab from "./components/CardComponents/ResourcesTab";
import ParticlesJs from "./components/particlesJs/ParticlesJs";

function App() {
  return (
    <div className='app'>
      <ParticlesJs />
      <h1>Solo Leveling</h1>
      <Row>
        <Col md={8}>
          {" "}
          <MainHud />
          {/* quest and task tab  */}
          {/* quest and task tab  */}
          {/* quest and task tab  */}
          <Row>
            <Col md={8}> {/* quotes and reward tab  */}</Col>
            <Col md={4}>
              {" "}
              <MainHud />
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <ResourcesTab />
        </Col>
      </Row>
    </div>
  );
}

export default App;
