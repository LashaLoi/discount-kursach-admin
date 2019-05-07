import React from "react";
import PropTypes from "prop-types";
import { Error, Text } from "./CreateBenefit.style";

const ErrorMessage = ({ errorMessage }) => (
  <Error>
    <Text>{errorMessage}</Text>
  </Error>
);

ErrorMessage.defaultProps = {
  errorMessage: ""
};

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired
};

export default ErrorMessage;
