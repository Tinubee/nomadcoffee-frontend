import styled from "styled-components";
import DarkMode from "../DarkMode";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const Footer = styled.div`
  margin-top: 20px;
`;

function AutoLayout({ children }) {
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
      <Footer>
        <DarkMode />
      </Footer>
    </Container>
  );
}

export default AutoLayout;
