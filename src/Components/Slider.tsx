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

interface ISliderProps {
  title: string;
  category: string;
  results: any;
  program: string;
}

// 한번에 보여주고 싶은 영화 수
const offset = 6;

// props는 title, category, results, program
function Slider(props: ISliderProps) {
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
      //  영화 총 개수
      const totalMovies = data.length - 1;
      //   page가 0에서 시작하기 때문에 maxIndex도 1감소
      const maxIndex = Math.floor(totalMovies / offset) - 1;

      //  증가시키려고 하는 index가 이미 maxIndex였다면 0, 그렇지않으면 +1
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
                <Box key={program.id}>
                  <img src={makeImagePath(program.poster_path, "w500")} />
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
