import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import FormBox from "../components/auth/FormBox";
import PageTitle from "../components/PageTitle";
import Shops from "../components/shops/Shops";

export const Wrapper = styled.div`
  max-width: 492px;
  min-width: 360px;
  min-height: 100%;
  min-height: 50vh;
  padding: 0 16px;
  margin: 0 auto;
`;

const SEE_COFFEE_SHOPS_QUERY = gql`
  query seeCoffeeShops($offset: Int!) {
    seeCoffeeShops(offset: $offset) {
      id
      name
      latitude
      longitude
      user {
        id
        username
        avatarURL
      }
      photos {
        url
      }
      categories {
        category
      }
    }
  }
`;

function Home() {
  const { data } = useQuery(SEE_COFFEE_SHOPS_QUERY, {
    variables: {
      offset: 0,
    },
  });

  return (
    <>
      <Wrapper>
        <PageTitle title="Home | Nomad Coffee" />
        <FormBox>
          {data?.seeCoffeeShops?.map((coffeeShop, index) => (
            <Shops key={index} {...coffeeShop} />
          ))}
        </FormBox>
      </Wrapper>
    </>
  );
}

export default Home;
