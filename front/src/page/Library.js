import './../scss/library.scss'
import HomeFooter from "../components/HomeFooter";
import Title from "../components/Title";
import {memebookApi} from "../util/memebookApi";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {debounce} from 'lodash';

export default function Word() {
  const [pageNumber, setPageNumber] = useState(1);
  const [libraryData, setLibraryData] = useState();

  useEffect(() => {
    async function libraryList() {
      try {
        const libraryApi = await memebookApi.wordList('ALL', pageNumber);
        setLibraryData(libraryApi.data.data.content);
        console.log(libraryData);
      } catch (error) {
        console.log(error)
      }
    }
    libraryList();
  }, []);


  const pageMore = debounce(() => {
    const nextPage = pageNumber + 1;
    const PageData = async () => {
      try {
        const libraryApi = await memebookApi.wordList('KOR', nextPage);
        setLibraryData((prevLibraryData) => [...prevLibraryData, ...libraryApi.data.data.content]);
      } catch (error) {
        console.log(error)
      }
    };
    setPageNumber(nextPage);
    PageData();
  }, 500);


  return (
    <div className="layer">

      <Title title="사전"></Title>

      <div className="container">
        <ul className="consonant_list">
          <li className="list">
            <a href="" className="link active">ㄱ</a>
          </li>
          <li className="list">
            <a href="" className="link">ㄴ</a>
          </li>
          <li className="list">
            <a href="" className="link">ㄷ</a>
          </li>
          <li className="list">
            <a href="" className="link">ㄹ</a>
          </li>
          <li className="list">
            <a href="" className="link">ㅁ</a>
          </li>
          <li className="list">
            <a href="" className="link">ㅂ</a>
          </li>
          <li className="list">
            <a href="" className="link">ㅅ</a>
          </li>
          <li className="list">
            <a href="" className="link">ㅇ</a>
          </li>
          <li className="list">
            <a href="" className="link">ㅈ</a>
          </li>
          <li className="list">
            <a href="" className="link">ㅊ</a>
          </li>
          <li className="list">
            <a href="" className="link">ㅋ</a>
          </li>
          <li className="list">
            <a href="" className="link">ㅌ</a>
          </li>
          <li className="list">
            <a href="" className="link">ㅍ</a>
          </li>
          <li className="list">
            <a href="" className="link">ㅎ</a>
          </li>
        </ul>


        <ul className="word_wrap">
          <li className="word_box">
            <h3 className="word_tit">ㄴ</h3>
            <ul className="word_list">
              {
                libraryData?.map((item, idx) => {
                  return (
                    <li>
                      <Link to={`/word/${item.wordIdx}`} className="item" key={idx}>{item.wordContent}</Link>
                    </li>
                  )
                })
              }
            </ul>
            <button type="button" onClick={pageMore}>더보기</button>
          </li>
        </ul>
      </div>

      <HomeFooter></HomeFooter>
    </div>
  );
}

