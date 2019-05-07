import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Icon } from "semantic-ui-react";

const UpdateControlls = ({
  loading,
  valid,
  setUpdateOpen,
  setDeleteOpen,
  locations,
  setRedirect
}) => (
  <Form.Group>
    <Form.Field
      icon
      labelPosition="right"
      loading={loading}
      basic
      color="red"
      disabled={!valid}
      control={Button}
      type="submit"
    >
      Обновить
      <Icon name="checkmark" />
    </Form.Field>
    <Form.Field
      icon
      labelPosition="right"
      basic
      color="red"
      control={Button}
      type="button"
      onClick={setRedirect.bind(this, true)}
    >
      Назад
      <Icon name="cancel" />
    </Form.Field>
    <Form.Field
      icon
      labelPosition="right"
      basic
      color="red"
      control={Button}
      type="button"
      onClick={setUpdateOpen.bind(this, true)}
    >
      Добавить локацию
      <Icon name="plus" />
    </Form.Field>
    <Form.Field
      icon
      labelPosition="right"
      basic
      color="red"
      control={Button}
      type="button"
      onClick={setDeleteOpen.bind(this, true)}
      disabled={locations.length < 2}
    >
      Удалить локацию
      <Icon name="delete" />
    </Form.Field>
  </Form.Group>
);

UpdateControlls.defaultProps = {
  loading: false,
  valid: false,
  setUpdateOpen: () => {},
  setDeleteOpen: () => {},
  locations: [
    {
      address: "",
      lat: 0,
      lng: 0
    }
  ]
};

UpdateControlls.propTypes = {
  loading: PropTypes.boolisRequired,
  valid: PropTypes.stringisRequired,
  setUpdateOpen: PropTypes.funcisRequired,
  setDeleteOpen: PropTypes.funcisRequired,
  locations: PropTypes.arrayOf({
    address: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired
};

export default UpdateControlls;
