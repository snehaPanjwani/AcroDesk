import { useSelector } from "react-redux"

export default function FacultyHome()
{
    const user = useSelector(store=>store.userinfo.value);
    return <>
    <section className="page-heading">
            <div className="container">
            <div className="row">
                <div className="col-lg-12">
                <div className="header-text">
                    <h4>Welcome Faculty</h4>
                    <h1>Hello {user.name} !</h1>
                </div>
                </div>
            </div>
            </div>
        </section>
    </>
}