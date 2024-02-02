import { ClassNameValue, twJoin, twMerge } from 'tailwind-merge';

/**
 *
 * twJoin 함수를 통해 입력받은 클래스를 합친 후 twMerge 함수를 통해 중복된 클래스를 제거합니다.
 * @param inputs
 * @returns
 */
const tw = (...inputs: ClassNameValue[]) => {
  return twMerge(twJoin(inputs));
};

export default tw;
