import React from 'react'

import "../styles/Login.scss";
const Login = () => {
  return (
    <div className="login__container">

        <div className="login__text">
          <h1>Sign in to Chat</h1>
        </div>

        <button type="submit" onClick={() => console.log('signin')} className="login__button">
          SignIn with Google
        </button>
      </div>
  )
}

export default Login
