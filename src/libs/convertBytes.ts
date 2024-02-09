/**
 * bytes를 입력받아 단위에 맞게 변환하여 반환합니다.
 * @param bytes
 * @returns
 * @see https://gist.github.com/lanqy/5193417
 */
const convertBytes = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return 'n/a';

  const i = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    sizes.length - 1,
  );

  if (i === 0) return `${bytes} ${sizes[i]}`;

  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
};

export default convertBytes;
