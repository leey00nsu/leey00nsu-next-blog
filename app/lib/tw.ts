import { ClassNameValue, twJoin, twMerge } from 'tailwind-merge';

// twJoin 후 twMerge를 통해 중복된 클래스를 제거하는 함수
const tw = (...inputs: ClassNameValue[]) => {
  return twMerge(twJoin(inputs));
};

export default tw;
