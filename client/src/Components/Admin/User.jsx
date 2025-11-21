import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import DataTable from 'react-data-table-component';

export default function User() {

    const columns = [
        { name: 'Id', selector: row => row._id, sortable: true },
        { name: 'Name', selector: row => row.name, sortable: true },
        { name: 'User Name', selector: row => row.username, sortable: true },
        { name: 'Phone', selector: row => row.phone, sortable: true },
        { name: 'Role', selector: row => row.role, sortable: true },
        {
            name: 'Delete',
            selector: row => (
                <button className="btn" onClick={() => deleteItem(row._id)}>
                    <i className="fa fa-trash text-danger"></i>
                </button>
            ),
        }
    ];

    let [data, setData] = useState([]);

    async function deleteItem(_id) {
        if (window.confirm("Are You Sure?")) {
            let response = await fetch("/api/user/" + _id, {
                method: "delete",
                headers: { "content-type": "application/json", "Authorization": localStorage.getItem("token") }
            });
            response = await response.json();
            getAPIData();
        }
    }

    async function getAPIData() {
        let response = await fetch("/api/user", {
            method: "get",
            headers: { "content-type": "application/json", "Authorization": localStorage.getItem("token") }
        });
        response = await response.json();
        setData(response.data);
    }

    useEffect(() => {
        getAPIData();
    }, []);

    return (
        <>
            {/* FIXED SIDEBAR - outside content */}
            <Sidebar />

            {/* CONTENT SHIFTED RIGHT */}
            <div className="container-fluid" style={{ marginLeft: "80px", transition: "0.3s" }}>

                <h5 className="bg-primary text-light p-2 text-center">User List</h5>

                <div className="table-responsive">
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination
                        paginationPerPage={5}
                    />
                </div>
            </div>
        </>
    );
}
