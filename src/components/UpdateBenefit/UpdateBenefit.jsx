import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "react-apollo-hooks";
import { GET_BENEFIT } from "../../queries";
import Benefit from "./Benefit";
import LoadingPage from "../LoadingPage/LoadingPage";
import Error from "../Error/Error";

const UpdateBenefit = ({ match }) => {
  const { loading, error, data, refetch } = useQuery(GET_BENEFIT, {
    variables: { id: match.params.id }
  });

  if (loading) return <LoadingPage />;

  if (error) return <Error message={error.message} refetch={refetch} />;

  return <Benefit refetch={refetch} data={data} />;
};

UpdateBenefit.defaultProps = {
  match: {}
};

UpdateBenefit.propTypes = {
  match: PropTypes.object.isRequired
};

export default UpdateBenefit;
