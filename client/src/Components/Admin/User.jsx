import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import DataTable from 'react-data-table-component';

const BASE_URL = process.env.REACT_APP_API_URL || '';

export default function User() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { name: 'S.No', selector: (row, index) => index + 1 },
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'User Name', selector: row => row.username, sortable: true },
    { name: 'Phone', selector: row => row.phone, sortable: true },
    { name: 'Role', selector: row => row.role, sortable: true },
    {
      name: 'Delete',
      cell: row => (
        <button className='btn p-0' onClick={() => deleteItem(row._id)}>
          <i className='fa fa-trash text-danger'></i>
        </button>
      ),
      sortable: false,
    }
  ];

  async function deleteItem(_id) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await fetch(`${BASE_URL}/api/user/${_id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            "Authorization": localStorage.getItem("token")
          }
        });
        getAPIData(); // Refresh list
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  }

  async function getAPIData() {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/user`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "Authorization": localStorage.getItem("token")
        }
      });
      const result = await response.json();
      setData(result.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAPIData();
  }, []);

  return (
    <>
      <div className='d-flex'>
        <Sidebar />
        <div className="container-fluid" style={{ marginLeft: "80px" }}>
          <div className="row gap-4">
            <div className="col-md-12">
              <h5 className='bg-primary text-light p-2 text-center m-2'>User List</h5>
              <div className="table-responsive">
                <DataTable
                  columns={columns}
                  data={data}
                  pagination
                  paginationPerPage={10}
                  progressPending={loading}
                  highlightOnHover
                  responsive
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}