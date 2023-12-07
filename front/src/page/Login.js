import React from 'react';
import { GoogleLogin } from 'react-google-login';

export default function YourComponent() {
  const responseGoogle = (response) => {
    console.log(response);
    console.log('성공');
  }

  const errorGoogle = (response) => {
    console.log(response);
    console.log('실패');
  }

  return (
    <div>
      <GoogleLogin
        clientId="737922215512-imhvrh23ct18vvnt3q4ldd95h3aca43r.apps.googleusercontent.com"
        buttonText="Google로 로그인"
        onSuccess={responseGoogle}
        onFailure={errorGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

