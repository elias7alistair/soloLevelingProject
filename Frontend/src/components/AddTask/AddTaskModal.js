import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import {
  addTask,
  updateTaskDetails,
} from "../../Pages/MainPage/MainPage.slice";

function AddTaskModal({ close, addTab, options, goals, data ,setUpdateData,setEdit,statusOptions}) {
  const dispatch = useDispatch();
  const [quest, setQuest] = useState();
  const [date, setDate] = useState();
  const [difficulty, setDifficulty] = useState();
  const [priority, setPriority] = useState();
  const [associatedWith, setAssociatedWith] = useState();
  const [status, setStatus] = useState("0");
  const [description, setDescription] = useState();
  const [errors, setErrors] = useState(false);
  
  const handleClose = () => {
    close();
  };
  console.log(quest,date,difficulty,priority,associatedWith,'check data3')
  useEffect(() => {
    if(data){
      console.log(data,'check data')
      data.name && setQuest(data.name);
      data.completeBy && setDate(data.completeBy);
      data.difficulty && setDifficulty(data.difficulty);
      data.priority && setPriority(data.priority);
      data.associatedWith && setAssociatedWith(data.associatedWith);
      data.description && setDescription(data.description);
      data.status && setStatus(data.status);
    } else {
    setQuest();
     setDate();
   setDifficulty();
      setPriority();
     setAssociatedWith();
     setDescription()
     setStatus("0")
    }
  }, [data]);

  const handleErrors = () => {
    if (!quest) {
      setErrors("Please Enter Quest");
    }  else if (!difficulty || difficulty === "Select Difficulty") {
      setErrors("Please Select Difficulty");
    } else if (!priority || priority === "Select Priority") {
      setErrors("Please Select Priority");
    } else {
      setErrors(false);
    }
  };

  const handleSubmit = () => {
    handleErrors();
    if (quest && difficulty && priority && !errors) {
      console.log(quest, date, difficulty, priority);
      if (data) {
        dispatch(
          updateTaskDetails({
            ...data,
            name: quest,
            priority: priority,
            difficulty: difficulty,
            completeBy: date || "",
            associatedWith: associatedWith || "",
            status: status,
            description: description || '',

          })
        );
        setUpdateData(false)
        setEdit(false)
      } else {
        dispatch(
          addTask({
            name: quest,
            priority: priority,
            difficulty: difficulty,
            completeBy: date,
            associatedWith: associatedWith || "",
            status: status,
            description: description || '',
            // status: "active",
            // description: description,
            // status: "0",
          })
        );
      }

      handleClose(false);
    }
  };

  return (
    <Modal show={addTab} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{!data ? "Add Task" : "Edit Task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {" "}
        <TextInput
          placeholder="Enter Quest"
          onChange={(e) => setQuest(e.target.value)}
          value={quest}
        ></TextInput>
      
        <TextInput
          placeholder="Complete By"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        ></TextInput>
        <DropDown  value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option>Select Difficulty</option>
          <option>easy</option>
          <option>intermediate</option>
          <option>Hard</option>
        </DropDown>
        <DropDown value={associatedWith} onChange={(e) => setAssociatedWith(e.target.value)}>
          <option>Associated With Goal</option>
          {goals?.map(({ name, _id }) => (
            <option value={_id}>{name}</option>
          ))}
        </DropDown>
        <DropDown value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Select Priority</option>
          {options?.map(({ label, id }) => (
            <option value={id}>{label}</option>
          ))}
          {/* <option>Select Priority</option>
          <option>Optional</option>
          <option>Do last</option>
          <option>Do after priority tasks</option>
          <option>Do First</option> */}
        </DropDown>
        <DropDown value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Select Status</option>
          {statusOptions?.map(({ label, id }) => (
            <option value={id}>{label}</option>
          ))}
          {/* <option>Select Priority</option>
          <option>Optional</option>
          <option>Do last</option>
          <option>Do after priority tasks</option>
          <option>Do First</option> */}
        </DropDown>
        <TextArea
          placeholder="Enter Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></TextArea>
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
  );
}

export default AddTaskModal;

const TextInput = styled.input`
  height: 50px;
  outline: none;
  border-radius: 5px;
  border: 1px solid #cb8282;
  padding: 0 20px;
  width: 45%;
  margin: 10px;
`;
const TextArea = styled.textarea`
  
  outline: none;
  border-radius: 5px;
  border: 1px solid #cb8282;
  padding: 0 20px;
  width: 93%;
  margin: 10px;
`;

const DropDown = styled.select`
  height: 50px;
  outline: none;
  border-radius: 5px;
  border: 1px solid #cb8282;
  padding: 0 20px;
  width: 45%;
  margin: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
`;
