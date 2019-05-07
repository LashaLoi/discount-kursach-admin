import React, { useEffect, memo, useState } from "react";
import PropTypes from "prop-types";
import { Button, Input, Form, Icon } from "semantic-ui-react";
import Map from "../Map/Map";
import { useMapReducer } from "../../hooks/";
import geocoder from "google-geocoder";
import { Error } from "./Update.style";

const AddLocation = ({
  newLng,
  newLat,
  newAddress,
  setNewLat,
  setNewLng,
  setNewAddress,
  addNewLocation,
  closeUpdateModal,
  city
}) => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

  const { state, dispatch } = useMapReducer();

  const resetError = () => {
    setIsError(false);
    setErrorMessage("");
  };

  useEffect(() => {
    setNewLat(state.lat);
    setNewLng(state.lng);
  }, [state.lat, state.lng]);

  const getCoord = address => {
    resetError();

    const geo = geocoder({
      key: REACT_APP_GOOGLE_MAPS_API_KEY
    });

    geo.find(address, (err, res) => {
      if (err || res.length === 0) {
        setIsError(true);
        setErrorMessage("Не получается найти координаты.");

        return;
      }

      const {
        location: { lat, lng }
      } = res[0];

      setNewLat(lat);
      setNewLng(lng);

      dispatch({ type: "MOVE", lat, lng });
    });
  };

  const getAddress = async (lat, lng) => {
    resetError();

    try {
      const result = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${REACT_APP_GOOGLE_MAPS_API_KEY}`
      );

      const { results } = await result.json();

      const { formatted_address } = results[0];

      setNewAddress(formatted_address);
    } catch (error) {
      setIsError(true);
      setErrorMessage("Не получается найти адрес.");
    }
  };

  return (
    <div className="update-modal">
      <Form className="update-controlls">
        <h2>Добавьте локацию</h2>
        <Form.Group widths="equal" className="some">
          <Form.Field
            className="update-field"
            control={Input}
            label="Широта"
            placeholder="Широта..."
            value={newLat}
            onChange={e => {
              resetError();
              setNewLat(e.target.value);
            }}
          />
          <Form.Field
            className="update-field"
            control={Input}
            label="Долгота"
            placeholder="Долгота..."
            value={newLng}
            onChange={e => {
              resetError();
              setNewLng(e.target.value);
            }}
          />
          <Form.Field
            className="update-field"
            control={Input}
            label="Адрес"
            placeholder="Адрес..."
            value={newAddress}
            onChange={e => {
              resetError();
              setNewAddress(e.target.value);
            }}
          />
        </Form.Group>
        {isError && <Error>{errorMessage}</Error>}
        <Form.Group className="update-controll">
          <Form.Field
            disabled={!newLat || !newLng || !newAddress}
            icon
            labelPosition="right"
            basic
            color="red"
            control={Button}
            type="button"
            onClick={addNewLocation}
          >
            Добавить
            <Icon name="plus" />
          </Form.Field>
          <Form.Field
            basic
            color="red"
            control={Button}
            type="button"
            onClick={getAddress.bind(this, newLat, newLng)}
          >
            Найти адрес по координатам
          </Form.Field>
          <Form.Field
            icon
            labelPosition="right"
            basic
            color="red"
            control={Button}
            type="button"
            onClick={closeUpdateModal}
          >
            Отменить
            <Icon name="delete" />
          </Form.Field>

          <Form.Field
            basic
            color="red"
            control={Button}
            type="button"
            onClick={getCoord.bind(this, newAddress)}
          >
            Найти координаты по адресу
          </Form.Field>
        </Form.Group>
      </Form>
      <Map
        city={city}
        modal={true}
        lat={state.lat}
        lng={state.lng}
        state={state}
        dispatch={dispatch}
      />
    </div>
  );
};

AddLocation.defaultProps = {
  newLng: 0,
  newLat: 0,
  newAddress: "",
  setNewLat: () => {},
  setNewLng: () => {},
  setNewAddress: () => {},
  isError: false,
  addNewLocation: () => {},
  closeUpdateModal: () => {}
};

AddLocation.propTypes = {
  newLng: PropTypes.string.isRequired,
  newLat: PropTypes.string.isRequired,
  newAddress: PropTypes.string.isRequired,
  setNewLat: PropTypes.func.isRequired,
  setNewLng: PropTypes.func.isRequired,
  setNewAddress: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  addNewLocation: PropTypes.func.isRequired,
  closeUpdateModal: PropTypes.func.isRequired
};

export default memo(AddLocation);
