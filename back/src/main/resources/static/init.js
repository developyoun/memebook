/**
 * 엘레먼트 초기화
 */
const initializeElement = (id, event, action='click') => {
  const element = document.querySelector(`#${id}`);
  element.addEventListener(action, event);
  return element;
}

/**
 * 단어 데이터 정보 수집
 */
const getTargetWordInfo = () => {
  const originWord = document.querySelector('#originWord').value;
  const resultWord = document.querySelector('#resultWord').value;
  const wordNation = document.querySelector('#wordNation').value;
  return {
    originWord, resultWord, wordNation
  }
}

const getTargetMemberInfo = () => {
  const memberId = document.querySelector('#memberId').value;
  const memberPw = document.querySelector('#memberPassword').value;
  const nickname = document.querySelector('#nickname').value;
  const nationCode = document.querySelector('#nationCode').value;
  return {
    memberId, memberPw, nickname, nationCode
  }
}

/**
 * 초기 렌더링시 실행
 */
document.addEventListener('DOMContentLoaded', () => {
  initializeElement('getDataList', () => getWordList({}));
  initializeElement('submitWord', () => postWord());
  initializeElement('createMember', () => createMember());
})