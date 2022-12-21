import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import useWindowDimensions from "./useWidowDimensions";
import { makeImagePath } from ".././utils";

const SWrapper = styled.div`
  position: relative;
  top: -40px;
  margin-bottom: 300px;
`;

const SliderTitle = styled.div`
  font-size: 40px;
  font-weight: 700;
  padding-left: 85px;
`;

const Row = styled(motion.div)`
  background-color: black;
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  padding: 0 85px;
`;

const Box = styled(motion.div)`
  background-color: white;
  color: red;
  height: 200px;
  text-align: center;
  font-size: 30px;
  cursor: pointer;
  background-size: cover;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    margin: 0;
  }
`;

const ButtonArea = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 115px;
  padding: 0px 1%;
`;

const Button = styled(motion.button)`
  width: 50px;
  height: 50px;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  z-index: 10;
  svg {
    width: 100%;
    height: 100%;
    z-index: 20;
    fill: rgba(255, 255, 255, 1);
  }
`;

const Info = styled(motion.div)`
  padding: 20px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const BoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duration: 0.3,
    },
  },
};

const BtnVariants = {
  normal: {
    opacity: 0.5,
  },
  hover: {
    opacity: 1,
  },
};

const rowVariants = {
  hidden: (back: boolean) => ({
    x: back ? -window.innerWidth : window.innerWidth,
  }),
  visible: {
    x: 0,
    tranition: {
      duration: 0.3,
    },
  },
  exit: (back: boolean) => ({
    x: back ? window.innerWidth : -window.innerWidth,
    tranition: {
      duration: 1,
    },
  }),
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.3,
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

function Sliders(props: ISlider) {
  const data = props.results;

  //겹침현상 해결해주는 함수
  const width = useWindowDimensions();

  // Slider의 다음 페이지로 넘어갈수 있게 하는 기능 만들기(index때문에)
  const [index, setIndex] = useState(0);

  // 화살표 아이콘 눌렀을 때 방향상태 설정하기
  const [back, setBack] = useState(false);

  // index를 증가시키는 함수, 오른쪽 화살표 버튼
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();

      setBack(false);

      const totalMovie = data.length - 1;
      const maxIndex = Math.floor(totalMovie / offset) - 1;

      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  // 왼쪽 화살표 버튼
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();

      setBack(true);

      const totalMovie = data.length - 1;
      const maxIndex = Math.floor(totalMovie / offset) - 1;

      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  // Row를 클릭했을때 겹치는 현상 없애주는 함수
  const [leaving, setLeaving] = useState(false);

  // onExitComplete(exit끝났을때 실행)를 실행시키는 함수
  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <>
      <SWrapper>
        <SliderTitle>{props.title}</SliderTitle>
        {/* toggleLeaving을 호출하면 leaving은 true가 되고 exit이 끝났을 때 toggleLeaving을 호출하면 leaving은 false가 됨 */}
        {/* initial={false}를 줌으로써 제자리에서 움직임 */}
        <AnimatePresence
          custom={back}
          initial={false}
          onExitComplete={toggleLeaving}
        >
          <Row
            custom={back}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
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
                  <Info variants={infoVariants}>
                    <h4>{program.title}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
        <ButtonArea>
          <Button
            onClick={decreaseIndex}
            variants={BtnVariants}
            initial="normal"
            whileHover="hover"
          >
            <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
              <path d="M39.3756,48.0022l30.47-25.39a6.0035,6.0035,0,0,0-7.6878-9.223L26.1563,43.3906a6.0092,6.0092,0,0,0,0,9.2231L62.1578,82.615a6.0035,6.0035,0,0,0,7.6878-9.2231Z" />
            </svg>
          </Button>
          <Button
            onClick={increaseIndex}
            variants={BtnVariants}
            initial="normal"
            whileHover="hover"
          >
            <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
              <path d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z" />
            </svg>
          </Button>
        </ButtonArea>
      </SWrapper>
    </>
  );
}

export default Sliders;
