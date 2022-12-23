import { useLocation } from "react-router-dom";

function Search() {
  // 1.keyword접근
  // location을 통해 정보를 얻을 수 있음
  const location = useLocation();

  const keyword = new URLSearchParams(location.search).get("keyword");

  console.log(keyword);

  return <div>Search</div>;
}

export default Search;
