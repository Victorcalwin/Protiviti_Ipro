import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-modal';
import { FaFilter, FaTimes, FaEye } from "react-icons/fa";
import { Button, Form, Table } from "react-bootstrap";
import { BsPencil, BsTrash } from 'react-icons/bs';
import Swal from 'sweetalert2';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import DropdownSelect from 'react-dropdown-select';
import AuthDetails from '../services/AuthDetails';
import ENV from '../ENV';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// import L from 'leaflet';

const customStyles = {
  content: {
    top: '9%',
    left: '25%',
    right: '25%',
    bottom: '9%',
  },
  overlay: {
    backgroundColor: 'rgb(34 41 47 / 95%)',
    zIndex: '11',
    opacity: '1',
    backdropFilter: 'blur(1px)',
  }
};


const customStylesCreate = {
  content: {
    top: '5%',
    left: '20%',
    right: '20%',
    bottom: '9%',
  },
  overlay: {
    backgroundColor: 'rgb(34 41 47 / 95%)',
    zIndex: '11',
    opacity: '2',
    backdropFilter: 'blur(9px)',
  }
};

const Cinema = () => {
  const [openBackDrop, setOpenBackDrop] = React.useState(true);
  const role = AuthDetails.getRoles()
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [allRegion, setAllregion] = useState([]);//Store the all region 
  const [allState, setStateId] = useState();//Store region id
  const [stateList, setStateList] = useState([]);//store the all state list
  const [allCity, SetAllCity] = useState();//store state id
  const [cityList, setCity] = useState([])//Store the all city list
  const [mainCity, setMainCity] = useState()//store city id
  const [department, setDepartment] = useState([])//store the all department
  const [cinema, setCenema] = useState()//Store Cinema name
  const [cinemaAddress, setCinemaAddress] = useState()//Store Cinema Address
  const [pincode, setPincode] = useState()//store cinema pincode
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [updateuser, setUpdateUser] = useState({
    id: '',
    name: '',
    address: '',
    zip_code: '',
    description: '',
    latitude: '',
    longitude: '',
    city_id: '',
    state_id: '',
    region_id: ''
  })

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


  const [show, setShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [data, setData] = useState([]);
  const [cinemaManager, setCinemaManager] = useState([])
  const [cinemaManagerId, setCinemaManagerId] = useState();
  const [cinemaCode, setCinemaCode] = useState()
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [error, setError] = useState({})
  const [file, setFile] = useState(null)


  const [updateShow, setUpdateShow] = useState(false)
  const handleClose = () => setShow(false);
  const handleUpdateClose = () => setUpdateShow(false)


  const handleEdit = (user) => {
    setUpdateUser({
      id: user.id,
      name: user.name,
      address: user.address,
      zip_code: user.zip_code,
      description: user.description,
      latitude: user.latitude,
      longitude: user.longitude,
      city_id: user.city_id,
      state_id: user.state_id,
      region_id: user.region_id
    });

    // Populate the region, state, and city values in the form fields
    axios.get(`${ENV.API_END_POINT}Cinemas/Get_All_State_By_Region/${user.region_id}`)
      .then((res) => {
        if (res.data.length > 0) {
          setStateList(res.data);
          setStateId(user.region_id);
          SetAllCity(user.state_id);

          axios.get(`${ENV.API_END_POINT}Cinemas/Get_All_Cities_By_State/${user.state_id}`)
            .then((res) => {
              setCity(res.data);
              setMainCity(user.city_id);
              setUpdateShow(true);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };






  const [Cinema, setCinema] = useState({
    name: '',
    address: "",
    city_id: '',
    zip_code: '',
    state_id: '',
    // cinemaSpocemail: '',
    // cinemaspoc: '',
  })


  const handleDelete = (user) => {
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
        axios.get(`${ENV.API_END_POINT}Cinemas/Remove_Cinema/${user.id}`).then((res) => {
          Toast.fire({ icon: 'success', title: `Deleted` })
          // window.location.reload()
        })
      }
    })

  };

  const updateCinema = () => {
    
    const update = {
      name: updateuser.name,
      address: updateuser.address,
      zip_code: updateuser.zip_code,
      description: updateuser.description,
      latitude: updateuser.latitude,
      longitude: updateuser.longitude,
      city_id: updateuser.city_id,
      state_id: updateuser.state_id,
      region_id: updateuser.region_id
    };
    const ID = updateuser.id;
    console.log(update);
    axios.post(`${ENV.API_END_POINT}Cinemas/Update_Cinema/${ID}`, update)
      .then((res) => {
        Toast.fire({ icon: 'success', title: `Updated Successfully` })
        getAllCinemas()
      })
      .catch((error) => {
        console.error(error);
      });
  };



  useEffect(() => {
    getAllCinemas()
    axios.get(`${ENV.API_END_POINT}departments/Get_departments`).then((dept) => {
      setDepartment(dept.data)
    })

    axios.get(`${ENV.API_END_POINT}Cinemas/Get_AllRegions`).then((reg) => {
      if (reg.data.length > 0) {
        setAllregion(reg.data)
      }
    })
    axios.get(`${ENV.API_END_POINT}Cinemas/Get_All_State_By_Region/${allState}`)
      .then((res) => {
        if (res.data.length > 0) {
          setStateList(res.data)
        }
      })

    axios.get(`${ENV.API_END_POINT}Cinemas/Get_All_Cities_By_State/${allCity}`)
      .then((res) => {
        setCity(res.data)
      })
    axios.get(`${ENV.API_END_POINT}UsersLogin/Get_Users`).then((res) => {
      let arr = [];
      res.data.filter(elem => {
        if (elem.role_id == 7) {
          arr.push({ name: ((elem.first_name) + " " + (elem.last_name)), userId: elem.id })
        }
        setCinemaManager(arr)
      })
    })

  }, [allState, allCity])

  const getAllCinemas = () => {
    axios.get(`${ENV.API_END_POINT}Cinemas`).then((res) => {
      if (res.data.Cinemas.length > 0) {
        setData(res.data.Cinemas)
        setOpenBackDrop(false)
      }
    })
  }

  const newAllDepartment = department.map(({ id, name }) =>
    ({ value: id, label: name }));//Get department name and id to key name change

  function selectDepartment(selectedOptions) {
    // if (selectedOptions.length > 0) {
    //   error.department = "";

    //   setError({ ...error });
    // } else {
    //   error.department = "Mandatory Field";
    //   setError({ ...error });
    // }
    selectedOptions.map((data) => {
      return setSelectedOptions(data.value);
    })
  }
  const AddCinema = async(e) => {
    e.preventDefault()
    if(file){
        const formData = new FormData();
        formData.append('excelFile', file);

        await axios.post(
          "http://localhost:8698/Cinemas/bulk_cinemas",
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } },
          )
          .then(async(res)=>{
            if (res.data.message === 'Success') {
                
                setIsModalOpen(false);
                
                console.log(res.data.message, "Success message");
                Swal.fire('Success', 'Success message', 'success'); 
              } else {
                console.log(res.data.message, "Mismatch column message");
                setIsModalOpen(false);
            
                Swal.fire(res.data.message); 
              }
            
        })
          .catch((err)=>{console.log(err)});
    }else{
      e.preventDefault()
      let err = {}
      err.cinema = cinema != "" && cinema != null ? "" : "Mandatory Field"
      err.address = cinemaAddress != "" && cinemaAddress != null ? "" : "Mandatory Field"
      err.region = allState != "" && allState != null ? "" : "Mandatory Field"
      err.state = allCity != "" && allCity != null ? "" : "Mandatory Field"
      err.city = mainCity != "" && mainCity != null ? "" : "Mandatory Field"
      err.pincode = pincode != "" && pincode != null ? "" : "Mandatory Field"
      err.department = selectedOptions > 0 ? "" : "Mandatory Field"
      err.maneger = cinemaManagerId != "" && cinemaManagerId != null ? "" : "Mandatory Field"
      err.latitude = latitude != "" && latitude != null ? "" : "Mandatory Field"
      err.longitude = longitude != "" && longitude != null ? "" : "Mandatory Field"
      err.companycode = cinemaCode != "" && cinemaCode != null ? "" : "Mandatory Field"
  
  
      setError(err);
  
      if (Object.keys(err).length) {
        const isEmpty = Object.values(err).every((x) => x === "");
        if (isEmpty === true) {
          let data = {
            name: cinema,
            address: cinemaAddress,
            region_id: parseInt(allState[0]),
            state_id: parseInt(allCity[0]),
            city_id: parseInt(mainCity[0]),
            zip_code: pincode,
            cinema_manager_id: cinemaManagerId[0],
            Department: selectedOptions,
            company_code: cinemaCode,
            latitude: latitude,
            longitude: longitude
          }
          axios.post(`${ENV.API_END_POINT}Cinemas/Add_New_Cinema`, data).then((res) => {
            console.log(res);
            setIsModalOpen(false)
            Toast.fire({ icon: 'success', title: `Cinema Created Successfully` })
            getAllCinemas()
          })
        }
  
      }
    }


  }

  return (
    <>
      {/* Add Cinema Button */}
      <div>
        {/* Add Cinema models */}
        <Modal isOpen={isModalOpen}  style={customStylesCreate}>
          <div >
            <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <h4>Add New Cinema</h4>
              <FaTimes onClick={() => setIsModalOpen(false)} style={{ float: 'right', cursor: 'pointer' }} />
            </div>
            <div className="row">
              {/* Cinema Name */}
              <div className="col-md-6 mb-1">
              <label>Cinema Name</label>
                <input name='cinemaName' className="form-control" type="text" placeholder="Enter Cinema Name"
                  onChange={(e) => {
                    setCenema(e.target.value)
                    if (e.target.value.length > 0) {
                      error.cinema = "";

                      setError({ ...error });
                    } else {
                      error.cinema = "Mandatory Field";
                      setError({ ...error });
                    }
                  }} />
                <p style={{ color: 'red', fontSize: '10px' }}>{error.cinema ? error.cinema : ""}</p>
              </div>

              {/* Cinema Address */}
              <div className="col-md-6 mb-1">
              <label>Cinema Address</label>
                <textarea rows={1} name='cinemaAddress' className="form-control" type="text" placeholder="Enter The Address" onChange={(e) => {
                  setCinemaAddress(e.target.value)
                  if (e.target.value.length > 0) {
                    error.address = "";

                    setError({ ...error });
                  } else {
                    error.address = "Mandatory Field";
                    setError({ ...error });
                  }
                }} />
                <p style={{ color: 'red', fontSize: '10px' }}>{error.address ? error.address : ""}</p>
              </div>

              {/* Select Region */}
              <div className="col-md-6 mb-1">
              <label>Cinema Region</label>
                <Form.Select className="form-control" onChange={(e) => {
                  setStateId([e.target.value])
                  if (e.target.value.length > 0) {
                    error.region = "";

                    setError({ ...error });
                  } else {
                    error.region = "Mandatory Field";
                    setError({ ...error });
                  }
                }}>
                  <option>Select Region</option>

                  {
                    allRegion.map((data) => {
                      return (
                        <option value={data.id}>{data.name}</option>
                      )
                    })
                  }
                </Form.Select>
                <p style={{ color: 'red', fontSize: '10px' }}>{error.region ? error.region : ""}</p>
              </div>

              {/* Select State */}
              <div className="col-md-6 mb-1">
              <label>Cinema State</label>
                <Form.Select className="form-control" onChange={(e) => {
                  SetAllCity([e.target.value])
                  if (e.target.value.length > 0) {
                    error.state = "";

                    setError({ ...error });
                  } else {
                    error.state = "Mandatory Field";
                    setError({ ...error });
                  }
                }}>
                  <option>Select State</option>
                  {
                    stateList.map((data) => {
                      return (
                        <option value={data.id} >{data.name}</option>
                      )
                    })
                  }
                </Form.Select>
                <p style={{ color: 'red', fontSize: '10px' }}>{error.state ? error.state : ""}</p>
              </div>

              {/* Select City */}
              <div className="col-md-6 mb-1">
              <label>Cinema City</label>
                <Form.Select className="form-control" onChange={(e) => {
                  setMainCity([e.target.value])
                  if (e.target.value.length > 0) {
                    error.city = "";

                    setError({ ...error });
                  } else {
                    error.city = "Mandatory Field";
                    setError({ ...error });
                  }
                }}>
                  <option>Select City</option>
                  {
                    cityList.map((data) => {
                      return (
                        <option value={data.id} >{data.name}</option>
                      )
                    })
                  }
                </Form.Select>
                <p style={{ color: 'red', fontSize: '10px' }}>{error.city ? error.city : ""}</p>
              </div>

              {/* Pincode  */}
              <div className="col-md-6 mb-1">
              <label>Cinema Pincode</label>
                <input name='cinemaState' className="form-control" maxLength="8" type="number" placeholder="Enter the Pincode" onChange={(e) => {
                  setPincode(e.target.value)
                  if (e.target.value.length > 0) {
                    error.pincode = "";

                    setError({ ...error });
                  } else {
                    error.pincode = "Mandatory Field";
                    setError({ ...error });
                  }
                }} />
                <p style={{ color: 'red', fontSize: '10px' }}>{error.pincode ? error.pincode : ""}</p>
              </div>
              {/* List of departments */}
              <div className='col-md-6 mb-1'>
              <label>Cinema Department's</label>
                <DropdownSelect placeholder="Select Department" addPlaceholder='Select Department' options={newAllDepartment} multi values={[]} onChange={(selectedOptions) => {
                  selectDepartment(selectedOptions)
                  if (selectedOptions.length > 0) {
                    error.department = "";

                    setError({ ...error });
                  } else {
                    error.department = "Mandatory Field";
                    setError({ ...error });
                  }
                }} />
                <p style={{ color: 'red', fontSize: '10px' }}>{error.department ? error.department : ""}</p>
              </div>

              {/* Cinema Manager */}
              <div className="col-md-6 mb-1">
              <label>Cinema Manager</label>
                <Form.Select className="form-control" onChange={(e) => {
                  setCinemaManagerId([e.target.value])
                  if (e.target.value.length > 0) {
                    error.maneger = "";

                    setError({ ...error });
                  } else {
                    error.maneger = "Mandatory Field";
                    setError({ ...error });
                  }
                }}>
                  <option>Cinema Manager</option>

                  {
                    cinemaManager.map((data) => {
                      return (
                        <option value={data.userId}>{data.name}</option>
                      )
                    })
                  }
                </Form.Select>
                <p style={{ color: 'red', fontSize: '10px' }}>{error.maneger ? error.maneger : ""}</p>
              </div>

              {/* latitude and latitude */}
              <div className="col-md-6 mb-1">
              <label>Cinema Latitude</label>
                <input
                  name='cinemaName'
                  className="form-control"
                  type="text"
                  placeholder="Cinema latitude"
                  onKeyPress={(e) => {
                    const keyCode = e.which || e.keyCode;
                    const keyValue = String.fromCharCode(keyCode);

                    if (!/^[0-9.]+$/.test(keyValue)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    setLatitude(e.target.value);

                    if (e.target.value.length > 0) {
                      setError({ ...error, latitude: '' });
                    } else {
                      setError({ ...error, latitude: 'Mandatory Field' });
                    }
                  }}
                />

                <p style={{ color: 'red', fontSize: '10px' }}>{error.latitude ? error.latitude : ""}</p>
              </div>

              <div className="col-md-6 mb-1">
              <label>Cinema Longitude</label>
                <input
                  name='cinemaName'
                  className="form-control"
                  type="text"
                  placeholder="Cinema longitude"
                  onKeyPress={(e) => {
                    const keyCode = e.which || e.keyCode;
                    const keyValue = String.fromCharCode(keyCode);

                    if (!/^[0-9.]+$/.test(keyValue)) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    setLongitude(e.target.value);

                    if (e.target.value.length > 0) {
                      setError({ ...error, longitude: '' });
                    } else {
                      setError({ ...error, longitude: 'Mandatory Field' });
                    }
                  }}
                />
                <p style={{ color: 'red', fontSize: '10px' }}>{error.longitude ? error.longitude : ""}</p>
              </div>

              <div className="col-md-6 mb-1">
              <label>Cinema Code</label>
                <input name='cinemaName' className="form-control" type="text" placeholder="Company code" onChange={(e) => {
                  setCinemaCode(e.target.value)
                  if (e.target.value.length > 0) {
                    error.companycode = "";

                    setError({ ...error });
                  } else {
                    error.companycode = "Mandatory Field";
                    setError({ ...error });
                  }
                }} />
                <p style={{ color: 'red', fontSize: '10px' }}>{error.companycode ? error.companycode : ""}</p>
              </div>
              <Form.Group controlId="formFile" className="col-md-6 mb-1">
              <Form.Label>Bulk Department Upload</Form.Label>
              <Form.Control type="file"
              // label={file}
              onChange={(e) => setFile(e.target.files[0])} />
            </Form.Group>

              <div style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingLeft: "42%" }}>
                <button className='add_btn' style={{padding:'0px 30px'}}
                  onClick={AddCinema}
                >Add Cinema</button>
              </div>
            </div>
          </div>
        </Modal>


        <Modal isOpen={updateShow}
          style={customStyles}
        >
          <div className='text-center'><h3>Edit Cinema</h3></div>
          <div className='row'>
            {/* Cinema Name */}
            <div className="col-md-6 mb-2">
              <label>Cinema Name</label>
              <input className="form-control"
                type="text"
                value={updateuser.name}
                onChange={(e) => { setUpdateUser(prevState => ({ ...prevState, name: e.target.value })) }}
                placeholder="Enter Cinema Name" />
            </div>

            {/* Cinema Address */}
            <div className="col-md-6 mb-2">
              <label>Cinema Address</label>
              <textarea rows={3} name='cinemaAddress' value={updateuser.address} className="form-control" type="text" onChange={(e) => { setUpdateUser(prevState => ({ ...prevState, address: e.target.value })) }} placeholder="Enter The Address" />
            </div>

            {/* Pincode  */}
            <div className="col-md-6 mb-2">
              <label>Cinema Pincode</label>
              <input  name='cinemaState' className="form-control" value={updateuser.zip_code}  type="number" maxLength={6} onChange={(e) => { setUpdateUser(prevState => ({ ...prevState, zip_code: e.target.value })) }} placeholder="Enter the Pincode" />
            </div>

            {/* Description */}
            <div className="col-md-6 mb-2">
              <label>Cinema Description</label>
              <textarea rows={3} name='cinemaDescription' value={updateuser.description} className="form-control" type="text" onChange={(e) => { setUpdateUser(prevState => ({ ...prevState, description: e.target.value })) }} placeholder="Enter Cinema Description" />
            </div>

            {/*latitude*/}
            <div className="col-md-6 mb-2">
              <label>Cinema latitude</label>
              <input name='cinemaDescription' value={updateuser.latitude} className="form-control" type="text"
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9.]/g, '');
                  setUpdateUser(prevState => ({ ...prevState, latitude: numericValue }));
                }}
                placeholder="Enter Cinema latitude"
              />
            </div>

            {/*longitude*/}
            <div className="col-md-6 mb-2">
              <label>Cinema longitude</label>
              <input name='cinemalongitude' value={updateuser.longitude} className="form-control" type="text"
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9.]/g, '');
                  setUpdateUser(prevState => ({ ...prevState, longitude: numericValue }));
                }}
                placeholder="Enter Cinema longitude"
              />
            </div>

            {/* Select Region */}
            <div className="col-md-6 mb-2">
              <label>Cinema Region</label>
              <Form.Select
                className="form-control"
                value={updateuser.region_id}
                onChange={(e) => {
                  const selectedRegionId = e.target.value;
                  setUpdateUser(prevState => ({ ...prevState, region_id: selectedRegionId }));
                  setStateId(selectedRegionId);

                }}
              >
                <option>Select Region</option>
                {
                  allRegion.map((data) => {
                    return (
                      <option key={data.id} value={data.id}>{data.name}</option>
                    )
                  })
                }
              </Form.Select>
            </div>

            {/* Select statename */}
            <div className="col-md-6 mb-2">
              <label>Cinema state</label>
              <Form.Select
                className="form-control"
                value={updateuser.state_id}
                onChange={(e) => {
                  const selectedStateId = e.target.value;
                  setUpdateUser(prevState => ({ ...prevState, state_id: selectedStateId }));
                  SetAllCity(selectedStateId);
                }}
              >
                <option>Select State</option>
                {
                  stateList.map((data) => {
                    return (
                      <option key={data.id} value={data.id}>{data.name}</option>
                    )
                  })
                }
              </Form.Select>
            </div>

            {/* Select City */}
            <div className="col-md-6 mb-2">
              <label>Cinema City</label>
              <Form.Select
                className="form-control"
                value={updateuser.city_id}
                onChange={(e) => {
                  setUpdateUser(prevState => ({ ...prevState, city_id: e.target.value }));
                }}
              >
                <option>Select City</option>
                {
                  cityList.map((data) => {
                    return (
                      <option key={data.id} value={data.id}>{data.name}</option>
                    )
                  })
                }
              </Form.Select>
            </div>


          </div>
          <span className='d-flex justify-content-center mt-5'>
            <Button type="submit" style={{ marginRight: '50px', marginTop: '7px', width: '100px', backgroundColor: '#e3b912', borderColor: '#e3b912' }} onClick={handleUpdateClose}>Close</Button>
            <Button type="submit" style={{ marginTop: '7px', width: '100px', backgroundColor: 'gray', borderColor: 'gray' }} onClick={() => {
              updateCinema()
              setUpdateShow(false);
            }}>Save</Button>
          </span>
        </Modal>
        <div className='table-view'>
          <div className='row'>
            <div className='col'>
              <h4 style={{ marginTop: '10px', marginLeft: '6px', color: 'white' }}>Cinema Master</h4>

            </div>
            <div className='col'>
              {role == '1' ? <button className='add_btn' style={{padding:'0px 30px'}} onClick={() => setIsModalOpen(true)}>Add Cinema</button> : null}
            </div>
          </div>
          <div style={{ height: '520px', overflowY: 'scroll', background: '#000' }}>
            <Table style={{ backgroundColor: '#4b4b4b',color:'#fff', fontSize: '12px',border:'none' }}>
              <thead style={{ backgroundColor: '#353535', color: '#fff', position: 'sticky', top: -1, zIndex: 1,height:'50px',verticalAlign:'middle'}}>
                <tr>
                  {/* <th>ID</th> */}
                  <th style={{width:'10%',fontWeight:'400' }}>Company Code</th>
                  <th style={{fontWeight:'400' }}>Name</th>
                  <th style={{fontWeight:'400' }}>Address</th>
                  <th style={{fontWeight:'400' }}>City</th>
                  {/* <th>CINEMA PINCODE</th> */}
                  <th style={{fontWeight:'400' }}>State</th>
                  {/* <th>SPOC EMAIL</th> */}
                  {/* <th>SPOC</th> */}
                  <th style={{width:'10%',fontWeight:'400' }}>Cinema Manager</th>
                  <th style={{ width: '63px',fontWeight:'400' }}>Action</th>
                </tr>
              </thead>
              <tbody style={{fontSize:'11px'}}>
                {data.map((item, key) => (
                  <tr key={item.ID}>
                    {/* <td>{item.ID}</td> */}
                    <td style={{ textAlign: 'left' }}>{item.company_code}</td>
                    <td style={{ textAlign: 'left' }}>
                      {item.name}
                    </td>
                    <td>{item.address}</td>
                    <td>{item.cityname}</td>
                    <td>{item.statename}</td>
                    <td>{item.username}</td>
                    <td >
                    <BsPencil className="action_btn" title='Edit' style={{ cursor: 'pointer', marginRight: '8px',  marginTop: '5px' }}
                        onClick={() => handleEdit(item)}
                      />
                      <BsTrash className="action_btn" title='Delete' style={{ cursor: 'pointer', marginRight: '8px', marginTop: '5px' }}
                        onClick={() => handleDelete(item)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
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
  )
}

export default Cinema;
