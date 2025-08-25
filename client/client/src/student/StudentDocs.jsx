import { useSelector } from "react-redux"
import { useEffect, useState } from "react";
import './Queries.css';
import webService from '../services/WebService'

export default function StudentDocs() 
{
    const user = useSelector(store => store.userinfo.value)

    useEffect(()=>{
            loaddocs()
    },[])
    
    const loaddocs = async()=>
        {
            const response = await webService.getCallWithToken(webService.URLS.STUD_DOCS,user.token);
            console.log(response);
            if(response.status)
                setDocs(response.data);
        }
    
    const [docs,setDocs] = useState([]);
    return (
        <div className="query bg-light min-vh-100">
            <section className="page-heading py-4 text-white">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <div className="header-text">
                                <h1 className="display-5 fw-bold">{user.name}, Download Docs!</h1>
                                <p className="lead mt-3">Access and download your important documents below.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="get-info py-4">
                <div className="container">
                    <div className="row g-4">
                        {/* Example Document Card */}
                        {docs.map(doc=><div className="col-12 col-md-6 col-lg-4">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h5 className="card-title fw-semibold">{doc.title} | {doc.faculty.name}</h5>
                                        <span className="text-muted small">{doc.createdAt.toString().split("T")[0]}</span>
                                    </div>
                                    <div className="mb-3">
                                        <span className="badge bg-info text-dark px-3 py-2 fs-6">{doc.subject}</span>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <a href={`${SERVER}/`} target="_blank" ></a>
                                        <button className="btn btn-primary btn-sm px-3 shadow-sm">
                                            <i className="bi bi-download me-2"></i>Download
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>)}
                        {/* ...map more documents here... */}
                    </div>
                </div>
            </section>
        </div>
    );
}