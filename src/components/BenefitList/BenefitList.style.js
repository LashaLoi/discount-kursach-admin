import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const ItemContainer = styled.div`
  margin: 50px 20px 0px 20px;
  transition: 0.1s all ease-in-out;

  &:first-child {
    margin: 100px 20px 0px 20px;
  }

  &:hover {
    color: #888;
  }

  .dropdown {
    line-height: 100%;
    transition: transform 500ms ease;
  }

  .rotate {
    transform: rotate(180deg);
  }
`;

export const BenefitContainer = styled.div`
  margin: 20px 0;
`;

export const ButtonCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 480px) {
    margin-top: 20px;
  }
`;

export const alignCenter = {
  textAlign: "center"
};

export const Img = styled.img`
  border-radius: 10px;
  height: 100px;
  width: 140px;
  margin-right: 30px;
`;

export const Titie = styled.h1`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonContainer = styled.div`
  margin-top: 30px;
`;
