import React, { memo, useState, Fragment } from "react";
import { useQuery } from "react-apollo-hooks";
import { GET_ALL_CITIES } from "../../queries/";
import { Container } from "./Benefits.style";
import BenefitList from "../BenefitList/CityList";
import BenefitsController from "../BenefitsController/BenefitsController";
import LoadingPage from "../LoadingPage/LoadingPage";
import Error from "../Error/Error";
import _ from "lodash";

const options = [];

const Benefits = () => {
  const [key, setKey] = useState(null);
  const { loading, error, data, refetch } = useQuery(GET_ALL_CITIES);

  const getBenefitsByCity = id => setKey(id);

  if (loading) return <LoadingPage />;

  if (error) return <Error message={error.message} refetch={refetch} />;

  if (data.getCities) {
    data.getCities.forEach((item, i) => {
      const newItem = {
        key: i,
        value: item.id,
        text: item.name
      };

      options.push(newItem);
    });
  }

  if (data) {
    return (
      <Fragment>
        <BenefitsController
          options={_.uniqBy(options, "value")}
          getBenefitsByCity={getBenefitsByCity}
        />
        <Container>{key && <BenefitList keyitem={key} />}</Container>
      </Fragment>
    );
  }
};

export default memo(Benefits);
