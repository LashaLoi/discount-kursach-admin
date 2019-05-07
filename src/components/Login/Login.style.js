import styled from "styled-components";

export const Container = styled.div`
  background: linear-gradient(to bottom, #d4d3dd, #ffffff);
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 800px) {
    background: url("https://www.mockupworld.co/wp-content/uploads/edd/2015/07/Macbook-Pro-Office-Mock-Up-Set-3.jpg")
      center;
    background-size: cover;
  }
`;

export const Container1 = styled.div`
  background: none;
  margin: 0;
`;

export const FormContainer = styled.div`
  overflow: hidden;
  background: white;
  height: 80%;
  width: 70%;
  box-shadow: 15px 15px 100px #777;
  display: flex;

  @media (max-width: 800px) {
    width: 50%;
  }
`;

export const Label = styled.label``;

export const ErrorContainer = styled.div`
  color: #e95146;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.div`
  background: url("https://www.mockupworld.co/wp-content/uploads/edd/2015/07/Macbook-Pro-Office-Mock-Up-Set-3.jpg")
    center;
  overflow: hidden;
  background-size: cover;
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex: 2;

  @media (max-width: 800px) {
    display: none;
  }
`;

export const Content = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: 20px;
`;

export const H2 = styled.h2`
  color: #e95146;
`;

export const P = styled.p`
  color: #999;
`;

export const ButtonContainer = styled.div`
  text-align: center;
`;

export const Title = styled.div`
  text-shadow: 1px 1px 1px #000;
  display: flex;
  flex-direction: column;
  padding: 50px;
  height: 100%;
  background: rgba(161, 34, 34, 0.7);
  width: 100%;
  font-size: 2rem;
`;

export const SubTitle = styled.div`
  margin-top: 40%;
  line-height: 50px;
  color: #fff;
`;

export const Ref = styled.a`
  color: #fff;

  &:hover {
    color: #eee;
  }
`;

export const Logo = styled.div`
  display: none;
  font-size: 2rem;
  height: 50px;
  text-align: center;

  @media (max-width: 800px) {
    display: block;
  }
`;

export const LogoImage = styled.img`
  height: 50px;
  width: 100px;
`;
