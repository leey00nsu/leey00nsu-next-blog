/**
 * 배열을 입력받은 키의 쿼리스트링으로 변환합니다.
 * @param arr
 * @param key
 * @returns
 */
const arrayToQueryString = (arr: string[], key: string) => {
  return arr.map((item) => `${key}=${item}`).join('&');
};

export default arrayToQueryString;
