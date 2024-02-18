## ✅ API 문서

| 분류 | URL                        | 메소드 | 설명             | 비고                                               |
| ---- | -------------------------- | ------ | ---------------- | -------------------------------------------------- |
| 회원 | api/member/create/nickname | POST   | 닉네임 생성      | - nickname                                         |
| 회원 | api/member/exist/nickname  | GET    | 닉네임 중복 조회 | - nickname                                         |
| 회원 | api/member/nation          | GET    | 회원 국가 조회   | - memberIdx                                        |
| 회원 | *api/member/update/nation* | PUT    | 회원 국가 변경   | - memberIdx<br />- originNation<br />- tagetNation |
| 단어 | *api/word/list*            | GET    | 단어 리스트 조회 |                                                    |
| 단어 | *api/word/create*          | POST   | 단어 생성        |                                                    |
| 단어 | *api/word/update*          | PUT    | 단어 수정        |                                                    |

### ✨회원

#### 1. 회원 닉네임 생성

##### URL: ***api/member/create/nickname?nickname={nickname}***

##### Method: **POST**

##### Reqeust Parameter

| 파리미터 | 타입   | 설명                  | 비고   |
| -------- | ------ | --------------------- | ------ |
| nickname | String | 생성하고자하는 닉네임 | 필수값 |

##### Response Body: 

``````json
{
  "status": "OK",
  "message": "Success",
  "data": {
    "nickname": "닉네임"
  }
}
``````



#### 2. 닉네임 중복 조회

##### URL: ***api/member/exist/nickname?nickname={nickname}***

##### Method: **GET**

##### Reqeust Parameter

| 파리미터 | 타입   | 설명                       | 비고   |
| -------- | ------ | -------------------------- | ------ |
| nickname | String | 중복체크하고자 하는 닉네임 | 필수값 |

##### Response Body: 

``````json
{
  "status": "OK",
  "message": "Success",
  "data": true (또는 false)
}
``````



#### 3. 회원 국가 조회

##### URL: ***api/member/nation?memberIdx={memberIdx}***

##### Method: **GET**

##### Reqeust Parameter

| 파리미터  | 타입 | 설명                 | 비고   |
| --------- | ---- | -------------------- | ------ |
| memberIdx | Long | 조회하려는 회원 번호 | 필수값 |

##### Response Body: 

``````json
{
  "status": "OK",
  "message": "Success",
  "data": {
    "memberIdx": 123123,
    "originNation": "KOR",
    "targetNation": "JPN"
  }
}
``````

#### 4. 회원 국가 변경

##### URL: ***api/member/update/nation?memberIdx={memberIdx}&originNation={originNation}&targetNation={targetNation}***

##### Method: **PUT**

##### Reqeust Parameter

| 파리미터     | 타입   | 설명           | 비고   |
| ------------ | ------ | -------------- | ------ |
| memberIdx    | Long   | 대상 회원 번호 | 필수값 |
| originNation | String | 자신의 국가    | 필수값 |
| targetNation | String | 대상 국가      | 필수값 |

##### Response Body: 

``````json
{
  "status": "OK",
  "message": "Success",
  "data": {
    "memberIdx": 123123,
    "originNation": "KOR",
    "targetNation": "JPN"
  }
}
``````

### ✨ 단어

#### 5. 단어 리스트 조회

##### URL: ***api/word/list/{nation}***

##### Method: **GET**

##### Reqeust Parameter

| 파리미터 | 타입   | 설명      | 비고              |
| -------- | ------ | --------- | ----------------- |
| nation   | String | 조회 국가 | 기본값: ***ALL*** |

##### Response Body: 

``````json
{
  "status": "OK",
  "message": "Success",
  "data": {
    "content": [
      {
        "wordIdx": 40,
        "wordTitle": null,
        "wordContent": "aa",
        "wordNation": "KOR",
        "regMem": 0,
        "regDtm": "2023-10-09 22:01:20",
        "modMem": null,
        "modDtm": null
      },
      {
        "wordIdx": 41,
        "wordTitle": null,
        "wordContent": "asdf",
        "wordNation": "KOR",
        "regMem": 0,
        "regDtm": "2023-10-09 22:02:25",
        "modMem": null,
        "modDtm": null
      },
      ...
    ],
    "pageable": {
      "pageNumber": 0,
      "pageSize": 10,
      "sort": {
        "empty": true,
        "unsorted": true,
        "sorted": false
      },
      "offset": 0,
      "paged": true,
      "unpaged": false
    },
    "last": false,
    "totalPages": 4,
    "totalElements": 33,
    "sort": {
      "empty": true,
      "unsorted": true,
      "sorted": false
    },
    "size": 10,
    "number": 0,
    "first": true,
    "numberOfElements": 10,
    "empty": false
  }
}
``````



#### 6. 단어 등록

URL: ***api/word/create***

##### Method: **POST**

##### Reqeust Body

``````json
{
  wordTitle: "웃찾사",		// 단어명
  wordContent: "웃음을 찾는 사람들의 줄임말로 대한민국의...",		// 단어 설명
 	wordNation: "KOR",		// 단어 국가 분류
  RegMem: 123123,		// 등록 회원 번호
  ModMem: 123123,		// 수정 회원 번호 (초기 등록시, 등록 회원 번호와 동일)
}
``````

##### Response Body: 

``````json
{
  "status": "OK",
  "message": "Success",
  "data": {
		wordIdx: 123123,
    wordTitle: "웃찾사",
    wordContent: "웃음을 찾는 사람들의 줄임말로 대한민국의...",
    wordNation: "KOR",
    regMem: 123123,
    modMem: 123123,
    RegDtm: "2024-02-18 12:02:44",
		modDtm: "2024-02-18 12:02:44"
  }
}
``````

#### 7. 단어 수정

URL: ***api/word/update***

##### Method: **PUT**

##### Reqeust Body

``````json
{
  wordIdx: 119
  wordTitle: "우찻아",		// 단어명
  wordContent: "웃찾사의 후속작...",		// 단어 설명
 	wordNation: "KOR",		// 단어 국가 분류
  ModMem: 321321,		// 수정 회원 번호 (초기 등록시, 등록 회원 번호와 동일)
}
``````

##### Response Body: 

``````json
{
  "status": "OK",
  "message": "Success",
  "data": {
		wordIdx: 119,
    wordTitle: "우찾아",
    wordContent: "웃찾사의 후속작...",
    wordNation: "KOR",
    regMem: 123123,
    modMem: 321321,
    RegDtm: "2024-02-18 12:02:44",
		modDtm: "2024-02-20 09:56:53"
  }
}
``````

