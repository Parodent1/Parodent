import SignUp from './pages/signUp/SignUp'
import SignIn from './pages/signIn/SignIn'
import { AuthProvider } from './context/AuthContext'
import './App.css'

function App() {

  return (
    <AuthProvider>
    <div className="appBody">
      <SignIn/>
      <SignUp/>
    </div>
    </AuthProvider>
  )
}

export default App

