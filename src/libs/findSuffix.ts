/**
 * target 문자열에서 base 문자열을 찾아서 base 문자열 이후의 문자열을 반환합니다.
 * @param target
 * @param base
 * @returns
 */
const findSuffix = (target: string, base: string) => {
  if (target.startsWith(base)) {
    return target.slice(base.length);
  }

  return '';
};

export default findSuffix;
