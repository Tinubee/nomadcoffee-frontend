import { useReactiveVar } from "@apollo/client";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar, logUserOut } from "../apollo";
import useUser from "../hooks/useUser";
import routes from "../routes";
import Avatar from "./Avatar";
import DarkMode from "./DarkMode";

const Contanier = styled.div`
  width: 100%;
  min-width: 1200px;
  border-bottom: 1px solid ${(props) => props.theme.fontColor};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0px;
  margin-bottom: 40px;
`;

const SHeader = styled.header`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AuthLink = styled.div`
  display: flex;
  font-size: 15px;
`;

const BtnContainer = styled.div`
  margin-top: 5px;
  cursor: pointer;
`;

const LogoutBtn = styled.div`
  border: none;
  border-radius: 3px;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 7px;
  font-weight: 600;
  width: 100%;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const CreateCoffeeBtn = styled.div`
  border: none;
  border-radius: 3px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 7px;
  font-weight: 600;
  width: 100%;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const Nav = styled.div`
  margin-top: 12px;
  margin-right: 20px;
`;

function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const history = useHistory();
  const { data } = useUser();
  const logout = () => {
    if (isLoggedIn) {
      history.push(routes.home);
      logUserOut();
    } else {
      window.location.reload();
    }
  };
  return (
    <Contanier>
      <SHeader>
        <DarkMode />
        <Link to={routes.home}>
          <FontAwesomeIcon icon={faCoffee} size="3x" />
        </Link>
        <AuthLink>
          {isLoggedIn ? (
            <Nav>
              <Link to={`/users/${data?.me?.username}`}>
                <Avatar url={data?.me?.avatarURL} />
              </Link>
            </Nav>
          ) : null}
          <BtnContainer>
            <LogoutBtn onClick={logout}>
              {isLoggedIn ? "로그아웃" : "로그인"}
            </LogoutBtn>
            <CreateCoffeeBtn>
              <Link to={routes.coffee}>{isLoggedIn ? "카페등록" : null}</Link>
            </CreateCoffeeBtn>
          </BtnContainer>
        </AuthLink>
      </SHeader>
    </Contanier>
  );
}
export default Header;
