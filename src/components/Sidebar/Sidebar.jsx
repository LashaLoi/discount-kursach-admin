import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { SidebarContainer, Content } from "./Sidebar.style";
import { Link, Redirect } from "react-router-dom";
import { Icon, Popup } from "semantic-ui-react";
import { useProfileId } from "../../hooks/";
import { Context } from "../../context";
import jwt from "jsonwebtoken";

const Sidebar = () => {
  const [redirect, setRedirect] = useState(false);
  const { setLogin } = useContext(Context);

  const logOut = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expiredDate");
    localStorage.removeItem("currentDate");
    await setRedirect(true);
    setLogin(false);
  };

  const ProfileId = useProfileId(jwt);

  return !redirect ? (
    <SidebarContainer>
      <Content>
        <Popup
          trigger={
            <Link to="/" className="white">
              <Icon name="list" size="big" circular />
            </Link>
          }
          content="Бенефиты"
          horizontalOffset={20}
          position="right center"
        />

        {(ProfileId === 1766 || ProfileId === 1189) && (
          <Popup
            trigger={
              <Link to="/users" className="white">
                <Icon name="users" size="big" circular />
              </Link>
            }
            content="Юзеры"
            horizontalOffset={20}
            position="right center"
          />
        )}
        <Popup
          trigger={
            <Icon
              circular
              name="log out"
              size="big"
              className="white"
              onClick={logOut}
            />
          }
          content="Выйти"
          horizontalOffset={20}
          position="right center"
        />
      </Content>
    </SidebarContainer>
  ) : (
    <Redirect to="/" />
  );
};

Sidebar.defaultProps = {
  setLogin: () => {}
};

Sidebar.propTypes = {
  setLogin: PropTypes.func.isRequired
};

export default Sidebar;
