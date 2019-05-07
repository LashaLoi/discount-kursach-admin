import React from "react";
import PropTypes from "prop-types";
import { List, Button, Header } from "semantic-ui-react";
import { Close } from "./Update.style";

const DeleteLocation = ({ locations, deleteItem, close }) => (
  <List divided relaxed style={{ padding: "50px" }}>
    <h2>Удалите локацию</h2>
    {locations.map((item, i) => (
      <>
        <List.Item className="list-item">
          <Header>Адрес: {item.address}</Header>

          <List.Content className="list-item-content">
            <div style={{ width: "200px", lineHeight: "30px" }}>
              <div>Широта: {item.lat}</div>
              <div>Долгота: {item.lng}</div>
            </div>
            <Button
              disabled={locations.length < 2}
              onClick={deleteItem.bind(this, i)}
              icon="delete"
              color="red"
            />
          </List.Content>
        </List.Item>
      </>
    ))}
    <Close>
      <Button onClick={close}>Закрыть</Button>
    </Close>
  </List>
);

DeleteLocation.defaultProps = {
  locations: [
    {
      address: "",
      lat: 0,
      lng: 0
    }
  ],
  deleteItem: () => {},
  close: () => {}
};

DeleteLocation.propsTypes = {
  locations: PropTypes.arrayOf({
    address: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,
  deleteItem: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
};

export default DeleteLocation;
