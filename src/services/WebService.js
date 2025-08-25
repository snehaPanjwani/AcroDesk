export const SERVER = "http://localhost:7979";

class WebService
{
    postCall = async(url,data)=>
    {
        const res = await fetch(url,{
            method : 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        });
        const response = await res.json();
        return response;
    }
    postCallWithToken = async(url,data,token)=>
    {
        const res = await fetch(url,{
            method : 'POST',
            headers:{
                'Content-Type' : 'application/json',
                "Authorization" : `Bearer ${token}`
            },
            body : JSON.stringify(data)
        });
        const response = await res.json();
        return response;
    }

    getCallWithToken = async(url,token)=>
    {
        const res = await fetch(url,{
            method : 'GET',
            headers:{                
                "Authorization" : `Bearer ${token}`
            }
        });
        const response = await res.json();
        return response;
    }
    patchCallWithToken = async(url,token)=>
    {
        const res = await fetch(url,{
            method : 'PATCH',
            headers:{
                'Authorization' : `Bearer ${token}`
            }
        });
        const response = await res.json();
        return response;
    }
    postCallDocUpload = async(url,data,token)=>
    {
        const res = await fetch(url,{
            method : 'POST',
            headers:{
                "Authorization" : `Bearer ${token}`
            },
            body : data
        });
        const response = await res.json();
        return response;
    }

    constructor()
    {
        this.URLS = {
            REGISTER : `${SERVER}/acrodesk/register`,
            LOGIN : `${SERVER}/acrodesk/login`,
            ASK_QUERY : `${SERVER}/auth/student/askquery`,
            STUD_QUERIES : `${SERVER}/auth/student/myqueries`,
            ALL_QUERIES : `${SERVER}/auth/faculty/queries`,
            SEND_ANSWER : `${SERVER}/auth/faculty/sendanswer/`,
            CHANGE_QUERY_STATUS : `${SERVER}/auth/student/changestatus/`,
            SEND_MSG : `${SERVER}/auth/faculty/sendmsg`,
            MY_MSGS : `${SERVER}/auth/faculty/msgs`,
            MSGS : `${SERVER}/auth/student/msgs`,
            UPLOAD_DOC : `${SERVER}/auth/faculty/uploaddoc`,
            MY_DOCS : `${SERVER}/auth/faculty/mydocs`,
            STUD_DOCS : `${SERVER}/auth/student/docslist`,
        }
    }
}

export default new WebService();