import { useSelector } from 'react-redux'
import { Route, Routes, Navigate } from 'react-router-dom'
import Register from '../components/register'
import Login  from '../components/login'
import Home from '../components/home'
import ResumeForm from '../components/resumeForm'
import ResumesList from '../components/resumesList'

function App() {
const user = useSelector((state) => state.user)
console.log(user)
  return (
    <>
   <Routes>
        {/* Маршрут для регистрации, доступный только если пользователь не авторизован */}
        <Route 
          path="/register" 
          element={user.access === false ? <Register /> : <Navigate to="/" />} 
        />
        {/* Маршрут для регистрации, доступный только если пользователь не авторизован */}
        <Route 
          path="/login" 
          element={user.access === false ? <Login /> : <Navigate to="/" />} 
        />
        {/* Маршрут для домашней страницы, доступный только если пользователь авторизован */}
        <Route 
          path="/" 
          element={user.access === true ? <Home /> : <Navigate to="/register" />} 
        />
        <Route 
          path='/add-resume'
          element={<ResumeForm />}/>
        <Route 
          path='/resumes-list'
          element={<ResumesList />}/>
      </Routes>
    </>
    
  )
}

export default App
