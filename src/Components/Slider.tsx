import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import useWindowDimensions from "./useWidowDimensions";

const SWrapper = styled.div`
  position: relative;
  top: -40px;
`;

const Row = styled(motion.div)`
  background-color: black;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)`
  background-color: white;
  color: red;
  height: 200px;
  font-size: 66px;
`;

function Slider() {
  //겹침현상 해결해주는 함수
  const width = useWindowDimensions();

  // Slider의 다음 페이지로 넘어갈수 있게 하는 기능 만들기(index때문에)
  const [index, setIndex] = useState(0);

  // index를 증가시키는 함수
  const IncreaseIndex = () => {
    // 음 클릭할때는 leaving이 false이겠지만 거기서 leaving을 true로 바꾼 다음 index를 증가시키기
    if (leaving) return;
    setLeaving(true);
    setIndex((prev) => prev + 1);
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
            //variants={rowVariants}
            // initial="hidden"
            // animate="visible"
            // exit="exit"
            initial={{ x: width + 10 }}
            animate={{ x: 0 }}
            exit={{ x: -width - 10 }}
            transition={{ type: "tween", duration: 1 }}
            onClick={IncreaseIndex}
            key={index}
          >
            {[1, 2, 3, 4, 5, 6].map((el) => (
              <Box key={el}>{el}</Box>
            ))}
          </Row>
        </AnimatePresence>
      </SWrapper>
    </>
  );
}

export default Slider;
