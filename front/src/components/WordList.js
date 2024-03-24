import {Link} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {memebookApi} from "../util/memebookApi";
function WordList() {
  const [libraryData, setLibraryData] = useState();

  useEffect(() => {
    async function libraryList() {
      try {
        const libraryApi = await memebookApi.wordList('KOR');
        setLibraryData(libraryApi.data.data.content);
        console.log(libraryApi.data.data.content)
      } catch (error) {
        console.log(error)
      }
    }
    libraryList();
  }, []);


  return (
    <ul className="word_wrap">
      <li className="word_box">
        <h3 className="word_tit">ㄴ</h3>
        <ul className="word_list">
          {
            libraryData?.map((item) => {
              return (
                <li>
                  <Link to="/word/1" className="item">{item.wordContent}</Link>
                </li>
              )
            })
          }
        </ul>
      </li>
    </ul>
  );
}

export default WordList;
