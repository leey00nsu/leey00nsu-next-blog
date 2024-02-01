const queryStringToArray = (input: string | string[] | undefined) => {
  if (!input) return [];
  if (Array.isArray(input)) return input;
  return [input];
};

export default queryStringToArray;
