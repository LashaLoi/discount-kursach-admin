import styled from "styled-components";

export const ErrorContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ErrorContent = styled.div`
  color: #ec1c24;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ErrorMessage = styled.div`
  font-size: 20px;
  margin-top: 40px;
`;

export const ErrorRefetch = styled.div`
  margin-top: 40px;
  font-size: 20px;
`;
