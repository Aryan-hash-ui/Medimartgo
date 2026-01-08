import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import DataTable from 'react-data-table-component';

import { getCheckout } from "../../../Store/ActionCreators/CheckoutActionCreators"
export default function AdminCheckout() {
    const columns = [
         {
    name: 'S.No',
    selector: (row, index) => index + 1,
   
  },
        {
            name: 'Order Status',
            selector: row => row.orderstatus,
            sortable: true,
        },
        {
            name: 'Payment Mode',
            selector: row => row.paymentmode,
            sortable: true,
        },
        {
            name: 'Payment Status',
            selector: row => row.paymentstatus,
            sortable: true,
        },
        {
            name: 'Sub Total',
            selector: row => <p>&#8377;{row.subtotal}</p>,
            sortable: true,
        },
        {
            name: 'Shipping',
            selector: row => <p>&#8377;{row.shipping}</p>,
            sortable: true,
        },
        {
            name: 'Total',
            selector: row => <p>&#8377;{row.total}</p>,
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => new Date(row.date).toLocaleDateString(),
            sortable: true,
        },
        {
            name: 'RPPID',
            selector: row => row.rppid,
            sortable: true,
        },
       {
        name: 'Show',
        cell: row => (
            <Link to={`/admin/checkout/show/${row._id}`}>
                <i className='fa fa-eye text-success'></i>
            </Link>
        )
    }
    ]
    let [data, setData] = useState([])
    let dispatch = useDispatch()
    let CheckoutStateData = useSelector((state) => state.CheckoutStateData)
    function getAPIData() {
        dispatch(getCheckout())
        if (CheckoutStateData.length) {
            setData(CheckoutStateData)
        }
    }
    useEffect(() => {
    dispatch(getCheckout())
}, [dispatch])

useEffect(() => {
    if (CheckoutStateData.length) {
        setData(CheckoutStateData)
    }
}, [CheckoutStateData])

    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-1">
                        <Sidebar />
                    </div>
                    <div className="col-md-11">
                        <h5 className='bg-primary text-light p-2 text-center'>All Orders</h5>
                        <div className="table-responsive">
                           
                             <DataTable
                                className='table'
                                columns={columns}
                                data={data}
                                pagination = {true}
                                load
                                 keyField="_id"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
