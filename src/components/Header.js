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

const LogoutBtn = styled.div`
  margin-top: 7px;
  cursor: pointer;
`;

const Nav = styled.div`
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
        <FontAwesomeIcon icon={faCoffee} size="2x" />
        <AuthLink>
          {isLoggedIn ? (
            <Nav>
              <Link to={`/users/${data?.me?.username}`}>
                <Avatar url={data?.me?.avatarURL} />
              </Link>
            </Nav>
          ) : null}
          <LogoutBtn onClick={logout}>
            {isLoggedIn ? "로그아웃" : "로그인"}
          </LogoutBtn>
        </AuthLink>
      </SHeader>
    </Contanier>
  );
}
export default Header;
