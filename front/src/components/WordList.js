import {Link} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {memebookApi} from "../util/memebookApi";
import {debounce} from 'lodash';

function WordList() {
  const [pageNumber, setPageNumber] = useState(1);
  const [libraryData, setLibraryData] = useState();

  useEffect(() => {
    async function libraryList() {
      try {
        const libraryApi = await memebookApi.wordList('KOR', pageNumber);
        setLibraryData(libraryApi.data.data.content);
        console.log(pageNumber)
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
    <ul className="word_wrap">
      <li className="word_box">
        <h3 className="word_tit">ㄴ</h3>
        <ul className="word_list">
          {
            libraryData?.map((item, idx) => {
              return (
                <li>
                  <Link to="/word/1" className="item" key={idx}>{item.wordContent}</Link>
                </li>
              )
            })
          }
        </ul>
        <button type="button" onClick={pageMore}>더보기</button>
      </li>
    </ul>
  );
}

export default WordList;
