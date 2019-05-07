import styled, { css } from "styled-components";

export const MapContainer = styled.div`
  height: 100vh;
  width: 50%;
  background: #eee;

  ${props =>
    props.modal &&
    css`
      height: 500px;
      width: 550px;
    `}
`;

export const Marker = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50% 50% 50% 0;
  background: #ec1c24;
  position: absolute;
  transform: rotate(-45deg);
  left: 50%;
  top: 50%;
  margin: -20px 0 0 -20px;
  animation-name: bounce;
  animation-fill-mode: both;
  animation-duration: 1s;

  &:after {
    content: "";
    width: 14px;
    height: 14px;
    margin: 8px 0 0 8px;
    background: #fff;
    position: absolute;
    border-radius: 50%;
  }

  @keyframes pulsate {
    0% {
      transform: scale(0.1, 0.1);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: scale(1.2, 1.2);
      opacity: 0;
    }
  }

  @keyframes bounce {
    0% {
      opacity: 0;
      transform: translateY(-2000px) rotate(-45deg);
    }

    60% {
      opacity: 1;
      transform: translateY(30px) rotate(-45deg);
    }
    80% {
      transform: translateY(-10px) rotate(-45deg);
    }
    100% {
      transform: translateY(0) rotate(-45deg);
    }
  }
`;

export const Pulse = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  height: 14px;
  width: 14px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: 11px 0px 0px -12px;
  transform: rotateX(55deg);
  z-index: -2;

  &:after {
    content: "";
    border-radius: 50%;
    height: 40px;
    width: 40px;
    position: absolute;
    margin: -13px 0 0 -13px;
    animation: pulsate 2s ease-out;
    animation-iteration-count: infinite;
    opacity: 0;
    box-shadow: 0 0 1px 2px #888;
    animation-delay: 1.1s;
  }
`;

export const defaultValues = [
  {
    name: "Минск",
    center: {
      lat: 53.904523568525676,
      lng: 27.559803565876564
    }
  },
  {
    name: "Брест",
    center: {
      lat: 52.097837599073316,
      lng: 23.732725301716528
    }
  },
  {
    name: "Витебск",
    center: {
      lat: 55.18596333455575,
      lng: 30.200093502400023
    }
  },
  {
    name: "Гомель",
    center: {
      lat: 52.44148288182825,
      lng: 30.987072994587606
    }
  },
  {
    name: "Гродно",
    center: {
      lat: 53.67017229726468,
      lng: 23.812410433552486
    }
  },
  {
    name: "Могилев",
    center: {
      lat: 53.90109872615689,
      lng: 30.332540401814185
    }
  }
];
