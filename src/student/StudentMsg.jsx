import { useSelector } from "react-redux"
import './Queries.css';
import { useState, useRef, useEffect } from "react";
import webService from '../services/WebService'

export default function StudentMsg() 
{
    const user = useSelector(store => store.userinfo.value)

    const [msgs,setMsg] = useState([]);
    
    useEffect(()=>{
                loadMsgs();
    },[]);
        
    const loadMsgs = async()=>
    {
                const response = await webService.getCallWithToken(webService.URLS.MSGS,user.token);
                console.log(response);
                if(response.status)
                    setMsg(response.data);
    }
    return (
        <div className="query bg-light min-vh-100">
            <section className="page-heading py-5 text-white">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <div className="header-text">
                                <h1 className="display-5 fw-bold">{user.name}, View Messages !</h1>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="get-info py-5">
                <div className="container">                    
                    <div className="row g-4">
                        {/* Example Query Card */}
                        {msgs.map(msg =><div className="col-12 col-md-6 col-lg-4">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h5 className="card-title mb-0">{msg.title}</h5>
                                        <span className="text-muted small">{msg.createdAt.toString().split("T")[0]}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span className="badge bg-info text-dark px-3 py-2 fs-6">{msg.postby.name}</span>
                                    </div>
                                    <p className="card-text text-secondary fs-6">{msg.message}</p>
                                </div>
                            </div>
                        </div>)}
                        {/* ...map more queries here... */}
                    </div>
                </div>
            </section>
        </div>
    );
}