import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import useWindowDimensions from "./useWidowDimensions";
import { makeImagePath } from ".././utils";

const SWrapper = styled.div`
  position: relative;
  top: -40px;
`;

const Row = styled(motion.div)`
  background-color: black;
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)`
  background-color: white;
  color: red;
  height: 200px;
  font-size: 30px;
  background-size: cover;
  img {
    width: 100%;
    /* height: 100%; */
    object-fit: cover;
    margin: 0;
  }
`;

const Button = styled.div`
  width: 50px;
  height: 50px;
  background: none;
  border: none;
`;

const BoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    transition: {
      delay: 0.3,
    },
  },
};

// 한번에 보여주고 싶은 영화 수
const offset = 6;

interface ISlider {
  title: string;
  results: any;
  category: string;
  program: string;
}

function Slider(props: ISlider) {
  const data = props.results;

  //겹침현상 해결해주는 함수
  const width = useWindowDimensions();

  // Slider의 다음 페이지로 넘어갈수 있게 하는 기능 만들기(index때문에)
  const [index, setIndex] = useState(0);

  // index를 증가시키는 함수
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();

      const totalMovie = data.length - 1;
      const maxIndex = Math.floor(totalMovie / offset) - 1;

      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  // Row를 클릭했을때 겹치는 현상 없애주는 함수
  const [leaving, setLeaving] = useState(false);

  // onExitComplete(exit끝났을때 실행)를 실행시키는 함수
  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <>
      <SWrapper>
        {/* toggleLeaving을 호출하면 leaving은 true가 되고 exit이 끝났을 때 toggleLeaving을 호출하면 leaving은 false가 됨 */}
        {/* initial={false}를 줌으로써 제자리에서 움직임 */}
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            onClick={increaseIndex}
            //variants={rowVariants}
            // initial="hidden"
            // animate="visible"
            // exit="exit"
            initial={{ x: width + 10 }}
            animate={{ x: 0 }}
            exit={{ x: -width - 10 }}
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            {props.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((program: any) => (
                <Box
                  variants={BoxVariants}
                  initial="normal"
                  whileHover="hover"
                  key={program.id}
                >
                  <img
                    src={makeImagePath(program.poster_path, "w500")}
                    alt={program.title}
                  />
                </Box>
              ))}
          </Row>
        </AnimatePresence>
        {/* <Button ></Button> */}
      </SWrapper>
    </>
  );
}

export default Slider;
