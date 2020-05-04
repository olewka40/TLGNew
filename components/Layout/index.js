import styled from "styled-components";
import { Sidebar } from "./Sidebar";

export const Layout = props => {
  const { children, isLogin } = props;
  return (
    <StyledLayout>
      {!isLogin && <Sidebar />}
      {children}
    </StyledLayout>
  );
};

const StyledLayout = styled.div`
  position: relative;
  background-color: #17212b;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;
