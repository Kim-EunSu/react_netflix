import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getTvs, IGetTvResults, getTopRated, IgetTopRated } from "../api";
import Banner from "../Components/Banner";
import Sliders from "../Components/Slider";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

function Tv() {
  const { data: onPopular, isLoading: popularLoading } =
    useQuery<IGetTvResults>(["Tvs, onPopular"], getTvs);

  const { data: onTop, isLoading: topLoading } = useQuery<IgetTopRated>(
    ["Tvs, onTop"],
    getTopRated
  );

  return (
    <Wrapper>
      {popularLoading || topLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(onPopular?.results[0].backdrop_path || "")}
            title={onPopular?.results[0].name}
            OverView={onPopular?.results[0].overview}
          />
          <SliderWrapper>
            <Sliders
              title="현재 인기중인 프로그램"
              results={onPopular?.results}
              category="onPopular"
              program="tv"
            />
            <Sliders
              title="평점이 높은 프로그램"
              results={onTop?.results}
              category="onTop"
              program="tv"
            />
          </SliderWrapper>
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
