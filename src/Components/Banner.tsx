import styled from "styled-components";
import { makeImagePath } from "../utils";

const Wrapper = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  padding: 60px;
`;

const Title = styled.h2`
  font-size: 40px;
  margin-bottom: 10px;
`;

const OverView = styled.p`
  font-size: 20px;
  width: 50%;
`;

interface IBanner {
  bgPhoto: string;
  title?: string;
  OverView?: string;
}

function Banner(props: IBanner) {
  return (
    <Wrapper bgPhoto={props.bgPhoto}>
      <Title>{props.title}</Title>
      <OverView>{props.OverView}</OverView>
    </Wrapper>
  );
}

export default Banner;
