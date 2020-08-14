import styled, { css } from "styled-components";
import { BotInfo, TopInfo } from "../Dialog/styled";
import { DialogContainer } from "../../CurrentDialog";

export const List = styled.div`
  ${p =>
    !p.opened &&
    css`${TopInfo},${BotInfo}{
    display: none;
}${DialogContainer}{
justify-content: center;
}

`}
`;
