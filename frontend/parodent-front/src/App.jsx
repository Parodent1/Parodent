import SignUp from './pages/signUp/SignUp'
import SignIn from './pages/signIn/SignIn'
import { AuthProvider, useAuth } from './context/AuthContext'
import WeeklySchedule from './pages/weeklySchedule/weeklySchedule'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'


function PrivateRoute({children}) {
  const { isAuthenticated, loading } = useAuth();

  if(loading){
    return <div>Loading...</div>
  }
  return isAuthenticated ? children : <Navigate to="/login"/>
}

function DefaultRoute() {
  const {isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return isAuthenticated ? <Navigate to="/schedule"/> : <Navigate to="/login"/>
}

function App() {

  return (
    <AuthProvider>
    <Router>
    <div className="appBody">
      <Routes>
      <Route path="/" element={<DefaultRoute/>}/>
      <Route path='/login' element={<SignIn/>}/>
      <Route path='/register' element={<SignUp/>}/>
      <Route 
              path="/schedule" 
              element={
                <PrivateRoute>
                  <WeeklySchedule />
                </PrivateRoute>
              } 
            />
      </Routes>
    </div>
    </Router>
    </AuthProvider>
  )
}

export default App

