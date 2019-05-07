import styled, { css } from "styled-components";

export const LoadingContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  ${props =>
    props.flex &&
    css`
      width: 50vw;
    `}
`;
