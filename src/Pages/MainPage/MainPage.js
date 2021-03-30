import React from "react";
import { Col, Row } from "react-bootstrap";
import AddTask from "../../components/AddTask/AddTask";
import MainHud from "../../components/CardComponents/MainHud";
import ResourcesTab from "../../components/CardComponents/ResourcesTab";
import FilterTask from "../../components/FilterTask/FilterTask";
import TaskTab from "../../components/TaskTab/TaskTab";
import { useSelector } from "react-redux";

const MainPage = () => {
  const { tasks } = useSelector((state) => state.tasks);

  console.log(tasks);

  return (
    <Row>
      <Col md={8}>
        {" "}
        <MainHud />
        <FilterTask />
        <Row>
          <Col md={8}>
            <TaskTab />
            <TaskTab />
            <TaskTab />
            <TaskTab />
            <TaskTab />
            {/* <AddTask /> */}
          </Col>
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
  );
};

export default MainPage;
