import { useState } from 'react'
import Register from '../components/register'
import { useSelector } from 'react-redux'

function App() {
const user = useSelector((state) => state.user)
console.log(user)
  return (
    <>
    { user.access == false ? (
      <Register/>
    ) : (
      <div></div>
    )}
    </>
    
  )
}

export default App
