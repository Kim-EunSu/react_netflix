import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import {
  getMovies,
  IGetMovie,
  getPopular,
  IGetPopular,
  IGetComing,
  getupComing,
} from "../api";
import Banner from "../Components/Banner";
import { makeImagePath } from "../utils";
import Sliders from "../Components/Slider";

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: -200px;
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

function Home() {
  const { data: nowPlaying, isLoading: nowLoading } = useQuery<IGetMovie>(
    ["movis, nowPlaying"],
    getMovies
  );

  const { data: popular, isLoading: popLoading } = useQuery<IGetPopular>(
    ["movies, popular"],
    getPopular
  );

  const { data: coming, isLoading: comLoading } = useQuery<IGetComing>(
    ["movies, coming"],
    getupComing
  );

  return (
    <Wrapper>
      {nowLoading || popLoading || comLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(nowPlaying?.results[0].backdrop_path || "")}
            title={nowPlaying?.results[0].title}
            OverView={nowPlaying?.results[0].overview}
          />
          <SliderWrapper>
            <Sliders
              title="현재 상영중인 영화"
              category="nowPlaying"
              program="movies"
              results={nowPlaying?.results}
            />
            {/* <Sliders
              title="인기 중인 영화"
              category="popular"
              program="movies"
              results={popular?.results}
            />
            <Sliders
              title=" 상영 예정 영화"
              category="coming"
              program="movies"
              results={coming?.results}
            /> */}
          </SliderWrapper>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
