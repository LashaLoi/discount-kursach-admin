import React, { memo } from "react";
import PropTypes from "prop-types";
import { Divider, Button } from "semantic-ui-react";
import { Item, User, Img, Content } from "./Users.style";

const UserList = ({ data, toggleAdmin, refetch, query, button }) => {
  const toggle = async profileId => {
    await toggleAdmin({
      variables: {
        profileId
      }
    });
    refetch();
  };

  return (
    <>
      {data[query].map(item => (
        <>
          <Divider />
          <Item key={item.profileId}>
            <Content>
              <Img src={`${item.image}`} alt={item.profileId} />
              <User>
                {item.firstName} {item.lastName}
              </User>
            </Content>
            <Button
              circular
              icon={button}
              color="google plus"
              onClick={toggle.bind(this, item.profileId)}
            />
          </Item>
        </>
      ))}
    </>
  );
};

UserList.defaultProps = {
  toggleAdmin: () => {},
  refetch: () => {},
  query: "",
  button: ""
};

UserList.propTypes = {
  toggleAdmin: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired
};

export default memo(UserList);
