import React from "react";
import styled from "styled-components";
import { FiMoreHorizontal } from "react-icons/fi";
import { HiOutlinePencil } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import { Col, Row } from "react-bootstrap";
import { Draggable, Droppable } from "react-drag-and-drop";
function TaskContainer({ title, id, onDrop, tasks, width,addTab }) {
  // const onDrop = (data) => {
  //   console.log(data,title);
  // };
  console.log(tasks, title);
  return (
    <Droppable
      style={{ width: width && width}}
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
                  <Row>
                    <Col md={10}>{task.name}</Col>
                    <Col md={2}>
                      <a className={"task-card_edit"}>
                        <HiOutlinePencil />
                      </a>
                    </Col>
                  </Row>
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
