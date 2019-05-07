import React, { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { GET_ALL_BY_CITY } from "../../queries/";
import { Container, ItemContainer } from "./BenefitList.style";
import LoadingPage from "../LoadingPage/LoadingPage";
import Error from "../Error/Error";
import CategoryList from "./CategoryList";
import moment from "moment";

const BenefitList = ({ keyitem }) => {
  const [activeBenefit, setActiveBenefit] = useState([]);

  const openBenefits = id => {
    const index = activeBenefit.indexOf(id);

    if (index > -1) {
      setActiveBenefit(activeBenefit.filter(item => item !== id));
    } else {
      activeBenefit.push(id);
      setActiveBenefit(activeBenefit);
    }
  };

  useEffect(() => {
    localStorage.setItem("currentDate", JSON.stringify(moment().hour()));
    localStorage.setItem("expiredDate", JSON.stringify(moment().hour() + 2));
  }, []);

  return (
    <Query query={GET_ALL_BY_CITY} variables={{ id: keyitem }}>
      {({ loading, error, data, refetch, subscribeToMore }) => {
        const props = {
          data,
          openBenefits,
          subscribeToMore,
          activeBenefit,
          refetch
        };

        if (loading) return <LoadingPage />;

        if (error) {
          return (
            <ItemContainer>
              <Error message={error.message} refetch={refetch} />
            </ItemContainer>
          );
        }

        return (
          <Container>
            <CategoryList {...props} />
          </Container>
        );
      }}
    </Query>
  );
};

BenefitList.defaultProps = {
  keyItem: ""
};

BenefitList.propTypes = {
  keyItem: PropTypes.string.isRequired
};

export default memo(BenefitList);
