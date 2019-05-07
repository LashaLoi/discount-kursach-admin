import React from "react";
import PropTypes from "prop-types";
import { Form, Input, TextArea } from "semantic-ui-react";
import { File, FileContainer, conteiner } from "./CreateBenefit.style";
import InputMask from "react-input-mask";

const Fields = ({
  name,
  phone,
  working,
  handleFile,
  link,
  children,
  description,
  setDescription,
  lat,
  lng,
  url,
  setLat,
  setLng,
  file,
  setPhone
}) => (
  <>
    <Form.Group widths="equal">
      <Form.Field
        control={Input}
        label="Имя бенефита"
        placeholder="Имя бенефита..."
        {...name}
      />
      <label className="phone-label">
        Телефон <span className="red">*</span>
        <InputMask
          mask="+375 (99)-999-99-99"
          maskChar="_"
          value={phone}
          placeholder="Телефон"
          onChange={e => setPhone(e.target.value)}
        />
      </label>
      <Form.Field
        control={Input}
        label="Время работы"
        placeholder="Время работы..."
        {...working}
      />
    </Form.Group>
    <div style={conteiner}>
      <FileContainer>
        <div style={{ width: file ? "90%" : "100%" }}>
          Фотография <span className="red">*</span>
          <File type="file" onChange={handleFile} accept=".jpg, .jpeg, .png" />
        </div>
        {file && (
          <img
            src={url}
            alt={url}
            style={{
              height: "50px",
              width: "70px",
              marginLeft: "20px",
              borderRadius: "10%"
            }}
          />
        )}
      </FileContainer>
    </div>
    <Form.Group widths="equal">
      <Form.Field
        control={Input}
        label="Ссылка на сайт"
        placeholder="Ссылка на сайт..."
        {...link}
      />
      {children}
    </Form.Group>
    <Form.Group widths="equal">
      <Form.Field
        required
        control={TextArea}
        label="Описание"
        placeholder="Описание"
        style={{ resize: "none" }}
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
    </Form.Group>

    <Form.Group widths="equal">
      <Form.Field
        control={Input}
        label="Широта"
        value={lat}
        required
        onChange={e => setLat(e.target.value)}
      />
      <Form.Field
        control={Input}
        label="Долгота"
        value={lng}
        required
        onChange={e => setLng(e.target.value)}
      />
    </Form.Group>
  </>
);

Fields.defaultProps = {
  name: {
    value: "",
    onChange: () => {},
    reset: () => {}
  },
  phone: {
    value: "",
    onChange: () => {},
    reset: () => {}
  },
  working: {
    value: "",
    onChange: () => {},
    reset: () => {}
  },
  url: {
    value: "",
    onChange: () => {},
    reset: () => {}
  },
  link: {
    value: "",
    onChange: () => {},
    reset: () => {}
  },
  description: "",
  setDescription: () => {},
  state: {
    lat: 0,
    lng: 0,
    open: false
  }
};

Fields.propTypes = {
  name: PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  }).isRequired,
  phone: PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  }).isRequired,
  working: PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  }).isRequired,
  url: PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  }).isRequired,
  link: PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  }).isRequired,
  description: PropTypes.string.isRequired,
  setDescription: PropTypes.func.isRequired,
  state: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    open: PropTypes.bool.isRequired
  }).isRequired
};

export default Fields;
