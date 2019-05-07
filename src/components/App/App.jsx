import React, { Fragment, useState, useEffect } from "react";
import { Container, ContentContainer } from "./App.style";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Router from "../Router/Router";
import Login from "../Login/Login.jsx";
import { Context } from "../../context";
import moment from "moment";

export default () => {
  const [login, setLogin] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("expiredDate")) &&
      JSON.parse(localStorage.getItem("currentDate"))
    ) {
      if (
        JSON.parse(localStorage.getItem("expiredDate")) ===
        JSON.parse(localStorage.getItem("currentDate"))
      ) {
        localStorage.removeItem("expiredDate");
        localStorage.removeItem("currentDate");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        setLogin(false);
      } else {
        localStorage.setItem("currentDate", JSON.stringify(moment().hour()));
        localStorage.setItem(
          "expiredDate",
          JSON.stringify(moment().hour() + 2)
        );
      }
    }
  });

  return (
    <Context.Provider value={{ setLogin }}>
      <Container>
        {login ? (
          <Fragment>
            <Sidebar />
            <ContentContainer>
              <Router />
            </ContentContainer>
          </Fragment>
        ) : (
          <Login />
        )}
      </Container>
    </Context.Provider>
  );
};
