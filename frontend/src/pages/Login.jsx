import React from 'react'

function Login() {
  return (
    <div>
      <div>
        <h1>Login Page</h1>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Login</button>
        <p>Don't have an account? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  )
}

export default Login
