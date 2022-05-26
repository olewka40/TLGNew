import styled, { css } from "styled-components";
import { Select } from "@material-ui/core";

export const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: ${p => (p.opened ? 400 : 80)}px;
  height: 100%;
  background: #17212b;
  transition: 0.3s;
  border-right: 1px solid black;
`;
export const Header = styled.div`
  background: #17212b;
  display: flex;
  justify-content: flex-start;
`;
export const OpenHidden = styled.div`
  ${p =>
    !p.opened &&
    css`{
display: flex;
  width: 100%;

`}
`;
export const Main = styled.div`
  height: 100%;
  overflow-y: auto;
`;
export const Footer = styled.div`
  display: flex;
  justify-content:${({ opened }) => (!opened ? "center" : "flex-end")};
  background: #17212b;
  min-height: 50px;
  
`;
export const StyledToolbar = styled.div`
  display: flex;
  align-items: center;
  padding-left: 5px;
  width: 100%;
`;
export const SearchInput = styled(Select)`
  border-radius: 5px;
  background-color: #232f3d;
  color: white;
`;
