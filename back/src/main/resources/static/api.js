const WORD_BASE_URL = '/api/v1/word';
const MEMBER_BASE_URL = '/api/v1/member';

// GET
const get = async (url) => {
  const response = await fetch(url)
  return await response.json()
}


// POST
const post = async (url, body) => {
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({...body})
  }

  const response = await fetch(url, options)
  return await response.json()
}


// 단어 리스트 가져오기
const getWordList = async ({nationCode='ALL'}) => {
  const page = getElementById('page').value
  const pageSize = getElementById('pageSize').value;

  const url = `${WORD_BASE_URL}/list/${nationCode}?page=${page}&pageSize=${pageSize}`;
  const response = await get(url);
  createWordList(response.data);
}


// 단어 등록하기
const postWord = async () => {
  const url = `${WORD_BASE_URL}/create`

  const body = getTargetWordInfo();

  const response = await post(url, body)
  alertByCreateWord(response.data)
}


// 회원 가입하기
const createMember = async () => {
  const url = `${MEMBER_BASE_URL}/create`
  const body = getTargetMemberInfo();

  const response = await post(url, body)
  alert('신규 회원 가입 완료');
}