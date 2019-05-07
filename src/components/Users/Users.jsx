import React, { useState, memo } from "react";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_ADMIN } from "../../mutatuons/";
import { DebounceInput } from "react-debounce-input";
import {
  Container,
  EmployeeContainer,
  AdminContainer,
  Controlls
} from "./Users.style";
import Admin from "./Admin";
import User from "./User";

export default memo(() => {
  const [state, setState] = useState({
    admin: "",
    user: ""
  });
  const [limit, setLimit] = useState(20);
  const toggleAdmin = useMutation(TOGGLE_ADMIN);

  const handleChange = e => {
    const {
      target: { value, name }
    } = e;

    setState({
      ...state,
      [name]: value
    });
  };

  return (
    <Container>
      <EmployeeContainer>
        <Controlls>
          <h2>Пользователи</h2>
          <DebounceInput
            className="debounce-input"
            debounceTimeout={300}
            placeholder="Search..."
            name="user"
            value={state.user}
            onChange={handleChange}
          />
        </Controlls>
        <Admin
          limit={limit}
          setLimit={setLimit}
          state={state}
          toggleAdmin={toggleAdmin}
        />
      </EmployeeContainer>
      <AdminContainer>
        <Controlls>
          <h2>Админы</h2>
          <DebounceInput
            className="debounce-input"
            debounceTimeout={300}
            placeholder="Search..."
            name="admin"
            value={state.admin}
            onChange={handleChange}
          />
        </Controlls>
        <User state={state} toggleAdmin={toggleAdmin} />
      </AdminContainer>
    </Container>
  );
});
