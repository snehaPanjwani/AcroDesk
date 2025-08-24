import { useSelector } from "react-redux"
import { useState, useRef, useEffect } from "react";
import webService from '../services/WebService'

export default function FacultyDocs() 
{
    const user = useSelector(store => store.userinfo.value)
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(()=>{
        loaddocs()
    },[])

    const loaddocs = async()=>
    {
        const response = await webService.getCallWithToken(webService.URLS.MY_DOCS,user.token);
        console.log(response);
        if(response.status)
            setDocs(response.data);
    }

    const [docs,setDocs] = useState([]);


    const titleRef = useRef();
    const subRef = useRef();
    const fileRef = useRef();

    const upload = async (evt)=>{
        evt.preventDefault();
        const frm = new FormData();
        frm.append("title",titleRef.current.value);
        frm.append("subject",subRef.current.value);
        frm.append("file",fileRef.current.files[0]);
        const response = await webService.postCallDocUpload(webService.URLS.UPLOAD_DOC,frm,user.token);
        console.log(response);
        if(response.status){
            setDocs([...docs,response.data]);
            evt.target.reset();
        }
    }

    return (
        <div className="query bg-light min-vh-100">
            <section className="page-heading py-4 text-white">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <div className="header-text">
                                <h1 className="display-5 fw-bold">{user.name}, Upload Docs!</h1>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="get-info py-4">
                <div className="container">

            <form onSubmit={upload} className="mb-4 card shadow-sm p-4 border-0 bg-white">
                                <div className="row g-3 align-items-end">
                                    <div className="col-md-4">
                                        <label htmlFor="subject" className="form-label fw-semibold">Subject</label>
                                        <input type="text" id="subject" placeholder="Subject" ref={subRef} className="form-control" required />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="title" className="form-label fw-semibold">Title</label>
                                        <input type="text" id="title" placeholder="Title" ref={titleRef} className="form-control" required />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="file" className="form-label fw-semibold">File</label>
                                        <input type="file" id="file" ref={fileRef} className="form-control border-0 bg-light" required style={{padding: "0.375rem 0.75rem"}} />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col text-end">
                                        <button className="btn btn-primary px-4 py-2 shadow rounded-pill">
                                            <i className="bi bi-upload me-2"></i>Upload
                                        </button>
                                    </div>
                                </div>
                            </form>

                    <div className="row g-4">
                        {/* Example Document Card */}
                        {docs.map(doc=><div className="col-xl-6 col-md-6 col-lg-4">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h5 className="card-title fw-semibold">{doc.title}</h5>
                                        <span className="text-muted small">{doc.createdAt.toString().split("T")[0]}</span>
                                    </div>
                                    <div className="mb-3">
                                        <span className="badge bg-info text-dark px-3 py-2 fs-6">{doc.subject}</span>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button
                                            className="btn btn-danger btn-sm px-3 shadow-sm"
                                            type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#deleteDocModal"
                                            onClick={() => setShowDeleteModal(true)}
                                        >
                                            <i className="bi bi-trash me-2"></i>Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>)}
                        {/* ...map more documents here... */}
                    </div>
                    {/* Delete Confirmation Modal */}
                    <DeleteDocModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} />
                </div>
            </section>
        </div>
    );
}

// Add this component inside the same file:
function DeleteDocModal({ show, onClose }) {
    return (
        <div
            className={`modal fade${show ? " show d-block" : ""}`}
            id="deleteDocModal"
            tabIndex="-1"
            aria-labelledby="deleteDocModalLabel"
            aria-modal="true"
            role="dialog"
            style={show ? { background: "rgba(0,0,0,0.5)" } : {}}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 rounded-4">
                    <div className="modal-header bg-danger text-white rounded-top-4">
                        <h5 className="modal-title" id="deleteDocModalLabel">
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
                        <p className="fs-5 mb-3">Are you sure you want to delete this document?</p>
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