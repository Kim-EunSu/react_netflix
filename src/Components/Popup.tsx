// import styled from "styled-components";
// import { motion, AnimatePresence, useScroll } from "framer-motion";
// import { useMatch, useNavigate } from "react-router-dom";
// import { makeImagePath } from "../utils";

// const Overlay = styled(motion.div)`
//   position: fixed;
//   top: 0;
//   width: 100%;
//   height: 100%;
//   /* background-color: rgb(143, 180, 76, 0.5); */
//   background-color: rgb(0, 0, 0, 0.5);
//   opacity: 0;
// `;

// const BigMovie = styled(motion.div)`
//   position: absolute;
//   width: 40vw;
//   height: 80vh;
//   background-color: ${(props) => props.theme.black.lighter};
//   left: 0;
//   right: 0;
//   margin: 0 auto;
//   border-radius: 15px;
//   overflow: hidden;
//   z-index: 10;
// `;

// const BigCover = styled.div`
//   width: 100%;
//   height: 300px;
//   background-size: cover;
//   background-position: top center;
// `;

// const BigContainer = styled.div`
//   position: relative;
//   padding: 20px;
//   top: -60px;
//   color: ${(props) => props.theme.white.lighter};
// `;

// const BigTitle = styled.h3`
//   font-size: 30px;
//   font-weight: 400;
//   padding-bottom: 15px;
// `;

// const BigRelease = styled.p`
//   font-size: 20px;
//   margin-bottom: 15px;
// `;

// const BigOverview = styled.p`
//   font-size: 18px;
//   margin-bottom: 50px;
// `;

// const BigSimilar = styled.div`
//   font-size: 20px;
// `;

// interface IPopDetail {
//   data: any;
//   cate: string;
//   links: string;
// }

// function Popup({ data, cate, links }: IPopDetail) {
//   const bigMovieMatch = useMatch(`${links}/:id`);
//   // console.log(bigMovieMatch);

//   const navigate = useNavigate();

//   //스크롤을 해도 영화정보칸은 가운데에 나오게하기
//   const { scrollY } = useScroll();

//   const onOverlayClicked = () => {
//     navigate(-1);
//   };

//   //영화를 누르면 정보나오는것
//   const clickedMovie =
//     bigMovieMatch?.params.id &&
//     // program.id는 number, bigMovieMatch.params.movieId는 string 한쪽에 맞혀주기
//     data.find((program: any) => program.id + "" === bigMovieMatch.params.id);

//   console.log(clickedMovie);

//   return bigMovieMatch && clickedMovie ? (
//     <>
//       <Overlay
//         onClick={onOverlayClicked}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//       />
//       <BigMovie
//         style={{
//           top: scrollY.get() + 100,
//         }}
//         layoutId={bigMovieMatch?.params.id + cate}
//       >
//         {clickedMovie && (
//           <>
//             <BigCover
//               style={{
//                 backgroundImage: `linear-gradient(transparent, black),url(${makeImagePath(
//                   clickedMovie.backdrop_path,
//                   "w500"
//                 )})`,
//               }}
//             />
//             <BigContainer>
//               <BigTitle> {clickedMovie.title}</BigTitle>
//               <BigRelease> 개봉일: {clickedMovie.release_date}</BigRelease>
//               <BigOverview> 줄거리: {clickedMovie.overview}</BigOverview>
//               <BigSimilar>비슷한 컨텐츠</BigSimilar>
//             </BigContainer>
//           </>
//         )}
//       </BigMovie>
//     </>
//   ) : null;
// }

// export default Popup;

import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion, useScroll } from "framer-motion";
import { makeImagePath } from "../utils";
import { useState } from "react";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 10;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 15px;
  overflow: hidden;
`;

const BigCover = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
`;
const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 46px;
  position: relative;
  top: -60px;
`;
const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -60px;
  color: ${(props) => props.theme.white.lighter};
`;

interface IPop {
  cate: string;
  links: string;
  data: any;
}

function PopUp({ data, cate, links }: IPop) {
  const bigMatch = useMatch(`${links}/:id`);
  const navigate = useNavigate();
  const onOverlayClick = () => {
    navigate(-1);
  };
  const { scrollY } = useScroll();
  const clickedProgram =
    bigMatch?.params.id &&
    data.find((program: any) => program.id + "" === bigMatch.params.id);

  console.log(bigMatch);

  return bigMatch && clickedProgram ? (
    <>
      <Overlay
        onClick={onOverlayClick}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <BigMovie
        style={{
          top: scrollY.get() + 100,
        }}
        layoutId={bigMatch?.params.id + cate}
      >
        {clickedProgram && (
          <>
            <BigCover
              style={{
                backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                  clickedProgram.backdrop_path,
                  "w500"
                )})`,
              }}
            />
            <BigTitle>{clickedProgram.title || clickedProgram.name}</BigTitle>
            <BigOverview>{clickedProgram.overview}</BigOverview>
          </>
        )}
      </BigMovie>
    </>
  ) : null;
}

export default PopUp;
