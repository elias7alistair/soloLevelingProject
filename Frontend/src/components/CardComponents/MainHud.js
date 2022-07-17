import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import styled from 'styled-components/macro'
const MainHud = ({tasks}) => {
  const [levels,setLevel] = useState({
    level:'0',
    exp: '0'
  });
  const { userInfo: {name} } = useSelector((state) => state.input);
  
  useEffect(()=>{

    let level = (tasks.length *25 / 100).toString().split('.')[0];
    let exp = (tasks.length *25  / 100).toFixed(2).toString().split('.')[1];
    setLevel({
      level,
      exp
    })
  },[tasks])

  return (
    <Card className="hud" css={`
    @media(max-width:767px){
      display:none;
    }`}>
      <div className="hud__body">
        <Row>
          <Col className="hud__username" md={3}>
         {name}
          </Col>
          <Col className="hud__levelTab" md={9}>
            Lvl <span className="hud__level">{levels.level}</span>
          </Col>
        </Row>
        <Row>
          <Col md={3}> Current exp</Col>
          <Col md={9}>
            <div className="hud__progressBar">
              <div className="hud__progress" style={{width: levels.exp+"%"}}>
                <span className="hud__progressText">{levels.exp}/100</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default MainHud;
