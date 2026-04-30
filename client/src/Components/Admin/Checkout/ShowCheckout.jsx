import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCheckout, updateCheckout } from "../../../Store/ActionCreators/CheckoutActionCreators"

export default function ShowCheckout() {

    const { id } = useParams()
    const dispatch = useDispatch()

    const CheckoutStateData = useSelector(
        state => state.CheckoutStateData
    )

    const [data, setData] = useState({})
    const [user, setUser] = useState({})
    const [orderstatus, setOrderStatus] = useState("")
    const [paymentstatus, setPaymentStatus] = useState("")

    // 1️⃣ Fetch checkout list ONCE
    useEffect(() => {
        dispatch(getCheckout())
    }, [dispatch])

    // 2️⃣ Find single checkout by ID
    useEffect(() => {
        if (CheckoutStateData.length) {
            const item = CheckoutStateData.find(x => x._id === id)

            if (item) {
                setData(item)
                setOrderStatus(item.orderstatus)
                setPaymentStatus(item.paymentstatus)

                fetch("/api/user/" + item.userid, {
                    method: "GET",
                    headers: { "content-type": "application/json" }
                })
                .then(res => res.json())
                .then(userData => setUser(userData))
            }
        }
    }, [CheckoutStateData, id])

    function getInputData(e) {
        const { name, value } = e.target
        if (name === "orderstatus") setOrderStatus(value)
        else setPaymentStatus(value)
    }

    function updateItem() {
        dispatch(updateCheckout({
            ...data,
            orderstatus,
            paymentstatus
        }))
    }

    function getDate(a) {
        if (!a) return ""
        const date = new Date(a)
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }

    return (
        <div className="container-fluid my-3">
            <div className="row">
                <div className="col-md-3">
                    <Sidebar />
                </div>

                <div className="col-md-9">
                    <h5 className='bg-primary text-light p-2 text-center'>
                        Checkout Query
                    </h5>

                    <table className='table table-bordered'>
                        <tbody>
                        
                            <tr><th>ID</th><td>{data._id}</td></tr>
                            

                            <tr>
                                <th>User</th>
                                <td>
                                    {user?.name}<br />
                                    {user?.phone}, {user?.email}<br />
                                    {user?.address}<br />
                                    {user?.pin}, {user?.city}, {user?.state}
                                </td>
                            </tr>

                            <tr>
                                <th>Order Status</th>
                                <td>
                                    {data.orderstatus}
                                    {data.orderstatus !== "Delivered" &&
                                        <select
                                            name="orderstatus"
                                            value={orderstatus}
                                            onChange={getInputData}
                                            className="form-select mt-3"
                                        >
                                            <option>Order is Placed</option>
                                            <option>Packed</option>
                                            <option>Ready to Ship</option>
                                            <option>Shipped</option>
                                            <option>Order in Transit</option>
                                            <option>Order Reached to the Final Delivery Station</option>
                                            <option>Our for Delivery</option>
                                            <option>Delivered</option>
                                        </select>
                                    }
                                </td>
                            </tr>

                            <tr><th>Payment Mode</th><td>{data.paymentmode}</td></tr>

                            <tr>
                                <th>Payment Status</th>
                                <td>
                                    {data.paymentstatus}
                                    {data.paymentstatus !== "Done" &&
                                        <select
                                            name="paymentstatus"
                                            value={paymentstatus}
                                            onChange={getInputData}
                                            className="form-select mt-3"
                                        >
                                            <option>Pending</option>
                                            <option>Done</option>
                                        </select>
                                    }
                                </td>
                            </tr>

                            <tr><th>Subtotal</th><td>₹{data.subtotal}</td></tr>
                            <tr><th>Shipping</th><td>₹{data.shipping}</td></tr>
                            <tr><th>Total</th><td>₹{data.total}</td></tr>
                            <tr><th>Date</th><td>{getDate(data.date)}</td></tr>
                            <tr><th>RPPID</th><td>{data.rppid}</td></tr>

                            <tr>
                                <td colSpan={2}>
                                    {data.orderstatus !== "Delivered" &&
                                     data.paymentstatus !== "Done" &&
                                        <button
                                            className="btn btn-primary w-100"
                                            onClick={updateItem}
                                        >
                                            Update
                                        </button>
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
