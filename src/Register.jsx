import { useEffect, useState, useRef } from "react";
import webService from './services/WebService'

export default function Register() {
  const [constants,setConstants]= useState(undefined)
  const [msg,setMsg] = useState("");
  useEffect(()=>{
    loadConstants();
  },[]);

  const loadConstants = async ()=>{
    const res = await fetch("http://localhost:7979/acrodesk/constants");
    const responses = await res.json();
    if(responses.status){
      setConstants(responses.data);
    }
  }
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const depRef = useRef();
  const roleRef = useRef();

  const register = async (evt)=>{
    evt.preventDefault();
    const obj = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passRef.current.value,
      department: depRef.current.value,
      role: roleRef.current.value,
    }
    const response = await webService.postCall(webService.URLS.REGISTER,obj)
    if(responses.status){
      evt.target.reset()
    }
    setMsg(responses.msg);
  }

  return <> <section className="page-heading">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="header-text">
            <h4>Welcome User</h4>
            <h1>User Registeration</h1>
          </div>
        </div>
      </div>
    </div>
  </section>

    <section className="contact-us">
      <div className="container">
        <div className="row">
          <form id="contact" onSubmit={register}>
            <div className="row">
              <div className="col-lg-12">
                <div className="section-heading">
                  <h6>Register Here</h6>
                </div>
              </div>
              <div className="col-lg-12">
                <fieldset>
                  <input type="text" ref={nameRef} placeholder="Name" required />
                </fieldset>
              </div>
              <div className="col-lg-12">
                <fieldset>
                  <input type="email" ref={emailRef} placeholder="Email" required />
                </fieldset>
              </div>
              <div className="col-lg-12">
                <fieldset>
                  <input type="password" ref={passRef} placeholder="Password" required />
                </fieldset>
              </div>
              <div className="col-lg-12">
                <fieldset>
                  <select ref={depRef} required>
                    <option value="">Choose Department</option>
                    {constants?.departments.map(dp=><option>{dp}</option>)}
                  </select>
                </fieldset>
              </div>
              <div className="col-lg-12">
                <fieldset>
                  <select ref={roleRef} required>
                    <option value="">Choose Role</option>
                    {constants?.role.map(dp=><option>{dp}</option>)}
                  </select>
                </fieldset>
              </div>

              <div className="col-lg-12">
                <fieldset>
                  <b className="text-danger">{msg}</b>
                  &nbsp;&nbsp;
                  <button type="submit" id="form-submit" className="main-gradient-button">Register</button>
                </fieldset>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>

  </>
}