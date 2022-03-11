import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiMoreHorizontal } from "react-icons/fi";
import { HiOutlinePencil } from "react-icons/hi";
import { BsTrash } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiCheck, BiEdit } from "react-icons/bi";
import { Accordion, Card, Col, Row, useAccordionButton } from "react-bootstrap";
import { Draggable, Droppable } from "react-drag-and-drop";

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log("totally custom!", eventKey)
  );

  return (
    <div
      type="button"
      onClick={decoratedOnClick}
    >
      {children}
    </div>
  );
}

function TaskContainer({
  title,
  id,
  onDrop,
  tasks,
  width,
  addTab,
  edit,
  setEdit,
  editText,
  setEditText,
  updateName,
  deleteTask,
  setUpdateData,
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
          {tasks?.length > 0 &&
            tasks?.map((task) => (
              <Draggable type="task" data={JSON.stringify({ ...task })}>
                <TaskCard>
                  <Accordion >
                    <Row>
                      <Col md={10}>
                        <CustomToggle eventKey={task._id}>
                          {edit === task._id ? editInput(task) : task.name}
                        </CustomToggle>
                      </Col>
                      <Col md={2}>
                        {edit === task._id ? (
                          <div>
                            <div className="d-flex justify-content-end">
                              <a
                                onClick={() => {
                                  //updateName(task);
                                  setUpdateData(task);
                                }}
                                className={
                                  "task-card_edit d-flex justify-content-end"
                                }
                                style={{
                                  fontSize: "20px",
                                  marginRight: "10px",
                                }}
                              >
                                <BiEdit />
                              </a>
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
                            </div>

                            <a
                              onClick={() => {
                                deleteTask(task._id);
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
                    <Row >
                      <Accordion.Collapse eventKey={task._id}>
                        <Card.Body style={{ 
                              borderTop: "1px solid #443b3b38",
                              fontSize: "14px",
                              padding: "10px 2px",
                              marginTop: "8px"
                         }}>{task.description ?task.description : "No Description"}</Card.Body>
                      </Accordion.Collapse>
                    </Row>
                  </Accordion>
                </TaskCard>
              </Draggable>
            ))}
          {/* <Draggable type="task" data={`${title}_1`}>
            <TaskCard>
              <Row>
                <Col md={10}>lorea ae rae aer esfasjfsdoaf sdf</Col>
                <Col md={2}>
                  <a className={"task-card_edit"}>
                    <HiOutlinePencil />
                  </a>
                </Col>
              </Row>
            </TaskCard>
            </Draggable>
            <Draggable type="task" data={`${title}_2`}>
            <TaskCard>
              <Row>
              <Col md={10}>lorea ae rae aer esfasjfsdoaf sdf</Col>
              <Col md={2}>
              <a className={"task-card_edit"}>
              <HiOutlinePencil />
              </a>
              </Col>
              </Row>
            </TaskCard>
          </Draggable>{" "}
          <Draggable type="task" data={`${title}_3`}>
            <AddTask>
            <a>
                <AiOutlinePlus />
                </a>{" "}
                <span>Add Quest</span>
            </AddTask>
          </Draggable> */}
          <AddTask onClick={addTab}>
            <a>
              <AiOutlinePlus />
            </a>{" "}
            <span>Add Quest</span>
          </AddTask>
        </Body>
      </Container>
    </Droppable>
  );
}

export default TaskContainer;

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

  background-color: #fff;
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
  background-color: #ebecf0;
  border-radius: 3px;
  color: #172b4d;
  padding: 10px;
  margin: 10px;
  width: ${({ width }) => (width ? "97%" : "280px")};
`;
