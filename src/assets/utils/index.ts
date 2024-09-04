export function formatDate(date: Date | string) {
  const convertData = new Date(date);
  const year = convertData.getFullYear();
  const month = String(convertData.getMonth() + 1).padStart(2, '0');
  const day = String(convertData.getDate()).padStart(2, '0');
  const result = `${year}-${month}-${day}`;
  console.log('result = ',result);
  return result
}

// 세션 데이터 파싱
export function getSessionData(name: string) {
  const sessionData = sessionStorage.getItem(name);
  try{
    if(sessionData) {
      return JSON.parse(sessionData);
    }
  } catch (error) {
    console.log('세션 데이터 추출 실패', error)
  }
}

// 워크스페이스 DB 저장용 코드 생성
export function makeWorkspaceCode(userId: string, selectedDate: string): string {
  if(userId && selectedDate) {
    return `${userId}-${selectedDate}`;
  } else {
    console.log('코드 생성 실패');
    return '';
  }
}
// 워크스페이스에서 불러온 코드 스플리터
export function splitWorkspaceCode(code: string) {
  if(code) {
    const splitData = code.split('-');
    const data = {
      user_id: splitData[0],
      date: splitData[1]
    };
    return data;
  }
}