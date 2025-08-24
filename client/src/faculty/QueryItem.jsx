import { useEffect, useRef, useState} from "react";
import webService from "../services/WebService";    
import { useSelector } from "react-redux";

export default function QueryItem({q, addAnswer})
{
    const user = useSelector(store => store.userinfo.value);
    const ansRef = useRef();
    const send = async (evt) =>{
        evt.preventDefault();
        const obj = {
           response_text : ansRef.current.value
        }
        const URL = webService.URLS.SEND_ANSWER + q.id;
        const response = await webService.postCallWithToken(URL,obj,user.token);
        console.log(response);
        if(response.status){
            addAnswer(response.data,q.id);
            evt.target.reset();
        }
    }
    return <div className="col-xl-6 col-md-6 col-lg-6">
        <div key={q.id} className="card mb-4 shadow-lg border-0 rounded-4">
            <div className="card-body p-4">
                <div className="d-flex flex-column flex-md-row align-items-md-center mb-2 gap-2">
                    <div className="flex-grow-1">
                        <h5 className="mb-1 fw-semibold text-primary">{q.subject} ( {q.student.name} )</h5>
                        <span className="text-muted small">{q.createdAt}</span>
                    </div>
                    <span className="badge bg-info text-dark fs-6 px-3 py-2">{q.status}</span>
                </div>
                <div className="mb-3">
                    <p className="card-text fs-5 text-secondary">{q.query_text}</p>
                </div>
                <div className="mb-2">
                    <strong className="text-primary">Faculty Responses</strong>
                    <div className="mt-2">
                        {q.answers.map((resp, idx) => (
                                                    <div key={idx} className="d-flex flex-column flex-md-row align-items-md-center mb-2 ps-2 border-start border-3 border-primary bg-light rounded-2">
                                                        <div className="flex-grow-1">
                                                            <span className="fw-bold">{resp.responseby}:</span>
                                                            <span className="ms-2">{resp.response_text}</span>
                                                        </div>
                                                        <span className="text-muted small ms-md-2">{resp.createdAt}</span>
                                                    </div>
                                                ))}
                    </div>
                </div>
                <form className="mt-3" onSubmit={send}>
                    <div className="input-group">
                        <input type="text" ref={ansRef} className="form-control rounded-start-pill" placeholder="Write your answer..." />
                        <button className="btn btn-primary rounded-end-pill px-4" type="submit">
                            <i className="bi bi-send me-1"></i>Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
}