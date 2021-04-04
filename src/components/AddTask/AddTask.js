import React from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";

const AddTask = () => {
  return (
    <AddCard>
      <Row>
        <h2>Add New Quest</h2>
        <TextInput placeholder='Enter Quest'></TextInput>

        <TextInput placeholder='Complete By'></TextInput>

        <DropDown>
          <option>Select Difficulty</option>
          <option>easy</option>
          <option>intermediate</option>
          <option>Hard</option>
        </DropDown>
        <DropDown>
          <option>Select Priority</option>
          <option>Optional</option>
          <option>Do last</option>
          <option>Do after priority tasks</option>
          <option>Do First</option>
        </DropDown>
        <Button>add task</Button>
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
  border: none;
  outline: none;
  border-radius: 5px;
  padding: 0 20px;
  width: 40%;
  margin: 10px;
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
  border: none;
  outline: none;
  border-radius: 5px;
  padding: 0 20px;
  width: 40%;
  margin: 10px;
`;
