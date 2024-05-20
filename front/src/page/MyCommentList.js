import '../scss/page/myAddList.scss'
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {postCommentData} from "../util/action/communityAction";
import Title from "../components/Title";
export default function myCommentList() {
  // const dispatch = useDispatch();
  // const myCommentList = useSelector(state => state.meme.myCommentList);
  // const [memberIdx, setMemberIdx] = useState(321);
  //
  // useEffect(() => {
  //   async function myCommentListApi() {
  //     try {
  //       dispatch(postCommentData(memberIdx));
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   myCommentListApi();
  // }, []);

  return (
    <div className="my_word_wrap">

      <Title title="작성한 댓글" type="back"></Title>

      <div className="container">
      </div>

    </div>
  );
}
