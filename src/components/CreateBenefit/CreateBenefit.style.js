import styled from "styled-components";

export const Container = styled.div`
  color: #e0321c;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  overflow: auto;
  margin: 10px;
`;

export const FormContainer = styled.div`
  flex-direction: column;
  display: flex;
  height: 90vh;
  width: 50%;
  margin: 10px;
  justify-content: center;
`;

export const Error = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #871b1c;
  text-align: center;
  margin: 30px 0;
  color: #d53030;
`;

export const Text = styled.p`
  width: 90%;
`;

export const Success = styled.div`
  color: green;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 30px 0;
`;

export const Title = styled.div`
  color: #000;
  font-weight: bold;
  margin: 5px;
`;

export const InputList = styled.input`
  border: 3px solid #000;
`;

export const InputButton = styled.span`
  margin: 10px;
  cursor: pointer;
`;

export const InputContainer = styled.div`
  margin: 10px 0;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const File = styled.input``;

export const FileContainer = styled.label`
  width: 100%;
  display: flex;
  align-items: flex-end;
  font-weight: bold;
  color: #000;
`;

export const conteiner = { margin: "10px 0" };

export const Content = styled.div`
  margin: 30px 0;
`;

export const ButtonContainer = styled.div`
  margin-top: 30px;
`;

export const Buttons = styled.div`
  display: flex;
  width: 100%;
`;
