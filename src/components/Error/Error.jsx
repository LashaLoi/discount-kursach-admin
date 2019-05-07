import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  ErrorContainer,
  ErrorContent,
  ErrorMessage,
  ErrorRefetch
} from "./Error.style";
import { Icon, Button } from "semantic-ui-react";
import { Context } from "../../context";

const Error = ({ message, refetch }) => {
  const [loading, setLoading] = useState(false);
  const { setLogin } = useContext(Context);

  const refetchQuery = () => {
    setLoading(true);
    refetch();
  };

  useEffect(() => setLoading(false), [loading]);

  if (message === "GraphQL error: Access denied") {
    setLogin(false);
  }

  return (
    <ErrorContainer>
      <ErrorContent>
        <Icon name="warning sign" />
        <ErrorMessage>{message}</ErrorMessage>
        <ErrorRefetch>
          <Button
            color="brown"
            basic
            loading={loading}
            content="Refetch"
            onClick={refetchQuery}
          />
        </ErrorRefetch>
      </ErrorContent>
    </ErrorContainer>
  );
};

Error.defautlProps = {
  message: "",
  refetch: () => {}
};

Error.propTypes = {
  message: PropTypes.string,
  refetch: PropTypes.func
};

export default Error;
