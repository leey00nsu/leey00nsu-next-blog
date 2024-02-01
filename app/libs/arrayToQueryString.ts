const arrayToQueryString = (key: string, arr: string[]) => {
  return arr.map((item) => `${key}=${item}`).join('&');
};

export default arrayToQueryString;
