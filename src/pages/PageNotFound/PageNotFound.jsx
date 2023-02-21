import React from 'react'
import { Link } from 'react-router-dom'
function PageNotFound() {
  return (
    <>
    <div className="h-screen bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-300 via-green-400 to-rose-700">
      <div className="text-center flex justify-center h-screen items-center">
        <div className="max-w-lg ">
          <h1 className="text-8xl font-bold mb-8">Oops!</h1>
          <p className="text-5xl mb-8">404 - Page Not Found!</p>
          <Link className="bg-blue-400 shadow-xl p-2.5 rounded" to="/">Home Page</Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default PageNotFound