const API_KEY = "c0567696bc620eac81b5e3baab58ee88";
const BASE_PATH = "https://api.themoviedb.org/3/";
const LANGUAGE = "ko-KO";
const REGION = "KR";
const TAIL_PATH = `api_key=${API_KEY}&language${LANGUAGE}=${REGION}`;

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

export function getMovies() {
  return fetch(`${BASE_PATH}movie/now_playing?${TAIL_PATH}`).then((response) =>
    response.json()
  );
}
