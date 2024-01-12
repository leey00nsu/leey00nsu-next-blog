const parseImagePath = (url: string, src: string) => {
  const fileName = src.split('/').pop();
  const path = `/posts/${url}/${fileName}`;

  return path;
};

export default parseImagePath;
