const API_KEY = "c0567696bc620eac81b5e3baab58ee88";
const BASE_PATH = "https://api.themoviedb.org/3/";
const LANGUAGE = "ko-KO";
const REGION = "KR";
const TAIL_PATH = `api_key=${API_KEY}&language${LANGUAGE}=${REGION}`;

//getSearch의  result타입
export interface ISearch {
  id: number;
  media_type: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: number;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

//getSearch의 타입
export interface IGetSearch {
  page: number;
  results: ISearch[];
  total_pages: number;
  total_results: number;
}

//getTopRated의 result타입
export interface ITop {
  backdrop_path: string;
  first_air_date: number;
  id: number;
  name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
}

//getTopRated의 타입
export interface IgetTopRated {
  page: number;
  results: [];
  total_pages: number;
  total_results: number;
}

// getTvs의 타입의 results타입
export interface ITv {
  backdrop_path: string;
  first_air_date: number;
  id: number;
  name: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

// getTvs의 타입
export interface IGetTvResults {
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}

//getDtail의 타입
export interface IDetail {
  genres: {
    id: number;
    name: string;
  };
  id: number;
  poster_path: string;
  overview: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ICome {
  backdrop_path: string;
  id: number;
  popularity: number;
  poster_path: string;
  release_date: number;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

//getupComing의 타입
export interface IGetComing {
  dates: {
    maximum: number;
    minimum: number;
  };
  results: ICome[];
}

// getPopular의 타입
export interface IGetPopular {
  results: {
    id: number;
    backdrop_path: string;
    release_date: number;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  };
}

export interface IMovie {
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  backdrop_path: string;
  poster_path: string;
  release_date: number;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IGetMovie {
  dates: {
    maximum: number;
    minimum: number;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

//GET /movie/now_playing
export function getMovies() {
  return fetch(`${BASE_PATH}movie/now_playing?${TAIL_PATH}`).then((response) =>
    response.json()
  );
}

//GET /movie/popular
export function getPopular() {
  return fetch(`${BASE_PATH}movie/popular?${TAIL_PATH}`).then((response) =>
    response.json()
  );
}

//GET /movie/upcoming
export function getupComing() {
  return fetch(`${BASE_PATH}movie/upcoming?${TAIL_PATH}`).then((response) =>
    response.json()
  );
}

//GETDETAIL /movie/{movie_id}
// https://api.themoviedb.org/3/movie/19995?api_key=c0567696bc620eac81b5e3baab58ee88&language=ko-KO
export function getDetail(movieId: string) {
  return fetch(`${BASE_PATH}movie/${movieId}?${TAIL_PATH}`).then((response) =>
    response.json()
  );
}

//GET /tv/popular
// https://api.themoviedb.org/3/tv/on_the_air?api_key=c0567696bc620eac81b5e3baab58ee88&language=ko-KO&page=1
export function getTvs() {
  return fetch(`${BASE_PATH}tv/popular?${TAIL_PATH}`).then((response) =>
    response.json()
  );
}

//GET /tv/top_rated
//https://api.themoviedb.org/3/tv/top_rated?api_key=c0567696bc620eac81b5e3baab58ee88&language=Ko&page=1
export function getTopRated() {
  return fetch(`${BASE_PATH}tv/top_rated?${TAIL_PATH}`).then((response) =>
    response.json()
  );
}

//GET /search/multi
// https://api.themoviedb.org/3/search/multi?api_key=c0567696bc620eac81b5e3baab58ee88&language=ko-KO&query=Avatar&page=1&include_adult=false&region=KR
export function getSearch(keyword: string | null) {
  return fetch(`${BASE_PATH}search/multi?${TAIL_PATH}&query=${keyword}`).then(
    (response) => response.json()
  );
}
