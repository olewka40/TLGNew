import styled from "styled-components";
import Link from "@material-ui/core/Link";

export const Container = styled.div`
  background-color: #0e1621;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const StyledText = styled.div`
  color: #e6f3fb;
  margin-bottom: 20px;
  font-size: 20px;
`;
export const StyledInput = styled.div`
  margin: 5px;
`;
export const StyledButton = styled.div`
  margin: 5px;
`;
export const StyledLink = styled(Link)`
  margin: 5px;
  color: #0074c6;
  :visited {
    color: #0074c6;
  }
  :link {
    color: #0074c6;
  }
`;
export const LockedForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
