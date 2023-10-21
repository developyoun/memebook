/**
 * 단어 리스트 생성
 */
const createWordList = (responseData) => {
  removeAllWordList()

  const wordList = responseData.content;

  wordList.forEach(word => {
    const {originWord, resultWord, wordIdx, wordNation, wordRegDtm} = word;
    const rootElement = createElement('tr')

    rootElement.append(
      createElement('td', wordIdx),
      createElement('td', originWord),
      createElement('td', resultWord),
      createElement('td', wordNation),
      createElement('td', wordRegDtm)
    );

    getElementById('wordList').appendChild(rootElement);
  })
}

/**
 * 단어 생성시 알림
 */
const alertByCreateWord = (newWord) => {
  const {originWord, resultWord} = newWord;
  const comment = `[${originWord} -> ${resultWord}] 신규 단어 생성 완료`;
  alert(comment)
}

/**
 * 기존 단어 리스트 삭제
 */
const removeAllWordList = () => {
  const elements = getElementById('wordList');

  while (elements.childElementCount > 0) {
    elements.children[0].remove()
  }
}