import React from 'react';
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import {useDispatch} from "react-redux";
import {userIdxAction} from "../../util/action";
import {memebookApi} from "../../util/memebookApi";

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
            memebookApi().loginApi({
              "code": userIdx
            });
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