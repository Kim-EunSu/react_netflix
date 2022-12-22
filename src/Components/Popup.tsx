import styled from "styled-components";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(143, 180, 76, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  background-color: red;
  top: scrollY.get() + 100;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

function Popup() {
  const navigate = useNavigate();

  const bigMovieMatch = useMatch("/movies/:movieId");
  // console.log(bigMovieMatch);

  //스크롤을 해도 영화정보칸은 가운데에 나오게하기
  const { scrollY } = useScroll();

  const onOverlayClicked = () => {
    navigate(-1);
  };

  return (
    <AnimatePresence>
      {bigMovieMatch ? (
        <>
          <Overlay
            onClick={onOverlayClicked}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <BigMovie
            style={{ top: scrollY.get() + 100 }}
            layoutId={bigMovieMatch.params.movieId}
          />
        </>
      ) : null}
    </AnimatePresence>
  );
}

export default Popup;
