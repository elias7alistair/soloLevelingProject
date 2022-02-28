import React, { useState } from "react";
import { Modal,Button } from 'react-bootstrap';
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addTask } from "../../Pages/MainPage/MainPage.slice";

function AddTaskModal({close,addTab,options}) {
    const dispatch = useDispatch();
    const [quest, setQuest] = useState();
    const [date, setDate] = useState();
    const [difficulty, setDifficulty] = useState();
    const [priority, setPriority] = useState();
    const [errors, setErrors] = useState(false); 
    const handleClose = () => {close()};
    
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
            status:"0"
        })
      );

      handleClose(false);
    }
  };

  return (
    <Modal show={addTab} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body> <TextInput
          placeholder='Enter Quest'
          onChange={(e) => setQuest(e.target.value)}
        ></TextInput>

        <TextInput
          placeholder='Complete By'
          onChange={(e) => setDate(e.target.value)}
        ></TextInput>

        <DropDown onChange={(e) => setDifficulty(e.target.value)}>
          <option>Select Difficulty</option>
          <option>easy</option>
          <option>intermediate</option>
          <option>Hard</option>
        </DropDown>
        <DropDown onChange={(e) => setPriority(e.target.value)}>
         {options?.map(({label,id})=><option value={id}>{label}</option>)}
          {/* <option>Select Priority</option>
          <option>Optional</option>
          <option>Do last</option>
          <option>Do after priority tasks</option>
          <option>Do First</option> */}
        </DropDown>
        {errors && <ErrorMessage>{errors}</ErrorMessage>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default AddTaskModal


const TextInput = styled.input`
  height: 50px;
  border: none;
  outline: none;
  border-radius: 5px;
  padding: 0 20px;
  width: 40%;
  margin: 10px;
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

const ErrorMessage = styled.p`
  color: red;
`;
