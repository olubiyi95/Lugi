import  { React}  from 'react'
import { Routes, Route} from "react-router-dom";
import { Login } from '../Container/Login/Login'
import { Signup } from '../Container/Signup/Signup'
import { Dashboard } from '../Container/Dashboard/Dashboard'
import { ProfilePage } from '../Container/ProfilePage/ProfilePage'
import { ProtectedRoutes } from '../Components/ProtectedRoutes/ProtectedRoutes'
import { AuthContext } from '../Components/AuthContext/AuthContext';






const AppRoutes = () => {
    
    return (
        <>
        <AuthContext>
          <Routes>
                <Route path="/signup" element={<Signup/>} />
                <Route path="/login" element={<Login/>} />
                 <Route path='/dashboard' element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>} 
                /> 
                <Route path='/profile' element={<ProtectedRoutes><ProfilePage/></ProtectedRoutes>} />
            </Routes>
        </AuthContext>
    </>
    )
   

}

export default AppRoutes