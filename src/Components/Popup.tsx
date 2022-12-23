import styled from "styled-components";
import { motion, useScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { makeImagePath } from "../utils";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgb(143, 180, 76, 0.5); */
  background-color: rgb(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  background-color: ${(props) => props.theme.black.lighter};
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  z-index: 10;
`;

const BigCover = styled.div`
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: top center;
`;

const BigContainer = styled.div`
  position: relative;
  padding: 20px;
  top: -60px;
  color: ${(props) => props.theme.white.lighter};
`;

const BigTitle = styled.h3`
  font-size: 30px;
  font-weight: 400;
  padding-bottom: 15px;
`;

const BigRelease = styled.p`
  font-size: 20px;
  margin-bottom: 15px;
`;

const BigOverview = styled.p`
  font-size: 18px;
  margin-bottom: 50px;
`;

const BigSimilar = styled.div`
  font-size: 20px;
`;

interface IPopDetail {
  data: any;
  cate: string;
  links: string;
}

function Popup({ data, cate, links }: IPopDetail) {
  const bigMovieMatch = useMatch(`${links}/:id`);
  // console.log(bigMovieMatch);

  const navigate = useNavigate();

  //스크롤을 해도 영화정보칸은 가운데에 나오게하기
  const { scrollY } = useScroll();

  const onOverlayClicked = () => {
    navigate(-1);
  };

  //영화를 누르면 정보나오는것
  const clickedMovie =
    bigMovieMatch?.params.id &&
    // program.id는 number, bigMovieMatch.params.movieId는 string 한쪽에 맞혀주기
    data.find((program: any) => program.id + "" === bigMovieMatch.params.id);

  return bigMovieMatch && clickedMovie ? (
    <>
      <Overlay
        onClick={onOverlayClicked}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <BigMovie
        style={{
          top: scrollY.get() + 100,
        }}
        layoutId={bigMovieMatch?.params.id + cate}
      >
        {clickedMovie && (
          <>
            <BigCover
              style={{
                backgroundImage: `linear-gradient(transparent, black),url(${makeImagePath(
                  clickedMovie.backdrop_path,
                  "w500"
                )})`,
              }}
            />
            <BigContainer>
              <BigTitle> {clickedMovie.title}</BigTitle>
              <BigRelease> 개봉일: {clickedMovie.release_date}</BigRelease>
              <BigOverview> 줄거리: {clickedMovie.overview}</BigOverview>
              <BigSimilar>비슷한 컨텐츠</BigSimilar>
            </BigContainer>
          </>
        )}
      </BigMovie>
    </>
  ) : null;
}

export default Popup;
