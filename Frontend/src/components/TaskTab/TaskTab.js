import React from "react";
import { useDispatch } from "react-redux";
import editIcon from "../../Assets/images/pencil.svg";
import deleteIcon from "../../Assets/images/delete.svg";
import taskDone from "../../Assets/images/done.svg";
import styled from "styled-components";
import {
  deleteTask,
  removeTask,
  updateQuestStatus,
  updateTasks,
} from "../../Pages/MainPage/MainPage.slice";

const TaskTab = ({
  id,
  taskName,
  priority,
  difficulty,
  completeBy,
  isCompleted,
}) => {
  const dispatch = useDispatch();

  return (
    <TaskCard className="task">
      <MainColumn>
        {" "}
        <Title>{taskName}</Title>
        <div>
          <Image className="tasktab__image" src={editIcon} />
          <Image
            className="tasktab__image"
            src={deleteIcon}
            onClick={() => dispatch(deleteTask({ id: id }))}
          />
          <Image
            checkStatus={isCompleted || undefined}
            className="tasktab__image"
            src={taskDone}
            onClick={() => dispatch(updateQuestStatus({ id: id }))}
          />
        </div>
      </MainColumn>
      <SubColumn>
        <Description>
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder before final cop
        </Description>
        <Date>
          <strong>Priority: </strong>
          {priority}
        </Date>{" "}
        <Date>
          <strong>Difficulty: </strong>
          {difficulty}
        </Date>
        <Date>{completeBy}</Date>
      </SubColumn>
    </TaskCard>
  );
};

export default TaskTab;

const TaskCard = styled.div`
  position: relative;
  &:after {
    content: "";
    background-color: #212120;
    opacity: 0.8;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
  }
  padding: 10px 25px;
  margin: 15px 0px;
  color: white;
  height: 100px;
  border-radius: 5px;
`;
const MainColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2``;

const Image = styled.img`
  filter: ${(props) => props.checkStatus && "grayscale(100%)"};
  height: 20px;
  margin: 0 12px;
  &:hover {
    transform: scale(1.15);
    transition: opacity 0.5s, transform 0.2s;
  }
`;

const SubColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Description = styled.p`
  width: 30%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Date = styled.p`
  color: hsla(0, 0%, 80.4%, 0.4235294117647059);
  font-size: 13px;
  & strong {
    color: hsla(0, 0%, 190.4%, 0.4235294117647059);
  }
`;
