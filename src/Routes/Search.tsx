import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { IGetSearch, getSearch } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Category = styled.div`
  width: 100%;
  padding: 7%;
`;

const CategoryTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 2%;
`;

const Row = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(5, auto);
  width: 100%;
  margin: auto;
`;

const Box = styled.div`
  background-color: white;
  background-position: center top;
  color: red;
  background-size: cover;
  background-position: center center;
  height: 200px;
  border-radius: 5px;
  font-size: 50px;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  background-size: cover;
`;

const Error = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorMsg = styled.h3`
  width: 50%;
  font-size: 30px;
  font-weight: 500;
  text-align: center;
`;

function Search() {
  // 1.keyword접근
  // location을 통해 정보를 얻을 수 있음
  const location = useLocation();

  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data, isLoading } = useQuery<IGetSearch>(["search", keyword], () =>
    getSearch(keyword)
  );

  // 영화로 찾은것
  const searchMovies = data?.results.filter(
    (data) => data.media_type === "movie"
  );

  // Tv로 찾은것
  const searchTv = data?.results.filter((data) => data.media_type === "tv");

  return (
    <Wrapper>
      {keyword ? (
        isLoading ? (
          <Loader>Loading...</Loader>
        ) : data?.results.length ? (
          <>
            <Category>
              <CategoryTitle>"{keyword}" 키워드를 포함하는 영화</CategoryTitle>
              <Row>
                {searchMovies?.map((program) => (
                  <Box
                    key={program.id}
                    style={{
                      backgroundImage: `url(${makeImagePath(
                        program.poster_path,
                        "w500"
                      )})`,
                    }}
                  ></Box>
                ))}
              </Row>
            </Category>
            <Category>
              <CategoryTitle>
                "{keyword}" 키워드를 포함하는 TV 프로그램
              </CategoryTitle>
              <Row>
                {searchTv?.map((program) => (
                  <Box key={program.id} style={{}}></Box>
                ))}
              </Row>
            </Category>
          </>
        ) : (
          <Error>
            <ErrorMsg>{keyword}에 대한 결과가 없습니다.</ErrorMsg>
          </Error>
        )
      ) : (
        <Error>
          <ErrorMsg>검색어를 입력해주세요</ErrorMsg>
        </Error>
      )}
    </Wrapper>
  );
}

export default Search;
