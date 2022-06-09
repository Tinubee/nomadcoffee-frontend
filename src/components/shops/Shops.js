import PropTypes from "prop-types";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../Avatar";
import { BaseBox } from "../shared";
import routes from "../../routes";
import useUser from "../../hooks/useUser";

const Content = styled(BaseBox)`
  box-sizing: border-box;
  border: 1px solid black;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
`;

const ContentHeader = styled(BaseBox)`
  box-sizing: border-box;
  border-bottom: 1px solid black;
  padding: 15px;
  display: flex;
  align-items: center;
`;

const ContentPhoto = styled(BaseBox)`
  padding: 15px;
`;

const Name = styled.span`
  margin-left: 9px;
  font-weight: 800;
`;

const PhotoFile = styled.img`
  width: 100%;
`;

const Photo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;
const EditCoffeeBtn = styled.div`
  border: none;
  border-radius: 3px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 7px;
  font-weight: 600;
  margin-left: 70px;
  width: 50%;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;
function Shops({ id, name, user, photos, categories }) {
  const { data } = useUser();
  return (
    <Content key={id}>
      <ContentHeader>
        <Link to={`/users/${user.username}`}>
          <Avatar url={user.avatarURL} />
        </Link>
        <Link to={`/users/${user.username}`}>
          <Name>{user.username}</Name>
        </Link>
        {user?.username === data?.me?.username ? (
          <EditCoffeeBtn>
            <Link
              to={{
                pathname: routes.editcoffee,
                state: {
                  id,
                  name,
                  user,
                  photos,
                  categories,
                },
              }}
            >
              카페수정
            </Link>
          </EditCoffeeBtn>
        ) : null}
      </ContentHeader>
      <ContentPhoto>
        <Link to={`/shop/${id}`}>
          <FontAwesomeIcon icon={faCoffee} />
          <Name>{name}</Name>
        </Link>
        <Photo>
          {photos?.map((photo) => (
            <PhotoFile key={photo} src={photo.url} />
          ))}
          Categories{" "}
          {categories?.map((category, index) => {
            return (
              <div key={index}>
                <span>{category.category}</span>
              </div>
            );
          })}{" "}
        </Photo>
      </ContentPhoto>
    </Content>
  );
}

Shops.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    avatarURL: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
    })
  ),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
    })
  ),
};

export default Shops;
