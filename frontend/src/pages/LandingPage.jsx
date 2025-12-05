import React from 'react'
import princess from '../assets/Images/princess.png'

function LandingPage() {
  return (
    <div className="h-screen w-full bg-cover bg-center" style={{ backgroundImage: `url(${princess})` }}>
      <div className="flex flex-col items-center justify-center h-full bg-opacity-50 text-white p-4">
        <h1 className="text-5xl font-bold mb-4 text-center border-col blue">Welcome to MicroBlog</h1>
        <p className="text-xl mb-8 text-center">A simple microblogging platform to share your thoughts.</p>
        <a
          href="/home"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
        >
          Enter MicroBlog
        </a>
      </div>
    </div>
  )
}

export default LandingPage
