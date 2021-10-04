import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
const MainHud = () => {
  const { userInfo: {name} } = useSelector((state) => state.input);

  return (
    <Card className="hud">
      <div className="hud__body">
        <Row>
          <Col className="hud__username" md={3}>
         {name}
          </Col>
          <Col className="hud__levelTab" md={8}>
            Lvl <span className="hud__level">25</span>
          </Col>
        </Row>
        <Row>
          <Col md={4}> Current exp</Col>
          <Col md={8}>
            <div className="hud__progressBar">
              <div className="hud__progress">
                <span className="hud__progressText">25/100</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default MainHud;
