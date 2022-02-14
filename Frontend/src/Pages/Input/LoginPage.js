import { useState } from "react";
import { Alert, Form, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { handleRegister, login } from "./input.slice";
import "./style.scss";
import styled from "styled-components";
const LoginPage = () => {
  const dispatch = useDispatch();
  const [isLogin, setIslogin] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [registername, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerpassword, setRegisterPassword] = useState("");
  const [registerconfirmPassword, setRegisterConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const { loginErrors: errors } = useSelector((state) => state.input);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ name, password }));
    console.log(name, password);
  };

  const register = (e) => {
    e.preventDefault();
    if (registerpassword !== registerconfirmPassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage(false);
      dispatch(
        handleRegister({
          name: registername,
          email: registerEmail,
          password: registerpassword,
        })
      );
    }
  };

  const demollogin = (e) => {};

  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-center align-items-center mb-3">
        <ToggleButton
          onClick={() => setIslogin(true)}
          first
          active={isLogin || undefined}
        >
          login
        </ToggleButton>
        <ToggleButton
          onClick={() => setIslogin(false)}
          active={!isLogin || undefined}
        >
          Sign up
        </ToggleButton>
      </div>
      <Header>Welcome To Solo Leveling</Header>
      <div class={`flip-card ${isLogin && "flip"}`}>
        <div class="flip-card-inner">
          <div class="flip-card-front ">
            {/* <img src="img_avatar.png" alt="Avatar" style="width:300px;height:300px;"/> */}

            <FormContainer>
              {(message || errors) && (
                <Alert variant={`danger`}>{message || errors}</Alert>
              )}
              <FloatingLabel
                controlId="registerusername"
                label="Enter Username"
                className="mb-3"
                value={registername}
              >
                <Form.Control
                  type="text"
                  placeholder="name@example.com"
                  onChange={(e) => {
                    setRegisterName(e.target.value);
                  }}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="registeremail"
                label="Enter Email"
                className="mb-3"
                value={registername}
              >
                <Form.Control
                  type="text"
                  placeholder="name@example.com"
                  onChange={(e) => {
                    setRegisterEmail(e.target.value);
                  }}
                />
              </FloatingLabel>
              <FloatingLabel
                label="Enter Password"
                className="mb-3"
                value={registerpassword}
              >
                <Form.Control
                  type="password"
                  placeholder="name@example.com"
                  onChange={(e) => {
                    setRegisterPassword(e.target.value);
                  }}
                />
              </FloatingLabel>
              <FloatingLabel
                label="Confirm Password"
                className="mb-3"
                value={registerconfirmPassword}
              >
                <Form.Control
                  type="password"
                  placeholder="name@example.com"
                  onChange={(e) => {
                    setRegisterConfirmPassword(e.target.value);
                  }}
                />
              </FloatingLabel>
              <Button onClick={register} className="btn w-100">
                Register
              </Button>
            </FormContainer>
          </div>
          <div class="flip-card-back">
            <FormContainer>
              {(message || errors) && (
                <Alert variant={`danger`}>{message || errors}</Alert>
              )}
              <FloatingLabel
                controlId="loginusername"
                label="Enter Username"
                className="mb-3"
                value={name}
              >
                <Form.Control
                  type="text"
                  placeholder="name@example.com"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </FloatingLabel>
              <FloatingLabel
                // controlId="floatingInput"
                controlId="loginpassword"
                label="Enter Password"
                className="mb-3"
                value={password}
              >
                <Form.Control
                  type="password"
                  placeholder="name@example.com"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </FloatingLabel>
              <Button onClick={submitHandler} className="btn w-100">
                Login
              </Button>
            </FormContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

const Button = styled.div`
  color: #fff;
  background-color: #6c757d;
  padding: 0.7rem 4.75rem;
  border-color: #6c757d;
`;
const FormContainer = styled.div`
  padding: 15px;
  color: black;
`;
const ToggleButton = styled.button`
  ${({ active, first }) => `
background: ${active ? "#7d7dd9" : "white"};
border: 1px solid #7d7dd9;
cursor: pointer;
color:${active ? "white" : "#7d7dd9"};
padding: 10px;
border-radius: ${first ? "4px 0 0 4px" : "0 4px 4px 0"};
width: 200px;
font-weight: 500;
outline: none !important;
`}
`;
const Header = styled.h2`
height: 70px;
    width: 450px;
    background: #0ccac4;
    color: white;
    border: 1px solid #f1e0e0;
    text-align: left;
    display: flex;
    font-size: 28px;
    padding: 10px 16px;
    margin-bottom: 0;
    align-items: center;
}
`;
