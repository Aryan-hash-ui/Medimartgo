import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { deleteBrand, getBrand } from "../../../Store/ActionCreators/BrandActionCreators"
import DataTable from 'react-data-table-component';
export default function Brand() {
    const columns = [
       {
            name: 'S.No',
            selector: (row, index) => index + 1,

        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Edit',
            selector: row => <Link to={`/admin/brand/update/${row._id}`}><i className='fa fa-edit text-success'></i></Link>,
            sortable: false,
        },
        {
            name: 'Delete',
            selector: row => <button className='btn' onClick={() => deleteItem(row._id)}><i className='fa fa-trash text-danger'></i></button>,
            sortable: false,
        }
    ]


    let dispatch = useDispatch()
    let [data, setData] = useState([])
    let BrandStateData = useSelector((state) => state.BrandStateData)
    function deleteItem(_id) {
        if (window.confirm("Are You Sure!!! You Want to Delete tha Item! Please Cofirm : ")) {
            dispatch(deleteBrand({ _id: _id }))
            getAPIData()
        }
    }
    function getAPIData() {
        dispatch(getBrand())
        if (BrandStateData.length) {
            setData(BrandStateData)
        }
    }
    useEffect(() => {
        getAPIData()
    }, [BrandStateData.length,data.length])
    return (
        <>
        <div className='d-flex'>
                       <Sidebar/>
            <div className="container-fluid" style={{ marginLeft: "80px"}}>

                <div className="row gap-4">
                    
                    <div className="col-md-12 ml-12">
                        <h5 className='bg-primary text-light p-2 m-2 text-center'>Brand <Link to="/admin/brand/create"><i className='fa fa-plus text-light float-end'></i></Link></h5>
                        <div className="table-responsive">
                            <DataTable
                                className='table'
                                columns={columns}
                                data={data}
                                pagination={true}
                                load

                            />
                           
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}
