import React, { memo } from "react";
import PropTypes from "prop-types";
import { GET_ADMINS } from "../../queries/";
import { Icon } from "semantic-ui-react";
import { useQuery } from "react-apollo-hooks";
import Error from "../Error/Error";
import LoadingPage from "../LoadingPage/LoadingPage";
import UserList from "./UserList";
import { Align, NotFound } from "./Users.style";

const User = ({ state, toggleAdmin }) => {
  const { data, error, loading, refetch } = useQuery(GET_ADMINS, {
    variables: { lastName: state.admin },
    pollInterval: 2000
  });

  if (loading) return <LoadingPage flex />;

  if (error) return <Error message={error.message} refetch={refetch} />;

  return (
    <Align>
      <UserList
        query="getAdmins"
        button="minus"
        data={data}
        toggleAdmin={toggleAdmin}
        refetch={refetch}
      />

      {data.getAdmins.length === 0 && (
        <NotFound>
          <Icon name="search minus" /> Ничего не найдено
        </NotFound>
      )}
    </Align>
  );
};

User.defaultProps = {
  state: {},
  toggleAdmin: () => {}
};

User.propTypes = {
  state: PropTypes.object.isRequired,
  toggleAdmin: PropTypes.func.isRequired
};

export default memo(User);
