import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export const AdminContainer = styled.div`
  flex: 1;
  overflow: auto;
`;

export const EmployeeContainer = styled.div`
  flex: 1;
  border-right: 1px solid #000;
  overflow: auto;
`;

export const Item = styled.div`
  overflow: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
`;

export const User = styled.div`
  margin: 0 40px;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: none;
  border: 2px solid #871b1c;
  font-size: 1.5rem;
  color: #871b1c;
  outline: none;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  &:hover {
    background: #871b1c;
    color: white;
  }
`;

export const Align = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px;
`;

export const Controlls = styled.div`
  margin: 10px 30px;
`;

export const NotFound = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px;
  font-size: 1.3rem;
`;

export const Img = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

export const LoadMore = styled.div`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  width: 40%;
`;
