import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

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

const rowVariants = {
  hidden: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  ecit: {
    x: -window.outerWidth - 10,
  },
};

function Slider() {
  // Slider의 다음 페이지로 넘어갈수 있게 하는 기능 만들기(index때문에)
  const [index, setIndex] = useState(0);

  // index를 증가시키는 함수
  const increaseIndex = () => setIndex((prev) => prev + 1);

  return (
    <>
      <SWrapper>
        <AnimatePresence>
          <Row
            onClick={increaseIndex}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
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
