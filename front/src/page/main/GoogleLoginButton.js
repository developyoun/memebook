import React from 'react';
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import {useDispatch} from "react-redux";
import {userIdxAction} from "../../util/action";
import {memebookApi} from "../../util/memebookApi";
import axios from "axios";

const GoogleLoginButton = () => {
  const clientId = "";
  const dispatch = useDispatch();

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={credentialResponse => {
            const userIdx = credentialResponse.credential;
            dispatch(userIdxAction(userIdx))

            const response =  axios.post('https://memebook.co.kr/auth/login', {
              "code": userIdx
            });
            const responseIdx = response.data;
            dispatch(userIdxAction(responseIdx))
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
    </>
  );
}

export default GoogleLoginButton;