import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import EditShop from "../components/shops/EditShop";

const EditcoffeeLayout = styled.div`
  width: 700px;
  max-width: 700px;
`;

const CreateForm = styled.div`
  width: 100%;
`;

const Editcoffee = () => {
  const location = useLocation();
  return (
    <EditcoffeeLayout>
      <PageTitle title="Edit my coffee shop" />
      <CreateForm>
        <EditShop keys={location.state} />
      </CreateForm>
    </EditcoffeeLayout>
  );
};

export default Editcoffee;
