import Menu from './Menu';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Register from './Register';
import Login from './Login';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import StudentHome from './student/StudentHome';
import FacultyHome from './faculty/FacultyHome';
import HodHome from './hod/HodHome';
import AdminHome from './admin/AdminHome';
import { useSelector } from 'react-redux';
import StudentQueries from './student/StudentQueries';
import StudentDocs from './student/StudentDocs';
import StudentMsg from './student/StudentMsg';
import FacultyQueries from './faculty/FacultyQueries';
import FacultyDocs from './faculty/FacultyDocs';
import FacultyMsg from './faculty/FacultyMsg';

export default function App()
{
  return <>
    <Menu/>

    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/contact" element={<Contact/>} />

      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />

      <Route path='/student' element={<RoleCheckRoute checkrole="student"/>}>
          <Route path='home' element={<StudentHome/>}/>
          <Route path="queries" element={<StudentQueries/>}/>
          <Route path="docs" element={<StudentDocs/>}/>
           <Route path="msg" element={<StudentMsg/>}/>
      </Route>
      <Route path='/faculty' element={<RoleCheckRoute checkrole="faculty"/>}>
          <Route path='home' element={<FacultyHome/>}/>
          <Route path="queries" element={<FacultyQueries/>}/>
          <Route path="docs" element={<FacultyDocs/>}/>
          <Route path="msg" element={<FacultyMsg/>}/>
      </Route>
       <Route path='/hod' element={<RoleCheckRoute checkrole="hod"/>}>
          <Route path='home' element={<HodHome/>}/>
      </Route>
      <Route path='/admin' element={<RoleCheckRoute checkrole="admin"/>}>
          <Route path='home' element={<AdminHome/>}/>
      </Route>
    </Routes>
  </>
}

function RoleCheckRoute({checkrole})
{
  const user = useSelector(store=>store.userinfo.value);
  if(user.islogin)
  {
    if(user.role==checkrole)
      return <Outlet/>
    else
      return <Navigate to={`/${user.role}/home`}/>
  }else
    return <Outlet/>
}