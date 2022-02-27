import React, { useState, useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import AddTask from "../../components/AddTask/AddTask";
import MainHud from "../../components/CardComponents/MainHud";
import ResourcesTab from "../../components/CardComponents/ResourcesTab";
import FilterTask from "../../components/FilterTask/FilterTask";
import TaskTab from "../../components/TaskTab/TaskTab";
import { useSelector } from "react-redux";
import { getTasks, updateTask, updateTaskDetails } from "./MainPage.slice";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import TaskContainer from "../../components/TaskContainer";

const containers = [
  { label: "To Do", id: "0" },
  { label: "In Progress", id: "1" },
  { label: "Completed", id: "2" },
];

const MainPage = ({ history }) => {
  const [sortedTasks, setSortedTasks] = useState({ '0': [], '1': [], '2': [] });

  const dispatch = useDispatch();

  const {
    tasks,
    taskLoading: loading,
    errors,
  } = useSelector((state) => state.tasks);
  const { userInfo } = useSelector((state) => state.input);
  const [addTab, setAddTab] = useState(false);
  console.log(tasks, "geeg");
  useEffect(() => {
    dispatch(getTasks());
  }, []);
  useEffect(() => {
    const tempSortedTasks = { "0": [], '1': [], '2': [] };
    tasks.length &&
      tasks.forEach((task) => {
        const { status } = task;
        console.log(status)
        tempSortedTasks?.[`${status}`]?.push(task);
      });
    setSortedTasks(tempSortedTasks);
    console.log("tempSorted task,", tempSortedTasks);
  }, [tasks]);

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, [userInfo]);

  const onDrop = ({ data:{task}, id }) => {
    // const task_id = data[`task`].split(",")[0]
    // const container_id = data[`task`].split(",")[1]
    // const targetContainer_id = id
    // console.log(data,task_id,targetContainer_id,container_id ,"data");

     const task2 = JSON.parse(task);
    console.log(task2,id)
    dispatch(updateTaskDetails({...task2,status:id}))
  };

  return (
    <Row className="p-2">
      <Col md={12} lg={8}>
        <MainHud />
        <MainBody className="d-flex">
          {containers.map(({ label, id }) => (
            <TaskContainer
              onDrop={onDrop}
              tasks={sortedTasks[id]}
              title={label}
              id={id}
            />
          ))}
        </MainBody>
      </Col>
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
              tasks?.map(
                ({
                  _id,
                  name,
                  priority,
                  difficulty,
                  completeBy,
                  isCompleted,
                }) => {
                  return (
                    <TaskTab
                      isCompleted={isCompleted}
                      key={_id}
                      id={_id}
                      taskName={name}
                      priority={priority}
                      difficulty={difficulty}
                      completeBy={completeBy}
                    />
                  );
                }
              )
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

const MainBody = styled.div``;
