import arrayToQueryString from './arrayToQueryString';

/**
 * 쿼리스트링의 해당 key에 대해 value를 토글합니다.
 * @param queryString
 * @param key
 * @param value
 * @returns
 */
const toggleQueryString = (
  queryString: string[],
  key: string,
  value: string,
) => {
  const urlParams = new URLSearchParams(arrayToQueryString(queryString, key));

  if (urlParams.has(key, value)) {
    urlParams.delete(key, value);
  } else {
    urlParams.append(key, value);
  }

  return urlParams.toString();
};

export default toggleQueryString;
