import React from 'react';
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import { LOGIN_KEY } from './../../config';

const GoogleLoginButton = () => {
  const clientId = LOGIN_KEY;

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(jwtDecode(credentialResponse.credential));
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