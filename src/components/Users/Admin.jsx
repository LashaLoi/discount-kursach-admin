import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import { GET_EMPLOYEE } from "../../queries/";
import { Button, Icon } from "semantic-ui-react";
import { useQuery } from "react-apollo-hooks";
import Error from "../Error/Error";
import LoadingPage from "../LoadingPage/LoadingPage";
import UserList from "./UserList";
import { Align, NotFound, LoadMore } from "./Users.style";

const Admin = ({ limit, setLimit, state, toggleAdmin }) => {
  const [loadingDate, setLoading] = useState(false);
  const { data, error, loading, refetch, fetchMore } = useQuery(GET_EMPLOYEE, {
    variables: { lastName: state.user, limit: 20 }
  });

  const fetchMoteData = fetchMore => {
    setLoading(true);
    fetchMore({
      variables: {
        offset: limit,
        limit: limit + 20
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        setLoading(false);
        return fetchMoreResult;
      }
    });
    setLimit(limit + 20);
  };

  if (loading) return <LoadingPage flex />;

  if (error) return <Error message={error.message} refetch={refetch} />;

  return (
    <Align>
      <UserList
        query="getNoAdmins"
        button="plus"
        data={data}
        toggleAdmin={toggleAdmin}
        refetch={refetch}
      />

      {data.getNoAdmins.length >= 20 && (
        <LoadMore>
          <Button
            basic
            color="red"
            loading={loadingDate}
            onClick={fetchMoteData.bind(this, fetchMore)}
          >
            Загрузить еще
          </Button>
        </LoadMore>
      )}

      {data.getNoAdmins.length === 0 && (
        <NotFound>
          <Icon name="search minus" /> Ничего не найдено
        </NotFound>
      )}
    </Align>
  );
};

Admin.defaultProps = {
  limit: 10,
  setLimit: () => {},
  state: {},
  toggleAdmin: () => {}
};

Admin.propsTypes = {
  limit: PropTypes.number.isRequired,
  setLimit: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  toggleAdmin: PropTypes.func.isRequired
};

export default memo(Admin);
