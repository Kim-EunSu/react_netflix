const API_KEY = "c0567696bc620eac81b5e3baab58ee88";
const BASE_PATH = "https://api.themoviedb.org/3/";
const LANGUAGE = "ko-KO";
const REGION = "KR";
const TAIL_PATH = `api_key=${API_KEY}&language${LANGUAGE}=${REGION}`;

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
