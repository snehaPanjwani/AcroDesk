import { useSelector } from "react-redux"
import { useState, useRef, useEffect } from "react";
import webService from '../services/WebService'

export default function FacultyMsg() 
{
    const user = useSelector(store => store.userinfo.value)
    const [msgs,setMsg] = useState([]);

    useEffect(()=>{
            loadMsgs();
    },[]);
    
    const loadMsgs = async()=>
    {
            const response = await webService.getCallWithToken(webService.URLS.MY_MSGS,user.token);
            console.log(response);
            if(response.status)
                setMsg(response.data);
    }

    const titleRef = useRef();
    const msgRef = useRef();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const sendMSg = async (evt)=>
    {
            evt.preventDefault();
            const obj = {
                title : titleRef.current.value , 
                message : msgRef.current.value
            }
            const response = await webService.postCallWithToken(webService.URLS.SEND_MSG,obj,user.token);
            console.log(response)
            if(response.status){
                setMsg([...msgs,response.data])
                evt.target.reset();
            }
    }

    return (
        <div className="query bg-light min-vh-100">
            <section className="page-heading py-5 text-white">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <div className="header-text">
                                <h1 className="display-5 fw-bold">{user.name}, Send Messages !</h1>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="get-info py-5">
                <div className="container">  
                    
            <form onSubmit= {sendMSg} className="mb-4 card shadow-sm p-4 border-0 bg-white">
                                <div className="row g-3 align-items-end">                                   
                                    <div className="col-md-4">
                                        <label htmlFor="title" className="form-label fw-semibold">Title</label>
                                        <input type="text" ref={titleRef} id="title" placeholder="Title" className="form-control" required />
                                    </div>
                                     <div className="col-md-8">
                                        <label htmlFor="msg" className="form-label fw-semibold">Message</label>
                                        <input type="text" ref={msgRef} id="msg" placeholder="Message" className="form-control" required />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col text-end">
                                        <button className="btn btn-primary px-4 py-2 shadow rounded-pill">
                                            <i className="bi bi-upload me-2"></i>Send Message
                                        </button>
                                    </div>
                                </div>
                            </form>                  
                    <div className="row g-4">
                        {/* Example Query Card */}
                        {msgs.map(msg=><div className="col-12 col-md-6 col-lg-4">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h5 className="card-title mb-0">{msg.title}</h5>
                                        <span className="text-muted small">{msg.createdAt.toString().split("T")[0]}</span>
                                    </div>
                                    
                                    <p className="card-text text-secondary fs-6">{msg.message}</p>
                                    <div className="d-flex justify-content-end">
                                        <button
                                            className="btn btn-danger btn-sm px-3 shadow-sm"
                                            type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#deleteMsgModal"
                                            onClick={() => setShowDeleteModal(true)}
                                        >
                                            <i className="bi bi-trash me-2"></i>Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>)}
                        {/* ...map more queries here... */}
                    </div>
                    {/* Delete Confirmation Modal */}
                    <DeleteMsgModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} />
                </div>
            </section>
        </div>
    );
}

// Add this component inside the same file:
function DeleteMsgModal({ show, onClose }) {
    return (
        <div
            className={`modal fade${show ? " show d-block" : ""}`}
            id="deleteMsgModal"
            tabIndex="-1"
            aria-labelledby="deleteMsgModalLabel"
            aria-modal="true"
            role="dialog"
            style={show ? { background: "rgba(0,0,0,0.5)" } : {}}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 rounded-4">
                    <div className="modal-header bg-danger text-white rounded-top-4">
                        <h5 className="modal-title" id="deleteMsgModalLabel">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            Confirm Delete
                        </h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body text-center">
                        <p className="fs-5 mb-3">Are you sure you want to delete this message?</p>
                        <div className="text-muted mb-2">This action cannot be undone.</div>
                    </div>
                    <div className="modal-footer justify-content-center">
                        <button
                            type="button"
                            className="btn btn-secondary px-4"
                            data-bs-dismiss="modal"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger px-4"
                            onClick={() => {
                                // handle delete logic here
                                onClose();
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}