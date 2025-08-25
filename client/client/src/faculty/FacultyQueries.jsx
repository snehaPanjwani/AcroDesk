import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import webService from '../services/WebService'
import QueryItem from "./QueryItem";
export default function FacultyQueries() 
{
    const user = useSelector(store => store.userinfo.value);
   // console.log(user)
    const [queries,setQueries] = useState([]);
    useEffect(()=>{
        loadQueries();
    },[]);
    const loadQueries = async()=>
    {
        const response = await webService.getCallWithToken(webService.URLS.ALL_QUERIES,user.token);
        console.log(response);
        if(response.status)
            setQueries(response.data);
    }

    const addAnswer = (answer,qid)=>{
        setQueries(queries.map(qu=>qu.id == qid ? {...qu,answers : [...qu.answers,answer]} : qu));
    }

    return (
        <div className="query bg-light min-vh-100">
            <section className="page-heading py-4 text-white">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <div className="header-text">
                                <h1 className="display-5 fw-bold">{user.name}, Answer Queries!</h1>
                                <p className="lead mt-3">View and answer students' queries below.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="get-info py-3">
                <div className="container">
                    <div className="row justify-content-center">
                        
                    {queries.map(q => <QueryItem q={q} addAnswer={addAnswer}/>)}
                       
                    </div>
                </div>
            </section>
        </div>
    );
}