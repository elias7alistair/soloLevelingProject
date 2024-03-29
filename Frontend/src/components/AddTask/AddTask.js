import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addTask } from "../../Pages/MainPage/MainPage.slice";

const AddTask = ({ setAddTab, options }) => {
  const dispatch = useDispatch();

  const [quest, setQuest] = useState();
  const [date, setDate] = useState();
  const [difficulty, setDifficulty] = useState();
  const [priority, setPriority] = useState("0");
  const [errors, setErrors] = useState(false);

  const handleErrors = () => {
    if (!quest) {
      setErrors("Please Enter Quest");
    } else if (!date) {
      setErrors("Please Enter Date");
    } else if (!difficulty || difficulty === "Select Difficulty") {
      setErrors("Please Select Difficulty");
    } else if (!priority || priority === "Select Priority") {
      setErrors("Please Select Priority");
    } else {
      setErrors(false);
    }
  };

  const handleSubmit = () => {
    handleErrors();
    if (quest && date && difficulty && priority && !errors) {
      console.log(quest, date, difficulty, priority);
      dispatch(
        addTask({
          name: quest,
          priority: priority,
          difficulty: difficulty,
          completeBy: date,
          // status: "active",
          // description: description,
          status: "0",
        })
      );

      setAddTab(false);
    }
  };

  return (
    <AddCard>
      <Row>
        <h2>Add New Quest</h2>
        <InputContainer>
          <TextInput
            placeholder="Enter Quest"
            onChange={(e) => setQuest(e.target.value)}
          ></TextInput>
        </InputContainer>
        <InputContainer>
          <TextInput
            placeholder="Complete By"
            onChange={(e) => setDate(e.target.value)}
          ></TextInput>
        </InputContainer>
        <InputContainer>
          <DropDown onChange={(e) => setDifficulty(e.target.value)}>
            <option>Select Difficulty</option>
            <option>easy</option>
            <option>intermediate</option>
            <option>Hard</option>
          </DropDown>
        </InputContainer>
        <InputContainer>
          <DropDown onChange={(e) => setPriority(e.target.value)}>
            {options?.map(({ label, id }) => (
              <option value={id}>{label}</option>
            ))}
            {/* <option>Select Priority</option>
          <option>Optional</option>
          <option>Do last</option>
          <option>Do after priority tasks</option>
        <option>Do First</option> */}
          </DropDown>
        </InputContainer>
        {errors && <ErrorMessage>{errors}</ErrorMessage>}
        <Button onClick={handleSubmit}>add task</Button>
      </Row>
    </AddCard>
  );
};

export default AddTask;

const AddCard = styled.div`
  background-color: #212120;

  padding: 10px 25px;
  margin: 15px 0px;
  color: white;

  border-radius: 5px;

  & .row {
    align-items: center;
    flex-direction: column;
  }
`;

const TextInput = styled.input`
  height: 50px;
  // border: none;
  outline: none;
  border-radius: 5px;
  padding: 0 20px;
  width: 40%;
  margin: 10px;
`;

const InputContainer = styled.div`
  border: 1px solid black;
`;

const Button = styled.button`
  &:focus {
    border: none;
    outline: none;
  }

  background-color: #60605e;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
`;

const DropDown = styled.select`
  height: 50px;
  // border: none;
  outline: none;
  border-radius: 5px;
  padding: 0 20px;
  width: 40%;
  margin: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
`;
