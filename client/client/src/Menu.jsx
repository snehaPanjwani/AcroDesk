import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {remUserData} from './reduxconfig/UserSlice';


export default function Menu()
{
    const user = useSelector(store=>store.userinfo.value);

    const menuGenerator = ()=>
    {
        if(user.islogin){
            if(user.role=='student')
                return <StudentMenu/>
            else if(user.role=='faculty')
                return <FacultyMenu/>
            else if(user.role=='hod')
                return <HodMenu/>
            else
                return <AdminMenu/>    
        }else
            return <BasicMenu/>
    }

    return <header className="header-area header-sticky">
      <div className="container">
          <div className="row">
              <div className="col-12">
                  {menuGenerator()}
              </div>
          </div>
      </div>
  </header>
}

function BasicMenu()
{
    return <nav className="main-nav">                      
                      <a href="index.html" className="logo">
                          <img src="/src/assets/assets/images/templatemo-eduwell.png" alt="EduWell Template"/>
                      </a>                     
                      <ul className="nav">
                          <li className="scroll-to-section"><Link to="/" className="active">Home</Link></li>

                          <li className="scroll-to-section"><Link to="/about">About US</Link></li>

                          <li className="scroll-to-section"><Link to="/register">Register</Link></li>

                          <li className="scroll-to-section"><Link to="/login">Login</Link></li>
                         
                         
                          <li className="scroll-to-section"><Link to="/contact">Contact Us</Link></li> 
                      </ul>        
                      <a className='menu-trigger'>
                          <span>Menu</span>
                      </a>
                  </nav>
}

function StudentMenu()
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return <nav className="main-nav">                      
                      <a href="index.html" className="logo">
                          <img src="/src/assets/assets/images/templatemo-eduwell.png" alt="EduWell Template"/>
                      </a>                     
                      <ul className="nav">
                          <li className="scroll-to-section"><Link to="/student/home" className="active">Home</Link></li>

                          <li className="scroll-to-section"><Link to="/student/queries">Queries</Link></li>

                          <li className="scroll-to-section"><Link to="/student/docs">Documents</Link></li>

                          <li className="scroll-to-section"><Link to="/student/msg">MessageBoard</Link></li>
                                                  
                          <li className="scroll-to-section">
                            <button onClick={()=>{
                                dispatch(remUserData());
                                navigate("/login")
                            }} className="btn btn-outline-primary">Logout</button>
                          </li> 
                      </ul>        
                      <a className='menu-trigger'>
                          <span>Menu</span>
                      </a>
                  </nav>
}

function FacultyMenu()
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return <nav className="main-nav">                      
                      <a href="index.html" className="logo">
                          <img src="/src/assets/assets/images/templatemo-eduwell.png" alt="EduWell Template"/>
                      </a>                     
                      <ul className="nav">
                          <li className="scroll-to-section"><Link to="/faculty/home" className="active">Home</Link></li>

                          <li className="scroll-to-section"><Link to="/faculty/queries">View Queries</Link></li>

                          <li className="scroll-to-section"><Link to="/faculty/docs">Upload</Link></li>

                          <li className="scroll-to-section"><Link to="/faculty/msg">MessageBoard</Link></li>
                                                  
                          <li className="scroll-to-section">
                            <button onClick={()=>{
                                dispatch(remUserData());
                                navigate("/login")
                            }} className="btn btn-outline-primary">Logout</button>
                          </li> 
                      </ul>        
                      <a className='menu-trigger'>
                          <span>Menu</span>
                      </a>
                  </nav>
}

function HodMenu()
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return <nav className="main-nav">                      
                      <a href="index.html" className="logo">
                          <img src="/src/assets/assets/images/templatemo-eduwell.png" alt="EduWell Template"/>
                      </a>                     
                      <ul className="nav">
                          <li className="scroll-to-section"><Link to="/hod/home" className="active">Home</Link></li>

                          <li className="scroll-to-section"><Link to="/hod/queries">View Queries</Link></li>

                          <li className="scroll-to-section"><Link to="/hod/docs">View Documents</Link></li>

                          <li className="scroll-to-section"><Link to="/hod/msg">MessageBoard</Link></li>
                                                  
                          <li className="scroll-to-section">
                            <button onClick={()=>{
                                dispatch(remUserData());
                                navigate("/login")
                            }} className="btn btn-outline-primary">Logout</button>
                          </li> 
                      </ul>        
                      <a className='menu-trigger'>
                          <span>Menu</span>
                      </a>
                  </nav>
}

function AdminMenu()
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return <nav className="main-nav">                      
                      <a href="index.html" className="logo">
                          <img src="/src/assets/assets/images/templatemo-eduwell.png" alt="EduWell Template"/>
                      </a>                     
                      <ul className="nav">
                          <li className="scroll-to-section"><Link to="/admin/home" className="active">Home</Link></li>                          
                                                  
                          <li className="scroll-to-section">
                            <button onClick={()=>{
                                dispatch(remUserData());
                                navigate("/login")
                            }} className="btn btn-outline-primary">Logout</button>
                          </li> 
                      </ul>        
                      <a className='menu-trigger'>
                          <span>Menu</span>
                      </a>
                  </nav>
}