import styled from "styled-components";

export const Controller = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  min-height: 50px;
  background: #eee;
  border-bottom: 1px solid #000;
  z-index: 100;

  @media (max-width: 700px) {
    width: 100%;
    justify-content: center;
  }
`;

export const ControllerItem = styled.div`
  margin: 10px;

  @media (max-width: 700px) {
    width: 100%;
  }
`;
