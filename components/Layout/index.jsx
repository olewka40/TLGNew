import styled from "styled-components";
import { Sidebar } from "./Sidebar";
import React, { memo } from "react";

export const Layout = memo(props => {
  const { children, isLogin } = props;
  return (
    <StyledLayout>
      {!isLogin && <Sidebar />}
      {children}
    </StyledLayout>
  );
});

const StyledLayout = styled.div`
  position: relative;
  background-color: #17212b;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;
