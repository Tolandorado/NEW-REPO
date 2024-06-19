import { useSelector } from 'react-redux'
import { Route, Routes, Navigate } from 'react-router-dom'
import Register from '../components/register'
import Login  from '../components/login'
import Home from '../components/homePage/home'
import ResumeForm from '../components/resumeForm'
import ResumesList from '../components/resumesList'
import styles from './index.module.scss';

function App() {
const user = useSelector((state) => state.user)
console.log(user)
  return (
    <div className={styles.container}>
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
    </div>
    
  )
}

export default App
