import React, { useState, memo, Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { Button, Form, Input } from "semantic-ui-react";
import { useMutation } from "react-apollo-hooks";
import { LOGIN } from "../../mutatuons";
import { Context } from "../../context";
import icon from "../../assets/itechart_logo.svg";
import {
  Container,
  FormContainer,
  Label,
  ErrorContainer,
  Image,
  Content,
  H2,
  P,
  ButtonContainer,
  Title,
  SubTitle,
  Ref,
  Logo,
  LogoImage
} from "./Login.style";

const Login = () => {
  const { setLogin } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const loginHR = useMutation(LOGIN);

  const handleChange = e => {
    const {
      target: { name, value }
    } = e;

    setError(false);

    if (name === "username") {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  const handleSumbit = async () => {
    try {
      setLoading(true);

      const result = await loginHR({
        variables: {
          login: username.includes("@itechart-group.com")
            ? username.split("@itechart-group.com")[0]
            : username,
          password
        }
      });

      if (result.data.loginHR.sessionId === 0)
        throw Error(result.data.loginHR.errorMessage);

      const { token, refreshToken } = result.data.loginHR;

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      setLogin(true);
    } catch (error) {
      console.log(error);
      seterrorMessage(error.message);
      setLoading(false);
      setError(true);
      setPassword("");
    }
  };

  return (
    <Container>
      <FormContainer>
        <Fragment>
          <Image>
            <Title>
              <div>
                <LogoImage src={icon} alt={icon} />
              </div>
              <SubTitle>
                <div>Добро пожаловать в административную часть</div>
                <Ref href="https://discounts.itechart-group.com/login">
                  :iTechArt Discounts
                </Ref>
              </SubTitle>
            </Title>
          </Image>
          <Content>
            <Form onSubmit={handleSumbit}>
              <Logo>
                <LogoImage src={icon} alt={icon} />
              </Logo>
              <H2>Логин</H2>
              <P>Создавайте удивительные вещи</P>
              <Form.Field error={error}>
                <Label>
                  Имя
                  <Input
                    required
                    icon="user"
                    placeholder="Имя..."
                    value={username}
                    name="username"
                    onChange={handleChange}
                  />
                </Label>
              </Form.Field>
              <Form.Field error={error}>
                <Label>
                  Пароль
                  <Input
                    required
                    icon="lock"
                    placeholder="Пароль..."
                    value={password}
                    name="password"
                    type="password"
                    onChange={handleChange}
                  />
                </Label>
              </Form.Field>
              {error && <ErrorContainer>{errorMessage}</ErrorContainer>}
              <ButtonContainer>
                <Button color="red" basic loading={loading} type="submit">
                  Войти
                </Button>
              </ButtonContainer>
            </Form>
          </Content>
        </Fragment>
      </FormContainer>
    </Container>
  );
};

Login.defaultProps = {
  setLogin: () => {}
};

Login.propTypes = {
  setLogin: PropTypes.func.isRequired
};

export default memo(Login);
