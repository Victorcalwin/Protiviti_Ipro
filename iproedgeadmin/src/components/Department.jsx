import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import { FaFilter, FaTimes, FaEye, FaTrashAlt, FaEdit } from "react-icons/fa";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button, Form, Table } from "react-bootstrap";
import { BsPencil, BsTrash } from 'react-icons/bs';
import ENV from '../ENV';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const customStyles = {
  content: {
    top: '20%',
    left: '35%',
    right: '35%',
    bottom: '30%',
  },
  overlay: {
    backgroundColor: 'rgb(34 41 47 / 95%)',
    zIndex: '11',
    opacity: '1',
    backdropFilter: 'blur(10px)'
  }
};


const Department = () => {
  const [openBackDrop, setOpenBackDrop] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [editdepartmentsVal, setEditDepartmentsVal] = useState();
  const [departmentsVal, setDepartmentsVal] = useState();
  const [editdescription, setEditDescription] = useState();
  const [description, setDescription] = useState();
  const [displayorder, setDisplayorder] = useState();
  const [error, setError] = useState({})
  const [refresh, setRefresh] = useState(false);
  const [file, setFile] = useState(null)
  const [updateDept, setUpdateDept] = useState({
    id: '', 
    name: '',
    description: '',
  })

  let postdata = {}

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  useEffect(() => {
    axios
      .get(`${ENV.API_END_POINT}departments/Get_departments`)
      .then((res) => {
        setDepartments(res.data)
        setOpenBackDrop(false)
      })
      .catch((error) => { });
  }, [refresh]);

  console.log(departments, "sdmnbjsdfvb")

  const handleSubmit = async () => {
    if(file){
      const formData = new FormData();
      formData.append('excelFile', file);

      await axios.post(
          'http://localhost:8698/departments/Create_bulk_department',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } },
        )
        setRefresh(true)
          window.location.reload()

  }else{

    let err = {}
      err.department = departmentsVal == "" || departmentsVal == null ? "Mandatory Field":""
      err.description = description == "" || description == null ? "Mandatory Field":""
  
    await setError(err)
  
    if (Object.keys(err).length) {
      const isEmpty = Object.values(err).every((x) => x === "");
      console.log(isEmpty, "rcc");
      if (isEmpty === true) {
        
        postdata.name = departmentsVal;
        postdata.description = description;
        // postdata.display_order = displayorder;
        postdata.status = "ACTIVE";
  
        await axios
          .post(`${ENV.API_END_POINT}departments/Create_department`, (postdata))
          .then((res) => {
            console.log("kjsndjcsdnckjndc")
            Toast.fire({ icon: 'success', title: `Department Added Successfully` })
            setRefresh(true)
            setIsModalOpen(false)
          })
          .catch((error) => { });
      }
      
    }
  }



  }

  const handleEdit = async (item) => {

    let err = {}
      err.editdepartment = updateDept.name == "" || updateDept.name == null ? "Mandatory Field":""
      err.editdescription = updateDept.description == "" || updateDept.description == null ? "Mandatory Field":""

    await setError(err)

    if (Object.keys(err).length) {
      const isEmpty = Object.values(err).every((x) => x === "");
      console.log(isEmpty, "rcc");
      if (isEmpty === true) {
        
        postdata.name = updateDept.name;
        postdata.id = updateDept.id;
        postdata.description = updateDept.description;
        // postdata.display_order = displayorder;
        postdata.status = "ACTIVE";

        await axios
          .post(`${ENV.API_END_POINT}departments/Update_department`, (postdata))
          .then((res) => {
            console.log("kjsndjcsdnckjndc")
            Toast.fire({ icon: 'success', title: `Updated Successfully` })
            setRefresh(true)
            setIsEditModalOpen(false)
          })
          .catch((error) => { });
      }
      
    }


  }

  const handlepencil = (item) => {
    setUpdateDept({
      id: item.id, 
      name: item.name,
      description: item.description,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e3b912',
      cancelButtonColor: '#A0A0A0',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        axios.get(`${ENV.API_END_POINT}departments/Remove_dept/${item.id}`).then((res) => {
          Toast.fire({ icon: 'success', title: `Deleted` })
          setRefresh(true)
        })
      }
    })

  };

  return (
    <>
      <div className='table-view'>
        <div className='row'>
          <div className='col'>
            <h4 style={{ marginTop: '10px', marginLeft: '6px', color: 'white' }}>Department Master</h4>

          </div>
          <div className='col'>
            <button className='add_btn' style={{padding:'0px 30px'}} onClick={() => setIsModalOpen(true)}>Add Department</button>
          </div>
        </div>
        <div style={{ height: '520px', overflowY: 'scroll', background: '#000' }}>
          <Table style={{ backgroundColor: '#4b4b4b',color:'#fff', fontSize: '12px' }}>
            <thead style={{ backgroundColor: '#353535', color: '#fff', position: 'sticky', top: -1, zIndex: 1,height:'50px',verticalAlign:'middle' }}>
              <tr>
                <th style={{width:'20%',fontWeight:'400'}}>Name</th>
                <th style={{width:'65%',fontWeight:'400'}}>Description</th>
                {/* <th>Display Order </th> */}
                <th style={{fontWeight:'400' }}>Status</th>
                <th style={{ width: '80px',fontWeight:'400' }}>Action</th>
              </tr>
            </thead>
            <tbody style={{fontSize:'11px'}}>
              {departments.map((item, key) => (
                <tr key={item.display_order}>
                  <td>

                    {item.name}
                  </td>
                  <td>{item.description}</td>
                  {/* <td>{item.display_order}</td> */}
                  <td>{item.status}</td>
                  <td>
                    {<BsPencil className="action_btn" style={{ cursor: 'pointer', marginRight: '8px', }} onClick={() => handlepencil(item)} />}
                    {<BsTrash className="action_btn" style={{ marginRight: '10px', cursor: 'pointer', marginRight: '8px', }} onClick={() => handleDelete(item)} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <Modal isOpen={isModalOpen} style={customStyles}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: '20px', textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'row' }}>
            <h4>Department</h4>
            <FaTimes onClick={() => setIsModalOpen(false)} style={{ float: 'right', cursor: 'pointer', marginLeft: 'auto' }} />
          </div>
          <Form
            style={{ width: '100%', marginTop: '20px' }}
          >
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Control type="textArea" placeholder="Enter Department Name" onChange={(e) => {
                setDepartmentsVal(e.target.value)
                if (e.target.value.length > 0) {
                  error.department = "";
          
                  setError({ ...error });
                } else {
                  error.department = "Mandatory Field";
                  setError({ ...error });
                }
              }} />
              <p style={{ color: 'red', fontSize: '10px' }}>{error.department ? error.department : ""}</p>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Control as="textarea" rows={3} placeholder="Enter Description" onChange={(e) => {
                setDescription(e.target.value)
                // setDepartmentsVal(e.target.value)
                if (e.target.value.length > 0) {
                  error.description = "";
          
                  setError({ ...error });
                } else {
                  error.description = "Mandatory Field";
                  setError({ ...error });
                }
              }} />
              <p style={{ color: 'red', fontSize: '10px' }}>{error.description ? error.description : ""}</p>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Bulk Department Upload</Form.Label>
              <Form.Control type="file"
              // label={file}
              onChange={(e) => setFile(e.target.files[0])} />
            </Form.Group>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Button style={{ width: '220px', backgroundColor: '#e3b912', borderColor: '#e3b912' }} onClick={handleSubmit}>Add Department</Button>
            </div>

          </Form>
        </div>

      </Modal>
      <Modal isOpen={isEditModalOpen} style={customStyles}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: '20px', textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'row' }}>
            <h4>Edit Department</h4>
            <FaTimes onClick={() => setIsEditModalOpen(false)} style={{ float: 'right', cursor: 'pointer', marginLeft: 'auto' }} />
          </div>
          <Form
            style={{ width: '100%', marginTop: '20px' }}
          >
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Control type="textArea" placeholder="Enter Department Name" 
                value={updateDept.name}
                onChange={(e) => { setUpdateDept(prevState => ({ ...prevState, name: e.target.value }))
                if (e.target.value.length > 0) {
                  error.editdepartment = "";
          
                  setError({ ...error });
                } else {
                  error.editdepartment = "Mandatory Field";
                  setError({ ...error });
                }
              }} />
              <p style={{ color: 'red', fontSize: '10px' }}>{error.editdepartment ? error.editdepartment : ""}</p>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Control as="textarea" rows={3} placeholder="Enter Description" 
                value={updateDept.description}
                onChange={(e) => { setUpdateDept(prevState => ({ ...prevState, description: e.target.value })) 
                // setDepartmentsVal(e.target.value)
                if (e.target.value.length > 0) {
                  error.editdescription = "";
          
                  setError({ ...error });
                } else {
                  error.editdescription = "Mandatory Field";
                  setError({ ...error });
                }
              }} />
              <p style={{ color: 'red', fontSize: '10px' }}>{error.editdescription ? error.editdescription : ""}</p>
            </Form.Group>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Button style={{ width: '220px', backgroundColor: '#e3b912', borderColor: '#e3b912' }} onClick={handleEdit}>Update Department</Button>
            </div>

          </Form>
        </div>

      </Modal>
      <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackDrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
    </>
  )
}

export default Department;
