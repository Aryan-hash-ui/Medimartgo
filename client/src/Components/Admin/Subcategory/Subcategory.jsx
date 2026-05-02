import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSubcategory, getSubcategory } from "../../../Store/ActionCreators/SubcategoryActionCreators";
import DataTable from 'react-data-table-component';

export default function Subcategory() {
  const dispatch = useDispatch();
  const SubcategoryStateData = useSelector((state) => state.SubcategoryStateData);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(getSubcategory());
  }, [dispatch]);

  // Update local state when Redux updates
  useEffect(() => {
    if (SubcategoryStateData?.data?.length > 0) {
      setData(SubcategoryStateData.data);
      setLoading(false);
    } else if (SubcategoryStateData?.length > 0) {
      setData(SubcategoryStateData);
      setLoading(false);
    } else if (SubcategoryStateData !== undefined) {
      setLoading(false);
    }
  }, [SubcategoryStateData]);

  const deleteItem = (_id) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      dispatch(deleteSubcategory({ _id }));
      // No need to call getAPIData manually - Redux will update
    }
  };

  const columns = [
    {
      name: 'Id',
      selector: row => row._id,
      sortable: true,
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Edit',
      cell: row => (
        <Link to={`/admin/subcategory/update/${row._id}`}>
          <i className='fa fa-edit text-success'></i>
        </Link>
      ),
      sortable: false,
    },
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

  return (
    <>
      <div className='d-flex'>
        <Sidebar />
        <div className="container-fluid" style={{ marginLeft: "80px" }}>
          <div className="row gap-4">
            <div className="col-md-12">
              <h5 className='bg-primary text-light p-2 m-2 text-center'>
                Subcategory 
                <Link to="/admin/subcategory/create">
                  <i className='fa fa-plus text-light float-end'></i>
                </Link>
              </h5>

              <div className="table-responsive">
                <DataTable
                  columns={columns}
                  data={data}
                  pagination
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