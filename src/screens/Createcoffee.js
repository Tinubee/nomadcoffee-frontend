import React from "react";
import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import CreateShop from "../components/shops/CreateShop";

const CreateCoffeeLayout = styled.div`
  width: 700px;
  max-width: 700px;
`;

const CreateForm = styled.div`
  width: 100%;
`;

const Createcoffee = () => {
  return (
    <CreateCoffeeLayout>
      <PageTitle title="Create a new coffee shop" />
      <CreateForm>
        <CreateShop />
      </CreateForm>
    </CreateCoffeeLayout>
  );
};

export default Createcoffee;
