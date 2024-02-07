import { formatISO } from 'date-fns';

/**
 * date를 입력받아 로컬 시간의 YYYY-MM-DD 형식으로 변환하여 반환합니다.
 * @param date
 * @returns
 */
const dateToString = (date: Date) => {
  return formatISO(new Date(date), {
    representation: 'date',
  });
};

export default dateToString;
