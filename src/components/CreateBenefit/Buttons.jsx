import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Icon } from "semantic-ui-react";
import { Buttons } from "./CreateBenefit.style";

export default ({ valid, load, getAddress, getCoord, lat, lng, address }) => (
  <Buttons>
    <Form.Field
      icon
      labelPosition="right"
      color="red"
      basic
      control={Button}
      type="submit"
      disabled={!valid}
      loading={load}
    >
      Добавить
      <Icon name="plus" />
    </Form.Field>
    <Link to="/">
      <Form.Field
        icon
        labelPosition="right"
        color="red"
        basic
        control={Button}
        type="button"
      >
        Назад
        <Icon name="cancel" />
      </Form.Field>
    </Link>
    <Form.Field
      color="red"
      basic
      control={Button}
      type="button"
      onClick={getAddress.bind(this, lat, lng)}
    >
      Найти адрес по координатам
    </Form.Field>
    <Form.Field
      color="red"
      basic
      control={Button}
      type="button"
      onClick={getCoord.bind(this, address)}
    >
      Найти координаты по адресу
    </Form.Field>
  </Buttons>
);
