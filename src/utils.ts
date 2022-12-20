// 이미지 경로를 만들어주는 함수
// id랑 format만 받음!!!!
// => format이 제공된다면 format을 사용하고 없으면 원본을 사용
export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}
