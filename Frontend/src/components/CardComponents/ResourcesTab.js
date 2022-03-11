import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiMoreHorizontal } from "react-icons/fi";
import { HiOutlinePencil } from "react-icons/hi";
import { BsTrash } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import { Col, Row } from "react-bootstrap";
import { Draggable, Droppable } from "react-drag-and-drop";
import { deleteGoals } from "../../Pages/MainPage/MainPage.slice";

function GoalTab({
  title,
  id,
  onDrop,
  goals,
  width,
  addTab,
  edit,
  setEdit,
  editText,
  setEditText,
  updateName,
  deleteGoals,
  addGoals,
  setIsGoalsEdit,
  currentGoal,
  setCurrentGoal,
}) {
  // const onDrop = (data) => {
  //   console.log(data,title);
  // };
  const [ref, setRef] = useState(null);
  useEffect(() => {
    ref?.focus();
  }, [editText]);

  const editInput = (task) => {
    return (
      <textarea
        ref={(e) => (editText = e)}
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateName(task);
          }
        }}
      />
    );
  };

  return (
    <Droppable
      style={{ width: width && width }}
      types={["task"]}
      onDrop={(data) => onDrop({ data, id })}
    >
      <Container width={width}>
        <Header className="d-flex justify-content-between">
          <Title>{title}</Title>
          <a>
            <FiMoreHorizontal />
          </a>
        </Header>
        <Body>
          <Draggable>
            <TaskCard
              active={currentGoal === "all" || undefined}
              onClick={() => setCurrentGoal("all")}
            >
              <Row>
                <Col md={10}>All Goals</Col>
                <Col md={2}></Col>
              </Row>
            </TaskCard>
          </Draggable>
          {goals?.length > 0 &&
            goals?.map((task) => (
              <Draggable type="task" data={JSON.stringify({ ...task })}>
                <TaskCard
                  active={currentGoal === task._id || undefined}
                  onClick={() => setCurrentGoal(task._id)}
                >
                  <Row>
                    <Col md={10}>
                      {edit === task._id ? editInput(task) : task.name}
                    </Col>
                    <Col md={2}>
                      {edit === task._id ? (
                        <div>
                          <a
                            onClick={() => {
                              updateName(task);
                            }}
                            className={
                              "task-card_edit d-flex justify-content-end"
                            }
                            style={{ fontSize: "20px" }}
                          >
                            <BiCheck />
                          </a>
                          <a
                            onClick={() => {
                              //   deleteTask(task._id);
                              deleteGoals(task._id);
                            }}
                            className={
                              "task-card_edit d-flex justify-content-end"
                            }
                            style={{ fontSize: "17px", marginTop: "10px" }}
                          >
                            <BsTrash />
                          </a>
                        </div>
                      ) : (
                        <a
                          onClick={() => {
                            setEdit(task._id);
                            setEditText(task.name);
                            // textEdit?.focus();
                            setIsGoalsEdit(true);
                          }}
                          className={
                            "task-card_edit d-flex justify-content-end"
                          }
                        >
                          <HiOutlinePencil />
                        </a>
                      )}
                    </Col>
                  </Row>
                </TaskCard>
              </Draggable>
            ))}
               <Draggable>
            <TaskCard
              active={currentGoal === "Unassigned" || undefined}
              onClick={() => setCurrentGoal("Unassigned")}
            >
              <Row>
                <Col md={10}>Unassigned</Col>
                <Col md={2}></Col>
              </Row>
            </TaskCard>
          </Draggable>
          <AddTask onClick={addGoals}>
            <a>
              <AiOutlinePlus />
            </a>{" "}
            <span>Add Goals</span>
          </AddTask>
        </Body>
      </Container>
    </Droppable>
  );
}

export default GoalTab;

const Title = styled.div``;
const AddTask = styled.div`
  color: #5e6c84;
  padding: 2px 10px;
  border-radius: 3px;
  cursor: pointer;
  & svg {
    position: relative;
    top: -1px;
    font-size: 19px;
  }
  &:hover {
    background-color: #f5f8ff;
  }
`;
const Header = styled.div`
  padding: 0px 7px 7px;
`;
const Body = styled.div``;
const TaskCard = styled.div`
  background: white;
  padding: 6px 8px 2px;

  background-color: ${({ active }) => (active ? "#dce6ff" : "#fff")};
  border-radius: 3px;
  box-shadow: 0 1px 0 #091e4240;
  cursor: pointer;
  display: block;
  margin-bottom: 8px;
  //max-width: 300px;
  min-height: 20px;

  & .task-card_edit {
    display: none;
    font-size: 14px;
    color: #212529;
  }

  &:hover {
    & .task-card_edit {
      display: block;
    }
    background-color: #f5f8ff;
  }
`;

const Container = styled.div`
  //  background-color: #ebecf0;
  border: 1px solid gray;
  border-radius: 3px;
  color: #172b4d;
  padding: 10px;
  // margin: 10px;
  width: 100%;
`;
