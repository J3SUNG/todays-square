/**
 * 날짜 형식화 함수
 * @param dateString 변환할 날짜 문자열
 * @returns 형식화된 날짜 문자열
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

/**
 * 텍스트 길이 제한 함수
 * @param text 원본 텍스트
 * @param maxLength 최대 길이
 * @returns 잘린 텍스트
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

/**
 * 에러 메시지 추출 함수
 * @param error 에러 객체
 * @returns 에러 메시지
 */
export const getErrorMessage = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  if (error.message) return error.message;
  return '알 수 없는 오류가 발생했습니다.';
};

/**
 * 유효성 검사 함수
 */
export const validators = {
  required: (value: string) => value.trim() !== '' ? '' : '필수 입력 항목입니다.',
  email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : '올바른 이메일 형식이 아닙니다.',
  minLength: (length: number) => (value: string) => 
    value.length >= length ? '' : `최소 ${length}자 이상 입력해주세요.`,
  maxLength: (length: number) => (value: string) => 
    value.length <= length ? '' : `최대 ${length}자까지 입력 가능합니다.`
};
