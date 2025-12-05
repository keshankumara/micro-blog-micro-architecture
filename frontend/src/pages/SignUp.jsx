import React from 'react'

function SignUp() {
  return (
    <div>
        <div>
        <h1>Sign Up Page</h1>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Sign Up</button>
        <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      
    </div>
  )
}

export default SignUp
