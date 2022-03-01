import React, { useState, useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import AddTask from "../../components/AddTask/AddTask";
import MainHud from "../../components/CardComponents/MainHud";
import ResourcesTab from "../../components/CardComponents/ResourcesTab";
import FilterTask from "../../components/FilterTask/FilterTask";
import TaskTab from "../../components/TaskTab/TaskTab";
import { useSelector } from "react-redux";
import {
  deleteTask,
  getTasks,
  updateTask,
  updateTaskDetails,
} from "./MainPage.slice";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import TaskContainer from "../../components/TaskContainer";
import { ToggleButton } from "../Input/LoginPage";
import AddTaskModal from "../../components/AddTask/AddTaskModal";

const containers = [
  { label: "To Do", id: "0" },
  { label: "In Progress", id: "1" },
  { label: "Completed", id: "2" },
];

const priority = [
  { label: "urgent/important", id: "0" },
  { label: "urgent/not important", id: "1" },
  { label: "not Urgent/imporant", id: "2" },
  { label: "not Urgent/not imporant", id: "3" },
];

const MainPage = ({ history }) => {
  const [sortedTasks, setSortedTasks] = useState({ 0: [], 1: [], 2: [] ,3:[]});
  const [toggle, setToggle] = useState(0);
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState(false);

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
    const tempSortedTasks = { 0: [], 1: [], 2: [] ,3:[] };
    tasks.length &&
      tasks.forEach((task) => {
        const { status, priority } = task;
        console.log(status);
        tempSortedTasks?.[toggle === 0 ? `${status}` : `${priority}`]?.push(
          task
        );
      });
    setSortedTasks(tempSortedTasks);
    console.log("tempSorted task,", tempSortedTasks);
  }, [tasks, toggle]);

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, [userInfo]);

  const updateName = (task) => {
    if (task.name !== editText) {
      dispatch(updateTaskDetails({ ...task, name: editText }));
    }
    setEdit(false);
    setEditText(false);
  };
  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };
  const onDrop = ({ data: { task }, id }) => {
    // const task_id = data[`task`].split(",")[0]
    // const container_id = data[`task`].split(",")[1]
    // const targetContainer_id = id
    // console.log(data,task_id,targetContainer_id,container_id ,"data");

    const task2 = JSON.parse(task);
    console.log(task2, id);
    if (toggle === 0) {
      dispatch(updateTaskDetails({ ...task2, status: id }));
    } else {
      dispatch(updateTaskDetails({ ...task2, priority: id }));
    }
  };

  return (
    <Row className="p-2">
      <Col md={12} lg={8}>
        <MainHud />
        <ToggleButton
          onClick={() => setToggle(0)}
          first
          active={toggle === 0 || undefined}
        >
          Status
        </ToggleButton>
        <ToggleButton
          onClick={() => setToggle(1)}
          active={toggle === 1 || undefined}
        >
          Priority
        </ToggleButton>
        <MainBody className="d-flex flex-column">
          {toggle === 0 ? (
            <div className="d-flex flex-row">
              {containers.map(({ label, id }) => (
                <TaskContainer
                  onDrop={onDrop}
                  tasks={sortedTasks[id]}
                  title={label}
                  id={id}
                  deleteTask={handleDelete}
                  edit={edit}
                  setEdit={setEdit}
                  editText={editText}
                  setEditText={setEditText}
                  updateName={updateName}
                  addTab={() => setAddTab(true)}
                />
              ))}
            </div>
          ) : (
            <div className="d-flex flex-wrap flex-row justify-content-between">
              {" "}
              {priority.map(({ label, id }) => (
                <TaskContainer
                  width={"50%"}
                  onDrop={onDrop}
                  deleteTask={handleDelete}
                  tasks={sortedTasks[id]}
                  title={label}
                  edit={edit}
                  setEdit={setEdit}
                  updateName={updateName}
                  editText={editText}
                  setEditText={setEditText}
                  id={id}
                  addTab={() => setAddTab(true)}
                />
              ))}
            </div>
          )}
        </MainBody>
      </Col>
      <AddTaskModal
        close={() => setAddTab(false)}
        addTab={addTab}
        options={priority}
      />
      {/* <Col md={8}>
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
              <AddTask setAddTab={setAddTab} options={priority} />
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
      </Col> */}
      <Col md={4}>
        <ResourcesTab />
      </Col>
    </Row>
  );
};

export default MainPage;

const MainBody = styled.div``;
// const ToggleButton = styled.div``;
