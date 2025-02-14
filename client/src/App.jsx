import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import AppRoutes from './routes/AppRoutes'
import { useEffect } from 'react'
import { getAllJobs } from './services/jobApplications'

function App() {

  //remove --- just for testing
  useEffect( () => {
    const effect = async () => {
      if(localStorage.getItem('token')){
        const res = await getAllJobs(5)
        console.log(res)
      }
    }
    effect();
  }, []);

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
