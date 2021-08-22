import { useState } from "react";
import LoginPage from "./LoginPage";
import styled from "styled-components/macro";
import Register from "./Register";

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      css={`
        margin: auto;
      `}
    >
      <Container>
        {isLogin ? (
          <Tab>
            <LoginPage />
          </Tab>
        ) : (
          <Tab2
            onMouseEnter={() => {
              setTimeout(() => setIsLogin(true), 500);
            }}
          >
            <h2>Welcome to login</h2>
          </Tab2>
        )}
        {!isLogin ? (
          <Tab>
            <Register />
          </Tab>
        ) : (
          <Tab2
            onMouseEnter={() => {
              setTimeout(() => setIsLogin(false), 500);
            }}
          >
            <h2>Sign UP</h2>
          </Tab2>
        )}
      </Container>
    </div>
  );
};

export default Home;

const Tab = styled.div`
  background: white;
  padding: 20px;
  width: 400px;
  height: 500px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  color: black;
  justify-content: center;
  margin: 60px 0;
`;
const Tab2 = styled(Tab)`
  background: linear-gradient(135deg, #f75959 0%, #f35587 100%);
  opacity: 1;
  transition: 0.5s;
  &:hover {
    opacity: 0.6;
  }
`;
