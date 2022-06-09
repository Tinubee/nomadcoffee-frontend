import { gql, useMutation } from "@apollo/client";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import routes from "../../routes";
import { Button, Input } from "../../styles";

const EDIT_COFFEE_SHOP_MUTATION = gql`
  mutation editCoffeeShop($id: Int!, $name: String, $caption: String) {
    editCoffeeShop(id: $id, name: $name, caption: $caption) {
      ok
    }
  }
`;

const Titletext = styled.div`
  font-size: large;
  font-weight: 600;
`;

function EditShop(shopdata) {
  const { register, handleSubmit, formState, setError } = useForm({
    mode: "onChange",
  });

  const onCompleted = (data) => {
    const {
      editCoffeeShop: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
  };

  const [editCoffeeShop, { loading }] = useMutation(EDIT_COFFEE_SHOP_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = async (data) => {
    const { name, caption } = data;
    const id = shopdata.keys.id;
    console.log(id, data);
    if (loading) {
      return;
    }
    await editCoffeeShop({
      variables: {
        id,
        name,
        caption,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitValid)}>
      <Titletext>
        <FontAwesomeIcon icon={faCoffee} />
        현재 카페 이름 : {shopdata.keys.name}
      </Titletext>
      <Input
        ref={register({ required: "필수사항 입니다." })}
        name="name"
        type="text"
        placeholder="coffee shop name"
        autoComplete="off"
      />
      <Titletext>
        <FontAwesomeIcon icon={faCoffee} />
        현재 카테고리 : {shopdata.keys.categories[0].category}
      </Titletext>
      <Input
        ref={register({ required: "필수사항 입니다." })}
        name="caption"
        type="text"
        placeholder="coffee categories"
        autoComplete="off"
      />
      {/* <Titletext>
        <FontAwesomeIcon icon={faCoffee} />
        현재 대표사진
      </Titletext>
      <Input
        ref={register({ required: "필수사항 입니다." })}
        name="file"
        type="file"
        multiple
        onChange={onLoadFile}
      /> */}
      <Button
        type="submit"
        value={loading ? "Loading..." : "수정 완료"}
        disabled={!formState.isValid || loading}
      />
      <Link to={routes.home}>
        <Button type="submit" value={"취소"} />
      </Link>
    </form>
  );
}

export default EditShop;
