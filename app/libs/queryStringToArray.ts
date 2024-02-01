/**
 * 쿼리스트링을 배열로 변환합니다.
 * @param input
 * @returns
 */
const queryStringToArray = (input: string | string[] | undefined) => {
  if (!input) return [];
  if (Array.isArray(input)) return input;
  return [input];
};

export default queryStringToArray;
