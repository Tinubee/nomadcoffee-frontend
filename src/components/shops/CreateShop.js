import { gql, useMutation } from "@apollo/client";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import routes from "../../routes";
import { Button, Input } from "../../styles";

const CREATE_COFFEE_SHOP_MUTATION = gql`
  mutation createCoffeeShop($name: String!, $caption: String, $file: Upload) {
    createCoffeeShop(name: $name, caption: $caption, file: $file) {
      id
    }
  }
`;

const Titletext = styled.div`
  font-size: large;
  font-weight: 600;
`;

function CreateShop() {
  const [photoFile, setPhotoFile] = useState([]);
  const onLoadFile = (e) => {
    const file = e.target.files;
    setPhotoFile(file);
  };

  const { register, handleSubmit, formState, setError } = useForm({
    mode: "onChange",
  });

  const onCompleted = (data) => {
    const {
      createCoffeeShop: { id },
    } = data;
    if (!id) {
      return setError("result", {
        message: "Error creating shop",
      });
    }
    window.location.reload();
  };

  const [createCoffeeShop, { loading }] = useMutation(
    CREATE_COFFEE_SHOP_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmitValid = async (data) => {
    const { name, caption } = data;
    if (loading) {
      return;
    }
    await createCoffeeShop({
      variables: {
        name,
        caption,
        file: photoFile[0],
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitValid)}>
      <Titletext>
        <FontAwesomeIcon icon={faCoffee} />
        카페이름을 입력해주세요.
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
        카테고리를 입력해주세요.
      </Titletext>
      <Input
        ref={register({ required: "필수사항 입니다." })}
        name="caption"
        type="text"
        placeholder="coffee categories"
        autoComplete="off"
      />
      <Titletext>
        <FontAwesomeIcon icon={faCoffee} />
        카페 대표사진을 등록해주세요.
      </Titletext>
      <Input
        ref={register({ required: "필수사항 입니다." })}
        name="file"
        type="file"
        multiple
        onChange={onLoadFile}
      />
      <Button
        type="submit"
        value={loading ? "생성중..." : "카페 만들기"}
        disabled={!formState.isValid || loading}
      />
      <Link to={routes.home}>
        <Button type="submit" value={"취소"} />
      </Link>
    </form>
  );
}

export default CreateShop;
