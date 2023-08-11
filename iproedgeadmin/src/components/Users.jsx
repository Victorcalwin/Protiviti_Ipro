import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Modal from 'react-modal'
import { Button, Form, Table } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import axios from "axios";
import { BsPencil, BsTrash } from 'react-icons/bs';
import Swal from 'sweetalert2';
// import { FaTrashAlt, FaEdit } from "react-icons/fa";
import ENV from '../ENV';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


function Users() {
    const [openBackDrop, setOpenBackDrop] = React.useState(true);
    const [show, setShow] = useState(false);
    const [updateShow, setUpdateShow] = useState(false)
    const [color, setColor] = useState(["#000000"]);
    // const [contact, setContact] = useState(content);
    const [ltr, setLtr] = useState([]);
    const [context, setContext] = useState([]);
    const [firstname, setFirstName] = useState();
    const [email, setEmail] = useState();
    const [phonenumber, setPhonenumber] = useState();
    const [desgination, setDesgination] = useState("");
    const [organization, setOrganization] = useState("");
    const [updateuser, setUpdateUser] = useState({})
    const [lastname, setLastName] = useState();
    const [userActive, setUserActive] = useState()
    const [data, setData] = useState([]);
    const [role, setRole] = useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [error, setError] = useState({})
  const [file, setFile]= useState(null)

    const handleUpdateShow = () => setUpdateShow(true)
    const handleUpdateClose = () => setUpdateShow(false)

    useEffect(() => {
        getAllUsers()

    }, [])
    const getAllUsers = () => {
        axios
            .get(`${ENV.API_END_POINT}UsersLogin/Get_Users`)
            .then((res) => {
                setData(res.data)
                setOpenBackDrop(false)
            })
        axios
            .get(`${ENV.API_END_POINT}UsersLogin/get_role`)
            .then((res) => {
                setRole(res.data)
                console.log(res.data)
            })
    }

    const handlepencil = (user) => {
        console.log("kjhgvwcqws", user)
        setUpdateUser({
            id: user.id,
            firstname: user.first_name,
            lastname: user.last_name,
            mobile: user.mobile,
            email: user.email,
            designation: user.role_id,
        });
        setUpdateShow(true);
    };

    const handleEdit = async (item) => {

        let err = {}
        err.editfirstname = updateuser.firstname == "" || updateuser.firstname == null ? "Mandatory Field" : ""
        err.editlastname = updateuser.lastname == "" || updateuser.lastname == null ? "Mandatory Field" : ""
        err.editemail = updateuser.email == "" || updateuser.email == null ? "Mandatory Field" : ""
        err.editphonenumber = updateuser.mobile == "" || updateuser.mobile == null ? "Mandatory Field" : ""
        err.editdesgination = updateuser.designation == "" || updateuser.designation == null ? "Mandatory Field" : ""


        await setError(err)

        if (Object.keys(err).length) {
            const isEmpty = Object.values(err).every((x) => x === "");
            console.log(isEmpty, "rcc");
            if (isEmpty === true) {
                let postdata = {}

                postdata.id = updateuser.id
                postdata.firstname = updateuser.firstname
                postdata.lastname = updateuser.lastname
                postdata.email = updateuser.email
                postdata.mobile = updateuser.mobile
                postdata.designation = updateuser.designation

                await axios
                    .post(`${ENV.API_END_POINT}UsersLogin/update_user`, (postdata))
                    .then((res) => {
                        console.log(res.data, "dhbsmhnbsmndbmndmn")
                        // setRefresh(true)
                        // window.location.reload()
                        setUpdateShow(false);
                        getAllUsers()
                    })
                    .catch((error) => { });
            }

        }


    }
    const customStyles = {
        content: {
            top: '15%',
            left: '35%',
            right: '35%',
            bottom: '25%',
        },

        overlay: {
            backgroundColor: 'rgb(34 41 47 / 95%)',
            zIndex: '11',
            opacity: '1',
            backdropFilter: 'blur(10px)'

        }

    };
    function closeModal() {
        setUpdateShow(false);
    }
    const adduser = async () => {
        
        if(file){
            const formData = new FormData();
            formData.append('excelFile', file);
    
            await axios.post(
                'http://localhost:8698/UsersLogin/Create_bulk_user',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } },
              )
            //   setRefresh(true)
            //     window.location.reload()
        }else{

            let err = {}
            err.firstname = firstname != "" && firstname != null ? "" : "Mandatory Field"
            err.lastname = lastname != "" && lastname != null ? "" : "Mandatory Field"
            err.email = email != "" && email != null ? "" : "Mandatory Field"
            err.phonenumber = phonenumber != "" && phonenumber != null ? "" : "Mandatory Field"
            err.desgination = desgination != "" && desgination != null ? "" : "Mandatory Field"
    
            setError(err);
    
            console.log(err, "asdfosdj")
    
            if (Object.keys(err).length) {
                const isEmpty = Object.values(err).every((x) => x === "");
                console.log(isEmpty, "rccccc");
                if (isEmpty === true) {
                    const newUser = {
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        mobile: phonenumber,
                        company_name: organization,
                        designation: desgination,
                        status: userActive,
                        created_on: new Date().toLocaleDateString("In"),
                        invited_by: "Admin"
                    };
    
                    await axios
                        .post(`${ENV.API_END_POINT}UsersLogin/create_user`, { newUser })
                        .then((res) => {
                            getAllUsers();
                        })
                        .catch((error) => { });
                    setData(prevData => [...prevData, newUser]);
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setPhonenumber("");
                    setOrganization("");
                    setDesgination("");
                    setUserActive("");
                    setShow(false);
                    // window.location.reload()
    
                }
            }
        }

    };

    const handleDelete = (item) => {
        console.log(item, 'iiiiiiii')
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
                axios.get(`${ENV.API_END_POINT}UsersLogin/Remove_user/${item.id}`).then((res) => {
                    // alert('Cinema successfully deleted')
                    // window.location.reload()
                    getAllUsers()
                })
            }
        })

    };


    return (
        <>
            <div style={{ margin: '0px 60px' }}>
                <div style={{ justifyContent: "space-between", display: "flex", alignItems: "center" }}>
                    <div style={{ textAlign: "left" }}>
                        <h4 style={{ marginTop: '10px', marginLeft: '6px', color: 'white', fontFamily: 'Poppins', fontStyle: 'normal' }}>Users</h4>
                    </div>
                    <div className='col'>
                        <button className='add_btn' style={{ padding: '0px 30px' }} onClick={handleShow}>New User</button>
                    </div>
                </div>
                <div>
                    {/* <div className="row">
                        <div className="table-responsive ">
                        

                        </div>
                    </div> */}
                    <div style={{ height: '500px', overflowY: 'scroll', background: '#000' }}>
                        <Table style={{ backgroundColor: '#4b4b4b', color: '#fff', fontSize: '12px' }} >
                            <thead style={{ backgroundColor: '#353535', height: '50px', verticalAlign: 'middle', color: '#fff', position: 'sticky', top: -1, zIndex: 1, }}>
                                <tr>
                                    <th style={{ fontWeight: '400' }}>Name</th>
                                    <th style={{ fontWeight: '400' }}>Email ID</th>
                                    <th style={{ fontWeight: '400' }}>Phone Number</th>
                                    <th style={{ fontWeight: '400' }}>Role</th>
                                    {/* <th>Role Id</th> */}
                                    <th style={{ fontWeight: '400' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: '11px' }}>
                                {data.map((item, key) => (
                                    <tr key={item.ID}>
                                        <td>
                                            {item.first_name} {item.last_name}
                                        </td>
                                        <td>{item.email}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.name}</td>
                                        {/* <td>{item.role_id}</td> */}
                                        <td >
                                            <BsPencil className="action_btn" style={{ cursor: 'pointer', marginRight: '8px', marginTop: '5px' }} onClick={() => handlepencil(item)} />
                                            <BsTrash className="action_btn" style={{ cursor: 'pointer', marginRight: '8px', marginTop: '5px' }} onClick={() => handleDelete(item)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        isOpen={show}
                        onRequestClose={handleClose}
                        style={customStyles}
                    >
                        <div style={{ textAlign: 'center' }}><h4>Invite New User</h4></div><hr />
                        <Form style={{}}>
                            <Form.Group className="mb-3 shadow bg-white rounded m-2">
                                <Form.Control
                                    type="text"
                                    onChange={(e) => {
                                        setFirstName(e.target.value)
                                        if (e.target.value.length > 0) {
                                            error.firstname = "";

                                            setError({ ...error });
                                        } else {
                                            error.firstname = "Mandatory Field";
                                            setError({ ...error });
                                        }
                                    }}
                                    placeholder="First Name*"

                                />
                            </Form.Group>
                            <p style={{ color: 'red', fontSize: '10px' }}>{error.firstname ? error.firstname : ""}</p>
                            <Form.Group className="mb-3 shadow bg-white rounded m-2">
                                <Form.Control
                                    type="text"
                                    onChange={(e) => {
                                        setLastName(e.target.value)
                                        if (e.target.value.length > 0) {
                                            error.lastname = "";

                                            setError({ ...error });
                                        } else {
                                            error.lastname = "Mandatory Field";
                                            setError({ ...error });
                                        }
                                    }
                                    }
                                    placeholder="Last Name*"

                                />
                            </Form.Group>
                            <p style={{ color: 'red', fontSize: '10px' }}>{error.lastname ? error.lastname : ""}</p>
                            <Form.Group className="mb-3 shadow bg-white rounded m-2">
                                <Form.Control
                                    type="text"
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        if (e.target.value.length > 0) {
                                            error.email = "";

                                            setError({ ...error });
                                        } else {
                                            error.email = "Mandatory Field";
                                            setError({ ...error });
                                        }
                                    }}
                                    placeholder="Email ID*"
                                />
                            </Form.Group>
                            <p style={{ color: 'red', fontSize: '10px' }}>{error.email ? error.email : ""}</p>
                            <Form.Group className="mb-3 shadow bg-white rounded m-2">
                                <Form.Control
                                    maxLength={10}
                                    type="number"
                                    onChange={(e) => {
                                        setPhonenumber(e.target.value)
                                        if (e.target.value) {
                                            error.phonenumber = "";

                                            setError({ ...error });
                                        } else {
                                            error.phonenumber = "Mandatory Field";
                                            setError({ ...error });
                                        }
                                    }}

                                    placeholder="Phone Number"
                                />
                            </Form.Group>
                            <p style={{ color: 'red', fontSize: '10px' }}>{error.phonenumber ? error.phonenumber : ""}</p>
                            <Form.Group className="mb-3 shadow bg-white rounded m-2">

                                <Form.Control as="select" onChange={(e) => {
                                    setDesgination(e.target.value)
                                    if (e.target.value) {
                                        error.desgination = "";

                                        setError({ ...error });
                                    } else {
                                        error.desgination = "Mandatory Field";
                                        setError({ ...error });
                                    }
                                }}>
                                    <option value="" disabled selected>
                                        Select Role
                                    </option>
                                    {role.map((item, key) => {
                                        return (
                                            <option value={item.id}>{item.name}</option>
                                        )
                                    })}

                                </Form.Control>
                            </Form.Group>
                            <p style={{ color: 'red', fontSize: '10px' }}>{error.desgination ? error.desgination : ""}</p>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Bulk User Upload</Form.Label>
                                <Form.Control type="file"
                                // label={file}
                                onChange={(e) => setFile(e.target.files[0])} />
                                </Form.Group>

                        </Form>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                            <Button type="submit" style={{ marginTop: '7px', width: '220px', backgroundColor: '#e3b912', borderColor: '#e3b912' }} onClick={() => adduser()}>Add User</Button></div>
                        {/* </Modal.Body> */}
                    </Modal>
                    <Modal
                        show={updateShow}
                        onHide={handleUpdateClose}
                        isOpen={updateShow}
                        onRequestClose={handleUpdateClose}
                        style={customStyles}
                    >
                        <div style={{ textAlign: 'center' }}><h4>Edit User</h4></div><hr />
                        <Form style={{}}>
                            <Form.Group className="mb-3 shadow bg-white rounded m-2">
                                <Form.Control
                                    type="text"
                                    value={updateuser.firstname}
                                    onChange={(e) => {
                                        setUpdateUser({ ...updateuser, firstname: e.target.value })
                                        if (e.target.value.length > 0) {
                                            error.editfirstname = "";

                                            setError({ ...error });
                                        } else {
                                            error.editfirstname = "Mandatory Field";
                                            setError({ ...error });
                                        }
                                    }}
                                    placeholder="First Name*"

                                />
                            </Form.Group>
                            <p style={{ color: 'red', fontSize: '10px' }}>{error.editfirstname ? error.editfirstname : ""}</p>
                            <Form.Group className="mb-3 shadow bg-white rounded m-2">
                                <Form.Control
                                    type="text"
                                    value={updateuser.lastname}
                                    onChange={(e) => {
                                        setUpdateUser({ ...updateuser, lastname: e.target.value })
                                        if (e.target.value.length > 0) {
                                            error.editlastname = "";

                                            setError({ ...error });
                                        } else {
                                            error.editlastname = "Mandatory Field";
                                            setError({ ...error });
                                        }
                                    }
                                    }
                                    placeholder="Last Name*"

                                />
                            </Form.Group>
                            <p style={{ color: 'red', fontSize: '10px' }}>{error.editlastname ? error.editlastname : ""}</p>
                            <Form.Group className="mb-3 shadow bg-white rounded m-2">
                                <Form.Control
                                    type="text"
                                    value={updateuser.email}
                                    onChange={(e) => {
                                        setUpdateUser({ ...updateuser, email: e.target.value })
                                        if (e.target.value.length > 0) {
                                            error.editemail = "";

                                            setError({ ...error });
                                        } else {
                                            error.editemail = "Mandatory Field";
                                            setError({ ...error });
                                        }
                                    }}
                                    placeholder="Email ID*"
                                />
                            </Form.Group>
                            <p style={{ color: 'red', fontSize: '10px' }}>{error.editemail ? error.editemail : ""}</p>
                            <Form.Group className="mb-3 shadow bg-white rounded m-2">
                                <Form.Control
                                    maxLength={10}
                                    type="number"
                                    value={updateuser.mobile}
                                    // disabled
                                    onChange={(e) => {
                                        setUpdateUser({ ...updateuser, mobile: e.target.value })
                                        if (e.target.value) {
                                            error.editphonenumber = "";

                                            setError({ ...error });
                                        } else {
                                            error.editphonenumber = "Mandatory Field";
                                            setError({ ...error });
                                        }
                                    }}
                                    placeholder="Phone Number"
                                />
                            </Form.Group>
                            <p style={{ color: 'red', fontSize: '10px' }}>{error.editphonenumber ? error.editphonenumber : ""}</p>
                            <Form.Group className="mb-3 shadow bg-white rounded m-2">

                                <Form.Control as="select" value={updateuser.designation}
                                    onChange={(e) => {
                                        setUpdateUser({ ...updateuser, designation: e.target.value })
                                        if (e.target.value) {
                                            error.editdesgination = "";

                                            setError({ ...error });
                                        } else {
                                            error.editdesgination = "Mandatory Field";
                                            setError({ ...error });
                                        }
                                    }}>
                                    <option value="" disabled selected>
                                        Select Role
                                    </option>
                                    {role.map((item, key) => {
                                        return (
                                            <option value={item.id}>{item.name}</option>
                                        )
                                    })}

                                </Form.Control>
                            </Form.Group>
                            <p style={{ color: 'red', fontSize: '10px' }}>{error.editdesgination ? error.editdesgination : ""}</p>

                        </Form>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                            <Button type="submit" style={{ marginTop: '7px', width: '220px', backgroundColor: '#e3b912', borderColor: '#e3b912' }} onClick={() => handleEdit()}>Save Changes</Button></div>
                        {/* </Modal.Body> */}
                    </Modal>


                    {/* <!---  Box ---> */}
                    <div className="model_box">
                    </div>
                </div>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackDrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}

export default Users;
