import React, { memo, useState, useEffect } from "react";
import { useMutation, useQuery } from "react-apollo-hooks";
import PropTypes from "prop-types";
import { Form, Dropdown, Icon, Input } from "semantic-ui-react";
import { useInputValue } from "../../hooks/index";
import { GET_ALL_BY_CITY } from "../../queries/";
import { CREATE_BENEFIT, UPLOAD_FILE } from "../../mutatuons";
import ReactListInput from "react-list-input";
import ErrorQuery from "../Error/Error";
import Fields from "./Form";
import Error from "./Error";
import Success from "./Success";
import _ from "lodash";
import Buttons from "./Buttons";
import imageCompression from "browser-image-compression";
import geocoder from "google-geocoder";
import {
  Title,
  InputList,
  InputButton,
  InputContainer
} from "./CreateBenefit.style";

let locations = [];

const AddBenefit = ({ options, itemKey, state, dispatch }) => {
  const working = useInputValue("");
  const name = useInputValue("");
  const link = useInputValue("");
  const [phone, setPhone] = useState("");
  const [url, setUrl] = useState("");
  const [address, setAddress] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [description, setDescription] = useState("");
  const [isError, setIsError] = useState(false);
  const [load, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [category, setCategory] = useState("");
  const [discount, setDiscount] = useState([]);
  const [file, setFile] = useState(null);
  const [lat, setLat] = useState(state.lat);
  const [lng, setLng] = useState(state.lng);
  const [isOpenDiscount, setIsOpenDiscount] = useState(false);
  const [isOpenAddress, setIsOpenAddress] = useState(false);
  const [otherAddress, setOtherAddress] = useState("");
  const [otherAddressField, setOtherAddressField] = useState("");
  const [otherDiscount, setOtherDiscount] = useState("");
  const createBenefit = useMutation(CREATE_BENEFIT);
  const singleUpload = useMutation(UPLOAD_FILE);
  const {
    loading,
    error,
    data: { getCity },
    refetch
  } = useQuery(GET_ALL_BY_CITY, {
    variables: { id: itemKey },
    suspend: false
  });

  const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

  useEffect(() => {
    setLat(state.lat);
    setLng(state.lng);
  }, [state.lng, state.lat]);

  useEffect(() => {
    setIsError(false);
    setErrorMessage("");
  }, [
    name.value,
    phone,
    link.value,
    url,
    description,
    working.value,
    address.length,
    lat,
    lng,
    category,
    locations,
    discount
  ]);

  const valid =
    name.value &&
    phone &&
    phone[phone.length - 1] !== "_" &&
    link.value &&
    discount.length &&
    discount[0] !== "" &&
    url &&
    description &&
    address.length &&
    address[0] !== "" &&
    working.value &&
    (locations.length === 0 ? lat && lng : true) &&
    !isNaN(lat) &&
    !isNaN(lng) &&
    category;

  const resetAll = () => {
    working.reset();
    name.reset();
    setPhone("");
    setCategory("");
    link.reset();
    setDiscount([]);
    dispatch({ type: "RESET" });
    setDescription("");
    setAddress([]);
    setLat(0);
    setLng(0);
  };

  const addLocation = value => {
    setIsError(false);
    locations.push({
      address: value,
      lat: parseFloat(lat),
      lng: parseFloat(lng)
    });
    setAddress([]);
    setLat(0);
    setLng(0);
    dispatch({ type: "RESET" });
  };

  const coord = address => {
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

      setLat(lat);
      setLng(lng);
      dispatch({ type: "MOVE", lat, lng });
    });
  };

  const getCoord = address => {
    if (otherAddress && isOpenAddress) {
      coord(otherAddress);

      return;
    }

    coord(address);
  };

  const getAddress = async (lat, lng) => {
    try {
      const result = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${REACT_APP_GOOGLE_MAPS_API_KEY}`
      );

      const { results } = await result.json();

      const { formatted_address } = results[0];

      if (!locations.length) {
        setAddress([formatted_address]);
        return;
      }

      setOtherAddressField(formatted_address);
    } catch (error) {
      setIsError(true);
      setErrorMessage("Не получается найти адрес.");
    }
  };

  const handleSubmit = async () => {
    const options = {
      maxSizeMB: 0.01,
      maxWidthOrHeight: 400,
      useWebWorker: true
    };

    if (address && locations.length < 1) addLocation(address[0]);

    if (otherAddress) addLocation(otherAddress);

    if (otherAddressField) addLocation(otherAddressField);

    try {
      await setLoading(true);

      const compressedFile = await imageCompression(file, options);

      const { data } = await singleUpload({
        variables: { file: compressedFile }
      });

      await createBenefit({
        variables: {
          name: name.value,
          rating: 0,
          category,
          link: link.value,
          discount: otherDiscount ? discount.concat(otherDiscount) : discount,
          locations,
          url: data.singleUpload,
          description,
          working: working.value,
          phone
        }
      });

      resetAll();

      locations = [];

      setOtherDiscount("");
      setOtherAddress("");
      setOtherAddressField("");
      setIsOpenDiscount(true);
      setIsOpenAddress(true);
      setIsOpenDiscount(false);
      setIsOpenAddress(false);
      setLoading(false);
      setIsError(false);
      setErrorMessage(null);
      setSuccess(true);
    } catch (error) {
      setIsError(true);
      setErrorMessage(error);
      setLoading(false);
      setSuccess(false);
    }
  };

  const Inputs = ({ value = otherAddressField, onChange, type = "text" }) => (
    <InputList
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );

  const StagingAddress = ({ value, onAdd, canAdd, add, onChange }) => (
    <InputContainer
      onMouseLeave={e => {
        e.target.value && setOtherAddress(e.target.value);
      }}
    >
      <Inputs value={value} onChange={onChange} />
      <InputButton
        onClick={() => {
          if (lat && lng) {
            if (locations.length === 0) {
              if (otherAddressField) {
                addLocation(otherAddressField);
                onAdd();
              }
              if (value) {
                addLocation(value);
                onAdd();
              }
              setOtherAddressField("");
              setOtherAddress("");
            } else if (
              locations[locations.length - 1].lat === state.lat &&
              locations[locations.length - 1].lng === state.lng
            ) {
              setIsError(true);
              setErrorMessage("Измените локацию (широту, долготу)");
            } else {
              if (otherAddressField) {
                addLocation(otherAddressField);
                onAdd();
              }
              if (value) {
                addLocation(value);
                onAdd();
              }

              setOtherAddressField("");
              setOtherAddress("");
            }
          } else {
            setIsError(true);
            setErrorMessage("Укажите локацию (широту, долготу)");
          }
        }}
      >
        <Icon name="plus" />
      </InputButton>
    </InputContainer>
  );

  const ItemAddress = ({ removable, onChange, onRemove, value }) => (
    <InputContainer>
      <Inputs value={value} onChange={onChange} />
      <InputButton
        onClick={
          removable
            ? () => {
                locations = locations.filter(item => item.address !== value);

                if (!locations.length) {
                  setIsOpenAddress(false);
                }

                onRemove();
              }
            : x => x
        }
      >
        <Icon name="remove" />
      </InputButton>
    </InputContainer>
  );

  const ItemDicount = ({ removable, onChange, onRemove, value }) => (
    <InputContainer>
      <Inputs value={value} onChange={onChange} />
      <InputButton
        onClick={
          removable
            ? () => {
                if (!locations.length) {
                  setIsOpenDiscount(false);
                }

                onRemove();
              }
            : x => x
        }
      >
        <Icon name="remove" />
      </InputButton>
    </InputContainer>
  );

  const StagingDiscount = ({ value, onAdd, canAdd, add, onChange }) => (
    <InputContainer
      onMouseLeave={e => {
        e.target.value && setOtherDiscount(e.target.value);
      }}
    >
      <Inputs value={value} onChange={onChange} />
      <InputButton
        onClick={
          canAdd
            ? () => {
                setDiscount([]);
                onAdd();
              }
            : null
        }
      >
        <Icon name="plus" />
      </InputButton>
    </InputContainer>
  );

  if (getCity) {
    getCity.categories.forEach(item => {
      const option = {
        key: item.id,
        value: item.id,
        text: item.name
      };

      options.push(option);
    });
  }

  const handleFile = ({
    target: {
      files: [file]
    }
  }) => {
    if (file) {
      setFile(file);

      try {
        const reader = new FileReader();

        reader.onload = () => setUrl(reader.result);

        reader.readAsDataURL(file);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addOneLoc = () => {
    if (address[0]) {
      addLocation(address[0]);
      setIsOpenAddress(true);
      setAddress(address);
    }
  };

  const feildProps = {
    name,
    phone,
    setPhone,
    working,
    url,
    link,
    state,
    description,
    setDescription,
    handleFile,
    lat,
    setLat,
    lng,
    setLng,
    file
  };

  // console.log(otherAddress);

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Добавить бенефит</h3>
      <Fields {...feildProps}>
        {itemKey && (
          <>
            {loading && null}
            {error && <ErrorQuery message={error.message} refetch={refetch} />}

            <Form.Field
              selection
              button
              required
              control={Dropdown}
              label="Категория"
              placeholder="Категория..."
              options={_.uniqBy(options, "value")}
              onChange={(e, { value }) => setCategory(value)}
            />
          </>
        )}
      </Fields>

      <Form.Group widths="equal">
        {discount.length > 1 || isOpenDiscount ? (
          <label className="textarea-desc">
            <Title>
              Скидки <span className="red">*</span>
            </Title>
            <ReactListInput
              onChange={setDiscount}
              maxItems={10}
              minItems={0}
              ItemComponent={ItemDicount}
              StagingComponent={StagingDiscount}
              value={discount}
            />
          </label>
        ) : (
          <div className="input-container">
            <div className="container-discount">
              <Form.Field
                required
                control={Input}
                label="Скидкa"
                className="input-discount"
                placeholder="Скидкa..."
                value={discount[0]}
                onChange={e => setDiscount([e.target.value])}
              />
              <button
                className="btn-discount"
                onClick={setIsOpenDiscount.bind(this, true)}
                type="button"
              >
                +
              </button>
            </div>
          </div>
        )}
        {address.length > 1 || isOpenAddress ? (
          <label className="textarea-desc">
            <Title>
              Адресa <span className="red">*</span>
            </Title>
            <ReactListInput
              onChange={setAddress}
              maxItems={10}
              minItems={0}
              ItemComponent={ItemAddress}
              StagingComponent={StagingAddress}
              value={address}
            />
          </label>
        ) : (
          <div className="input-container">
            <div className="container-discount">
              <Form.Field
                required
                control={Input}
                label="Адрес"
                className="input-discount"
                placeholder="Адрес..."
                value={address[0]}
                onChange={e => setAddress([e.target.value])}
              />
              <button
                className="btn-discount"
                onClick={addOneLoc}
                type="button"
              >
                +
              </button>
            </div>
          </div>
        )}
      </Form.Group>
      {isError && <Error errorMessage={errorMessage} />}
      {success && <Success />}
      <Form.Group>
        <Buttons
          valid={valid}
          load={load}
          getAddress={getAddress}
          getCoord={getCoord}
          lat={lng}
          lng={lng}
          address={address}
        />
      </Form.Group>
    </Form>
  );
};

AddBenefit.defaultProps = {
  options: [],
  itemKey: "",
  state: {
    lat: 0,
    lng: 0,
    open: false
  },
  dispatch: () => {}
};

AddBenefit.propsTypes = {
  options: PropTypes.array.isRequired,
  itemKey: PropTypes.string.isRequired,
  state: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    open: PropTypes.bool.isRequired
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default memo(AddBenefit);
