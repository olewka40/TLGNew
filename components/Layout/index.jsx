import styled from "styled-components";
import { Sidebar } from "./Sidebar/Sidebar";
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

export const StyledLayout = styled.div`
  position: relative;
  background-color: #17212b;
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: row;
`;
