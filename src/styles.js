import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  accent: "#0095f6",
  bgColor: "#FAFAFA",
  fontColor: "rgb(38,38,38)",
  borderColor: "rgb(219,219,219)",
};

export const darkTheme = {
  fontColor: "white",
  bgColor: "#000",
};

export const GlobalStyle = createGlobalStyle`
    ${reset}
    input {
      all:unset;
    }
    * {
      box-sizing:border-box;
    }
    body {
        background-color: ${(props) => props.theme.bgColor};
        font-size:14px;
        font-family:'Open Sans', sans-serif;
        color:${(props) => props.theme.fontColor}
    }
    a {
      text-decoration: none;
      color: inherit;
    }
`;

export const Button = styled.input`
  margin: 10px 0px;
  text-align: center;
  width: 100%;
  padding: 10px 0px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.boxShadowColor};
  font-weight: 600;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? "0.3" : "1")};
`;

export const Input = styled.input`
  margin-bottom: 10px;
  width: 100%;
  padding: 10px 10px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.boxShadowColor};
  border: 2px solid ${(props) => props.theme.boxShadowColor};
  font-weight: 600;
  ::placeholder {
    color: ${(props) => props.theme.fontColor};
    opacity: 0.5;
  }
  :focus {
    border: 2px solid ${(props) => props.theme.bgColor};
  }
`;
