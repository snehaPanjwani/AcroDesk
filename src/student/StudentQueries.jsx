import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react";
import './Queries.css';
import webService from '../services/WebService';

export default function StudentQueries() 
{
    const subRef = useRef();
    const queryRef = useRef();
   
    const user = useSelector(store => store.userinfo.value);
   
    const [queries,setQueries] = useState([]);

    const [answers,setAnswers] = useState([]);

    const [opsQuery,setOpsQuery] = useState(undefined);

    useEffect(()=>{
        loadQueries();
    },[]);

    const loadQueries = async()=>
    {
        const response = await webService.getCallWithToken(webService.URLS.STUD_QUERIES,user.token);
        console.log(response);
        if(response.status)
            setQueries(response.data);
    }

    // Example answers for demonstration
    const exampleAnswers = [
        { faculty: "Dr. Smith", answer: "Please refer to the course material on page 10.", date: "2024-06-10" },
        { faculty: "Prof. Lee", answer: "I have uploaded a sample solution.", date: "2024-06-11" }
    ];

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editSubject, setEditSubject] = useState("Subject");
    const [editQuery, setEditQuery] = useState("Query");
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    const sendQuery = async (evt)=>
    {
        evt.preventDefault();
        const obj = {
            subject : subRef.current.value , 
            query_text : queryRef.current.value
        }
        const response = await webService.postCallWithToken(webService.URLS.ASK_QUERY,obj,user.token);
        if(response.status){
            setQueries([...queries,response.data])
            evt.target.reset();
        }
    }

    const handleDelete = async ()=>
    {
        const URL = webService.URLS.CHANGE_QUERY_STATUS + opsQuery.id;
        const response = await webService.patchCallWithToken(URL,user.token);
        if(response.status){
            setQueries(queries.map(qu=>qu.id==opsQuery.id?response.data:qu));
        }
    }

    return (
        <div className="query bg-light min-vh-100">
            <section className="page-heading py-4 text-white">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <div className="header-text">
                                <h1 className="display-5 fw-bold">{user.name}, Your Queries!</h1>
                                <p className="lead mt-3">Submit and manage your queries below.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="get-info py-3">
                <div className="container">
                    <div className="row justify-content-center mt-0">
                        <div className="col-12 col-md-10 col-lg-8">
                            
                            <form onSubmit={sendQuery} className="mb-4 card shadow-lg p-4 border-0 bg-white rounded-4">
                                <div className="row g-4 align-items-end">
                                    <div className="col-md-4">
                                        <label htmlFor="subject" className="form-label fw-semibold">
                                            <i className="bi bi-bookmark-star me-2 text-primary"></i>Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            placeholder="Enter subject"
                                            ref={subRef}
                                            className="form-control rounded-pill border-primary"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <label htmlFor="query" className="form-label fw-semibold">
                                            <i className="bi bi-chat-left-text me-2 text-success"></i>Query
                                        </label>
                                        <textarea
                                            id="query"
                                            placeholder="Type your query here..."
                                            ref={queryRef}
                                            className="form-control rounded-4 border-success"
                                            rows={3}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col text-end">
                                        <button className="btn btn-success px-5 py-2 shadow rounded-pill fs-5">
                                            <i className="bi bi-send me-2"></i>Ask Query
                                        </button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                    <hr className="mb-4" />

                    <div className="row g-4">
                        {/* Example Query Card */}
                        {queries.map(qu=><div className="col-12 col-md-6 col-lg-4">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body">
                                    
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h5 className="card-title">{qu.subject}</h5>
                                        <span className="text-muted small">{qu.createdAt}</span>
                                    </div>
                                    <p className="card-text text-secondary">{qu.query_text}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="badge bg-info text-dark">{qu.status}</span>
                                        <div>
                                            <button
                                                className="btn btn-sm btn-outline-primary me-2"
                                                type="button"
                                                data-bs-toggle="modal"
                                                data-bs-target="#answersModal"
                                                onClick={() => {
                                                    setAnswers(qu.answers);
                                                    setShowModal(true)}}
                                            >
                                                <i className="bi bi-chat-dots me-1"></i>Answers
                                            </button>
                                            {qu.isactive?<button
                                                className="btn btn-sm btn-outline-info me-2"
                                                type="button"
                                                data-bs-toggle="modal"
                                                data-bs-target="#editModal"
                                                onClick={() => setShowEditModal(true)}
                                            >
                                                Edit
                                            </button>:""}
                                            <button
                                                className={`btn btn-sm ${qu.isactive?'btn-outline-danger':'btn-outline-success'}`}
                                                type="button"
                                                data-bs-toggle="modal"
                                                data-bs-target="#deleteModal"
                                                onClick={() => {
                                                    setOpsQuery(qu);
                                                    setShowDeleteModal(true);
                                                }}
                                            >
                                                {qu.isactive?'Delete':'Active'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)}
                        {/* ...map more queries here... */}
                    </div>
                </div>
            </section>

            {/* Bootstrap Modal for Answers */}
            <div
                className={`modal fade${showModal ? " show d-block" : ""}`}
                id="answersModal"
                tabIndex="-1"
                aria-labelledby="answersModalLabel"
                aria-modal="true"
                role="dialog"
                style={showModal ? { background: "rgba(0,0,0,0.5)" } : {}}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="answersModalLabel">Answers</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => setShowModal(false)}
                            ></button>
                        </div>
                        <div className="modal-body">
                            {answers.length === 0 ? (
                                <div className="text-muted">No answers yet.</div>
                            ) : (
                                answers.map((ans, idx) => (
                                    <div key={idx} className="mb-3 border-bottom pb-2">
                                        <div className="fw-bold">{ans.responseby}</div>
                                        <div className="text-secondary">{ans.response_text}</div>
                                        <div className="text-muted small">{ans.createdAt.toString().split("T")[0]}</div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Query Modal */}
            <div
                className={`modal fade${showEditModal ? " show d-block" : ""}`}
                id="editModal"
                tabIndex="-1"
                aria-labelledby="editModalLabel"
                aria-modal="true"
                role="dialog"
                style={showEditModal ? { background: "rgba(0,0,0,0.5)" } : {}}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                // handle update logic here
                                setShowEditModal(false);
                            }}
                        >
                            <div className="modal-header">
                                <h5 className="modal-title" id="editModalLabel">Edit Query</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => setShowEditModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="editSubject" className="form-label fw-semibold">Subject</label>
                                    <input
                                        type="text"
                                        id="editSubject"
                                        className="form-control"
                                        value={editSubject}
                                        onChange={e => setEditSubject(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editQuery" className="form-label fw-semibold">Query</label>
                                    <textarea
                                        id="editQuery"
                                        className="form-control"
                                        rows={2}
                                        value={editQuery}
                                        onChange={e => setEditQuery(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    onClick={() => setShowEditModal(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <div
                className={`modal fade${showDeleteModal ? " show d-block" : ""}`}
                id="deleteModal"
                tabIndex="-1"
                aria-labelledby="deleteModalLabel"
                aria-modal="true"
                role="dialog"
                style={showDeleteModal ? { background: "rgba(0,0,0,0.5)" } : {}}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 rounded-4">
                        <div className={`modal-header ${opsQuery?.isactive?'bg-danger':'bg-success'} text-white rounded-top-4`}>
                            <h5 className="modal-title" id="deleteModalLabel">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                Confirm Delete
                            </h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => {
                                    setOpsQuery(undefined);
                                    setShowDeleteModal(false)
                                }}
                            ></button>
                        </div>
                        <div className="modal-body text-center">
                            <p className="fs-5 mb-3">Are you sure you want to delete this query?</p>
                            <div className="text-muted mb-2">This action cannot be undone.</div>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button
                                type="button"
                                className="btn btn-secondary px-4"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                    setOpsQuery(undefined);
                                    setShowDeleteModal(false)
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className={`btn ${opsQuery?.isactive?'bg-danger':'bg-success'} px-4`}
                                onClick={() => {
                                    // handle delete logic here
                                    handleDelete();
                                    setShowDeleteModal(false);
                                }}
                            >
                                {opsQuery?.isactive?'Delete':'Active'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}