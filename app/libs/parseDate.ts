/**
 * date를 입력받아 한국 시간으로 변환하여 반환합니다.
 * @param date
 * @returns
 */
const parseDate = (date: string) => {
  return new Intl.DateTimeFormat('ko', { dateStyle: 'full' }).format(
    new Date(date),
  );
};

export default parseDate;
