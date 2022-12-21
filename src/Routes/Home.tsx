import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getMovies, IGetMovie } from "../api";
import Banner from "../Components/Banner";
import { makeImagePath } from "../utils";
import Slider from "../Components/Slider";

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Home() {
  const { data: nowPlaying, isLoading: nowLoading } = useQuery<IGetMovie>(
    ["movis, nowPlaying"],
    getMovies
  );

  return (
    <Wrapper>
      {nowLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(nowPlaying?.results[0].backdrop_path || "")}
            title={nowPlaying?.results[0].title}
            OverView={nowPlaying?.results[0].overview}
          />
          <Slider
            title="현재 상영중인 영화"
            category="nowPlaying"
            results={nowPlaying?.results}
            program="movies"
          />
        </>
      )}
    </Wrapper>
  );
}
export default Home;
