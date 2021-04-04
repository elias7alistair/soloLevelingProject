import React, { useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import AddTask from "../../components/AddTask/AddTask";
import MainHud from "../../components/CardComponents/MainHud";
import ResourcesTab from "../../components/CardComponents/ResourcesTab";
import FilterTask from "../../components/FilterTask/FilterTask";
import TaskTab from "../../components/TaskTab/TaskTab";
import { useSelector } from "react-redux";

const MainPage = () => {
  const { tasks } = useSelector((state) => state.tasks);
  const [addTab, setAddTab] = useState(false);

  console.log(tasks);

  return (
    <Row>
      <Col md={8}>
        {" "}
        <MainHud />
        <Col
          md={8}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <FilterTask />
          <Button
            variant={addTab ? "danger" : "success"}
            onClick={() => {
              setAddTab(!addTab);
            }}
            style={{ width: "25%" }}
          >
            {!addTab ? "Add Quest" : "Cancel"}
          </Button>
        </Col>
        <Row>
          <Col md={8}>
            {addTab ? (
              <AddTask />
            ) : (
              tasks &&
              tasks.map(({ id, taskName, priority, difficulty }) => {
                return (
                  <TaskTab
                    key={id}
                    id={id}
                    taskName={taskName}
                    priority={priority}
                    difficulty={difficulty}
                  />
                );
              })
            )}
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
