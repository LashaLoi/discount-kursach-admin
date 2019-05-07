import React, { useState, memo, useEffect } from "react";
import { Container, FormContainer, Content } from "./CreateBenefit.style";
import { Dropdown } from "semantic-ui-react";
import { GET_ALL_CITIES } from "../../queries/";
import { useQuery } from "react-apollo-hooks";
import AddBenefit from "./AddBenefit";
import Map from "../Map/Map";
import _ from "lodash";
import { useMapReducer } from "../../hooks";
import LoadingPage from "../LoadingPage/LoadingPage";
import Error from "../Error/Error";

let optionsCity = [];
let optionsCategory = [];

const CreateBenefit = () => {
  const [key, setKey] = useState(null);
  const { state, dispatch } = useMapReducer();
  const [cityName, setCityName] = useState("Минск");
  const { loading, error, data, refetch } = useQuery(GET_ALL_CITIES);

  const item = JSON.parse(localStorage.getItem("city")) || 0;

  const handleCityChange = (e, { value }) => {
    optionsCategory = [];

    setKey(value);
    setCityName(optionsCity.find(item => item.value === value).text);
  };

  useEffect(() => {
    if (item) {
      handleCityChange({}, { value: _.uniqBy(optionsCity, "value")[item].key });
    }
  }, []);

  if (error) return <Error message={error.message} refetch={refetch} />;

  if (loading) return <LoadingPage />;

  if (data.getCities) {
    data.getCities.forEach(item => {
      const option = {
        key: item.id,
        value: item.id,
        text: item.name
      };

      optionsCity.push(option);
    });
  }

  useEffect(() => {
    setKey(_.uniqBy(optionsCity, "value")[item].key);
  }, []);

  return (
    <Container>
      <FormContainer>
        <Dropdown
          placeholder="Выберите город"
          options={_.uniqBy(optionsCity, "value")}
          defaultValue={optionsCity[item].value}
          selection
          button
          onChange={handleCityChange}
        />
        <Content>
          <AddBenefit
            itemKey={key}
            options={optionsCategory}
            state={state}
            dispatch={dispatch}
          />
        </Content>
      </FormContainer>
      <Map state={state} dispatch={dispatch} city={cityName} />
    </Container>
  );
};

export default memo(CreateBenefit);
