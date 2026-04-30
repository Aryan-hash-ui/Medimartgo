import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteContactUs,
  getContactUs,
  updateContactUs
} from "../../../Store/ActionCreators/ContactUsActionCreators"

export default function ShowContact() {

  const { id } = useParams()   // ✅ matches route
  const [data, setData] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const ContactusStateData = useSelector(
    (state) => state.ContactusStateData
  )

  useEffect(() => {
    dispatch(getContactUs())
  }, [])

  useEffect(() => {
    if (ContactusStateData.length) {
      const item = ContactusStateData.find(x => x._id === id)
      setData(item || {})
    }
  }, [ContactusStateData, id])

  function updateItem() {
    dispatch(updateContactUs({ ...data, status: "Done" }))
  }

  function deleteItem() {
    if (window.confirm("Are You Sure!!!")) {
      dispatch(deleteContactUs({ _id: id }))
      navigate("/admin/contactus")
    }
  }

  function getDate(a) {
    return a ? new Date(a).toLocaleDateString() : ""
  }

  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>

        <div className="col-md-9">
          <h5 className='bg-primary text-light p-2 text-center'>
            ContactUs Query
          </h5>

          <table className='table table-bordered'>
            <tbody>
              <tr><th>ID</th><td>{data._id}</td></tr>
              <tr><th>Name</th><td>{data.name}</td></tr>
              <tr><th>Email</th><td>{data.email}</td></tr>
              <tr><th>Phone</th><td>{data.phone}</td></tr>
              <tr><th>Subject</th><td>{data.subject}</td></tr>
              <tr><th>Message</th><td>{data.message}</td></tr>
              <tr><th>Date</th><td>{getDate(data.date)}</td></tr>
              <tr><th>Status</th><td>{data.status}</td></tr>

              <tr>
                <td colSpan={2}>
                  {data.status === "Active"
                    ? <button className='btn btn-success w-100' onClick={updateItem}>
                        Update Status to Done
                      </button>
                    : <button className='btn btn-danger w-100' onClick={deleteItem}>
                        Delete
                      </button>}
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
