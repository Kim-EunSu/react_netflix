import { useLocation } from "react-router-dom";

function Search() {
  // 1. keyword에 먼저 접근하므로 keyword를 가져와야함
  const location = useLocation();

  // 2. keyword 받아오기
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log(keyword);

  return null;
}

export default Search;
