import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function AdminHome() {
    let [user, setUser] = useState({})
    let navigate = useNavigate()

    async function getAPIData() {
        let response = await fetch("/api/user/" + localStorage.getItem("userid"), {
            method: "get",
            headers: {
                "content-type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        })
        response = await response.json()

        if (response.status !== 200)
            navigate("/admin")
        else
            setUser(response.data)
    }

    useEffect(() => {
        getAPIData()
    }, [])

    return (
        <>
           

            <div className="container-fluid" style={{ marginLeft: "80px", transition: "0.3s" }}>

                
                {/* <h4 className="my-3 p-3 bg-primary text-light rounded text-center">
                    Admin Dashboard
                </h4> */}

                <div className="row g-4">
                     <Sidebar className="mt-5" />

                    <div className="col-md-4">
                        {
                            user.pic ?
                                <img src={user.pic} className="img-fluid rounded shadow" alt="" /> :
                                <img src="/img/nouser.jpg" className="img-fluid rounded shadow" alt="" />
                        }
                    </div>

                    <div className="col-md-8">
                        <div className="card shadow">
                            <div className="card-header bg-primary text-light">
                                <h5 className="m-0">Profile Details</h5>
                            </div>
                            <div className="card-body">

                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>Username:</strong> {user.username}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Phone:</strong> {user.phone}</p>

                                <Link to="/updateprofile"
                                    className="btn btn-primary w-100 mt-3">
                                    <i className="fa fa-edit"></i> Edit Profile
                                </Link>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
