import React, { useState, useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import AddTask from "../../components/AddTask/AddTask";
import MainHud from "../../components/CardComponents/MainHud";
import ResourcesTab from "../../components/CardComponents/ResourcesTab";
import FilterTask from "../../components/FilterTask/FilterTask";
import TaskTab from "../../components/TaskTab/TaskTab";
import { useSelector } from "react-redux";
import { getTasks } from "./MainPage.slice";
import { useDispatch } from "react-redux";

const MainPage = ({ history }) => {
  const dispatch = useDispatch();

  const {
    tasks,
    taskLoading: loading,
    errors,
  } = useSelector((state) => state.tasks);
  const { userInfo } = useSelector((state) => state.input);
  const [addTab, setAddTab] = useState(false);

  useEffect(() => {
    dispatch(getTasks());
  }, [tasks]);

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, [userInfo]);

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
              <AddTask setAddTab={setAddTab} />
            ) : loading ? (
              <h2>loading....</h2>
            ) : tasks.length < 1 ? (
              <h2>Please Add tasks</h2>
            ) : (
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
