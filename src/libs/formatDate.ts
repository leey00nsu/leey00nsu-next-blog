/**
 * date를 입력받아 한국 시간으로 변환된 문자열로 반환합니다.
 * @param date
 * @returns 한국 시간으로 변환된 문자열 ex) 2024년 1월 1일 금요일
 */
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('ko', { dateStyle: 'full' }).format(date);
};

export default formatDate;
