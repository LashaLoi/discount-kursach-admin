import React from "react";
import PropTypes from "prop-types";
import { Loader } from "semantic-ui-react";
import { LoadingContainer } from "./LoadingPage.style";

const LoadingPage = ({ flex }) => (
  <LoadingContainer flex={flex}>
    <Loader active inline="centered" indeterminate>
      Загрузка...
    </Loader>
  </LoadingContainer>
);

LoadingPage.defaultProps = {
  flex: false
};

LoadingPage.propTypes = {
  flex: PropTypes.bool.isRequired
};

export default LoadingPage;
