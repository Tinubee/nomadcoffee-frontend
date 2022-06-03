import { gql, useMutation } from "@apollo/client";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { logUserIN } from "../apollo";
import AutoLayout from "../components/auth/AutoLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import routes from "../routes";

const Notification = styled.div`
  color: #2ecc71;
`;

const TitleText = styled.div`
  color: ${(props) => props.theme.fontColor};
  font-size: 30px;
  font-weight: 600;
  margin-top: 10px;
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

function Login() {
  const location = useLocation();
  const {
    register,
    handleSubmit,
    errors,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },
  });
  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      setError("result", { message: error });
    }
    if (token) {
      logUserIN(token);
    }
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmitValid = (data) => {
    if (loading) return;
    const { username, password } = getValues();
    login({
      variables: { username, password },
    });
  };
  const clearLoginError = () => {
    clearErrors("result");
  };
  return (
    <AutoLayout>
      <PageTitle title="Log In" />
      <FormBox>
        <div>
          <Icon>
            <FontAwesomeIcon icon={faCoffee} size="2x" />
          </Icon>
          <TitleText>Nomad Coffee</TitleText>
        </div>
        <Notification>{location?.state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({
              required: "Username is required",
              minLength: {
                value: 5,
                message: "Username should be longer than 5 characters",
              },
            })}
            onChange={clearLoginError}
            name="username"
            type="text"
            placeholder="Username"
            hasError={Boolean(errors.username?.message)}
          />
          <FormError message={errors.username?.message} />
          <Input
            ref={register({
              required: "Password is required",
            })}
            onChange={clearLoginError}
            name="password"
            type="password"
            placeholder="Password"
            hasError={Boolean(errors.password?.message)}
          />
          <FormError message={errors.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "로그인"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={errors.result?.message} />
        </form>
      </FormBox>
      <BottomBox
        cta="계정이 없습니까?"
        link={routes.signUp}
        linkText="회원가입"
      />
    </AutoLayout>
  );
}
export default Login;
