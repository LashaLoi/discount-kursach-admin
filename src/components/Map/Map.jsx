import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import { MapContainer, Marker, Pulse, defaultValues } from "./Map.style";

const AnyReactComponent = () => (
  <>
    <Marker />
    <Pulse />
  </>
);

const Map = ({ lat, lng, state, dispatch, modal, city }) => {
  const [mapLat, setMapLat] = useState(lat);
  const [mapLng, setMapLng] = useState(lng);
  const [zoom] = useState(12);

  useEffect(() => dispatch({ type: "MOVE", lat, lng }), []);

  useEffect(() => {
    dispatch({ type: "MOVE", lat: state.lat, lng: state.lng });
    setMapLat(state.lat);
    setMapLng(state.lng);
  }, [state.lat, state.lng]);

  const changeLocation = e => {
    dispatch({ type: "MOVE", lat: e.lat, lng: e.lng });
    setMapLat(e.lat);
    setMapLng(e.lng);
  };

  return (
    <MapContainer modal={modal}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDswKRbnRbUErMcYEuu5b2ybdxNpp6pxJ0" }}
        center={defaultValues.find(item => item.name === city).center}
        zoom={zoom}
        onClick={changeLocation}
        options={{
          zoomControl: true,
          mapTypeControl: true,
          scaleControl: true,
          streetViewControl: false,
          rotateControl: true,
          fullscreenControl: false
        }}
      >
        {!state.open ? (
          <AnyReactComponent lat={mapLat} lng={mapLng} />
        ) : (
          <AnyReactComponent lat={mapLat} lng={mapLng} />
        )}
      </GoogleMapReact>
    </MapContainer>
  );
};

Map.defaultProps = {
  lat: 0,
  lng: 0,
  state: {
    lat: 0,
    lng: 0,
    open: false
  },
  dispatch: () => {},
  city: "Минск"
};

Map.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  state: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    open: PropTypes.bool.isRequired
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired
};

export default Map;
