import React, { useState, memo, useEffect } from "react";
import PropTypes from "prop-types";
import {
  UpdateContainer,
  FormContainer,
  Error,
  Title,
  File,
  FileContainer
} from "./Update.style";
import { Form, Input, Select, TextArea } from "semantic-ui-react";
import { Item, StagingItem } from "../ListOfInputs/ListOfInputs";
import { useInputValue, useMapReducer } from "../../hooks";
import { UPDATE_BENEFIT, UPLOAD_FILE } from "../../mutatuons/";
import { Redirect } from "react-router-dom";
import ReactListInput from "react-list-input";
import { useMutation } from "react-apollo-hooks";
import Map from "../Map/Map.jsx";
import UpdateModal from "../Modals/UpdateModal";
import AddLocation from "./AddLocation";
import UpdateControlls from "./UpdateControlls";
import DeleteLocation from "./DeleteLocation";
import imageCompression from "browser-image-compression";
import InputMask from "react-input-mask";

const UpdateForm = ({ data: { getBenefit }, refetch }) => {
  const [counte, setCounte] = useState(0);
  const [description, setDescription] = useState(getBenefit.description);
  const [discount, setDiscount] = useState(getBenefit.discount);
  const [errorMessage, setErrorMessage] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useMapReducer();
  const count = useInputValue(getBenefit.comments.length);
  const working = useInputValue(getBenefit.working);
  const name = useInputValue(getBenefit.name);
  const link = useInputValue(getBenefit.link);
  const [phone, setPhone] = useState(getBenefit.phone);
  const [url, setUrl] = useState(getBenefit.url);
  const [locations, setLocations] = useState(getBenefit.locations);
  const [lat, setLat] = useState(locations[counte].lat);
  const [lng, setLng] = useState(locations[counte].lng);
  const [address, setAddress] = useState(locations[counte].address);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [newLat, setNewLat] = useState("");
  const [newLng, setNewLng] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isOpenDiscount, setIsOpenDiscount] = useState(false);
  const updateBenefit = useMutation(UPDATE_BENEFIT);
  const singleUpload = useMutation(UPLOAD_FILE);

  const options = locations.map((item, i) => ({
    key: item.id,
    text: item.address,
    value: i
  }));

  const valid =
    name.value &&
    link.value &&
    discount.length &&
    discount[0] !== "" &&
    url &&
    description &&
    address &&
    lat &&
    lng &&
    !isNaN(lat) &&
    !isNaN(lng) &&
    working.value &&
    phone &&
    phone[phone.length - 1] !== "_";

  useEffect(() => {
    setSuccess(false);
    setIsError(false);
    setErrorMessage("");
  }, [
    count.value,
    working.value,
    phone,
    name.value,
    link.value,
    url,
    locations,
    lat,
    lng,
    address,
    state.lat,
    state.lng
  ]);

  const handleSubmit = async () => {
    try {
      let image;

      setErrorMessage("");
      setLoading(true);

      if (file) {
        const options = {
          maxSizeMB: 0.01,
          maxWidthOrHeight: 400,
          useWebWorker: true
        };

        const compressedFile = await imageCompression(file, options);

        const { data } = await singleUpload({
          variables: { file: compressedFile }
        });

        image = data.singleUpload;
      } else if (url.includes("images/")) {
        image = url.split("images/")[1];
      } else {
        image = url;
      }

      await updateBenefit({
        variables: {
          id: getBenefit.id,
          discount,
          name: name.value,
          description,
          url: image,
          link: link.value,
          rating: getBenefit.rating,
          working: working.value,
          locations,
          phone,
          count: count.value
        }
      });

      refetch();
      setIsError(false);
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      console.log(error);

      setLoading(false);
      setIsError(true);
      setErrorMessage(error.message);
    }
  };

  const hanldeClick = e => setDescription(e.target.value);

  const selectLocations = (_, { value }) => setCounte(value);

  useEffect(() => {
    setLat(locations[counte].lat);
    setLng(locations[counte].lng);
    setAddress(locations[counte].address);
    dispatch({
      type: "MOVE",
      lat: locations[counte].lat,
      lng: locations[counte].lng
    });
  }, [counte]);

  useEffect(() => {
    const data = locations.find(item => item.address === address);

    const location = locations.map(item => {
      if (item.address === data.address) {
        item = {
          ...item,
          lat: parseFloat(state.lat),
          lng: parseFloat(state.lng)
        };
      }
      return item;
    });

    setLocations(location);
  }, [state.lat, state.lng]);

  useEffect(() => {
    const location = locations.map(item => ({
      address: item.address,
      lat: item.lat,
      lng: item.lng
    }));
    setLocations(location);
  }, []);

  useEffect(() => {
    setLat(locations[0].lat);
    setLng(locations[0].lng);
    setAddress(locations[0].address);
  }, [locations.length]);

  const changeLocations = (value, name) => {
    setLoading(false);

    const data = locations.find(
      item =>
        item.address === address ||
        item.lat === state.lat ||
        item.lng === state.lng
    );

    if (name === "address") {
      setAddress(value);
    } else if (name === "lat") {
      setLat(value);
    } else {
      setLng(value);
    }

    const location = locations.map(item => {
      if (item.address === data.address) {
        item = {
          ...item,
          [name]: name === "lat" || name === "lng" ? parseFloat(value) : value
        };
      }

      return item;
    });

    setLocations(location);
  };

  const addNewLocation = () => {
    locations.push({
      address: newAddress,
      lat: parseFloat(newLat),
      lng: parseFloat(newLng)
    });

    setLocations(locations);
    closeUpdateModal();
  };

  const closeUpdateModal = () => {
    setNewLat("");
    setNewLng("");
    setNewAddress("");
    setUpdateOpen(false);
  };

  const deleteItem = async id => {
    const location = locations.filter((item, i) => i !== id);

    setCounte(0);
    setLocations(location);
  };

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

  const locationProps = {
    newLng,
    newLat,
    newAddress,
    setNewLat,
    setNewLng,
    setNewAddress,
    addNewLocation,
    closeUpdateModal,
    setRedirect
  };

  const updateProps = {
    locations,
    loading,
    valid,
    setUpdateOpen,
    setDeleteOpen,
    setRedirect
  };

  return redirect ? (
    <Redirect to="/" />
  ) : (
    <UpdateContainer>
      <FormContainer>
        <Form onSubmit={handleSubmit.bind(this, updateBenefit)}>
          <h3>Обновит бенефит</h3>
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

          <FileContainer>
            <div style={{ width: file !== undefined ? "90%" : "100%" }}>
              Фотография <span className="red">*</span>
              <div style={{ display: "flex" }}>
                <File
                  type="file"
                  onChange={handleFile}
                  accept=".jpg, .jpeg, .png"
                />
              </div>
            </div>
            {file !== undefined && (
              <img
                src={url}
                alt={name.value}
                style={{
                  height: "50px",
                  width: "70px",
                  marginLeft: "20px",
                  borderRadius: "10%"
                }}
              />
            )}
          </FileContainer>

          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Ссылка на сайт"
              placeholder="Ссылка на сайт..."
              {...link}
            />
            <Form.Field
              control={Select}
              options={options}
              onChange={selectLocations}
              label="Выберите локацию"
              placeholder="Выберите локацию..."
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              required
              control={TextArea}
              label="Описание"
              placeholder="Описание"
              style={{ resize: "none" }}
              value={description}
              onChange={hanldeClick}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              required
              control={Input}
              label="Широта"
              placeholder="Широта..."
              value={state.lat}
              onChange={e => changeLocations(e.target.value, "lat")}
            />
            <Form.Field
              required
              control={Input}
              label="Долгота"
              placeholder="Долгота..."
              value={state.lng}
              onChange={e => changeLocations(e.target.value, "lng")}
            />
          </Form.Group>
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
                  ItemComponent={Item}
                  StagingComponent={StagingItem}
                  value={discount}
                />
              </label>
            ) : (
              <div className="input-container">
                <div className="container-discount">
                  <Form.Field
                    required
                    control={Input}
                    label="Скидка"
                    className="input-discount"
                    placeholder="Скидка..."
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
            <div className="input-container">
              <Form.Field
                required
                control={Input}
                label="Адрес"
                placeholder="Адрес..."
                value={address}
                onChange={e => changeLocations(e.target.value, "address")}
              />
            </div>
          </Form.Group>
          {success && <div className="success">Success</div>}
          {isError && <Error>{errorMessage}</Error>}
          <UpdateControlls {...updateProps} />
        </Form>
      </FormContainer>
      <Map
        lat={lat}
        lng={lng}
        state={state}
        dispatch={dispatch}
        city={getBenefit.parentCategory.parentCity.name}
      />
      <UpdateModal open={updateOpen} close={setUpdateOpen.bind(this, false)}>
        <AddLocation
          city={getBenefit.parentCategory.parentCity.name}
          {...locationProps}
        />
      </UpdateModal>
      <UpdateModal open={deleteOpen} close={setDeleteOpen.bind(this, false)}>
        <DeleteLocation
          locations={locations}
          deleteItem={deleteItem}
          close={setDeleteOpen.bind(this, false)}
        />
      </UpdateModal>
    </UpdateContainer>
  );
};

UpdateForm.defaultProps = {
  getBenefit: {
    comments: [],
    count: 0,
    createdAt: "",
    description: "",
    discount: [],
    id: "",
    link: "",
    locations: [
      {
        address: "",
        lat: 0,
        lng: 0
      }
    ],
    name: "",
    phone: "",
    rating: 0,
    secret: "",
    url: "",
    working: ""
  },
  refetch: () => {}
};

UpdateForm.propTypes = {
  getBenefit: PropTypes.shape({
    comments: PropTypes.array.isRequired,
    count: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    discount: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    locations: PropTypes.arrayOf({
      address: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    }).isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    secret: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    working: PropTypes.string.isRequired
  }).isRequired,
  refetch: PropTypes.func.isRequired
};

export default memo(UpdateForm);
