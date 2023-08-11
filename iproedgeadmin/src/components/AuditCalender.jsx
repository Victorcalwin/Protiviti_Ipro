import React, { useEffect, useState, useContext  } from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { FaFilter, FaTimes, FaEye, FaTrashAlt, FaEdit } from "react-icons/fa";
import interactionPlugin from '@fullcalendar/interaction';
import {
  FormControl,
  FormControlLabel,
  Paper,
  RadioGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormHelperText
} from "@mui/material";
import axios from "axios";
import { Button, Form, Table } from "react-bootstrap";
import { Tooltip } from "bootstrap";
import AuthDetails from '../services/AuthDetails';
import { AppContext } from './AppContext';
import formatDate from './FormatDate';
import './calender.css'
import ENV from '../ENV';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

let tooltipInstance = null;

const customStyles = {
  content: {
      top: '4%',
      left: '25%',
      right: '25%',
      bottom: '4%',
  },
  overlay: {
      backgroundColor: 'rgb(34 41 47 / 95%)',
      zIndex: '11',
      opacity: '1',
      backdropFilter: 'blur(10px)'
  }
};

export default function AuditCalender() {
  const [openBackDrop, setOpenBackDrop] = React.useState(true);
  const role = AuthDetails.getRoles();
  const userId = AuthDetails.getUserId();
  const navigate = useNavigate()
  let postdata = {}
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [Users, setUsers] = useState([]);
  const [TeamLeads, setTeamLeads] = useState([]);
  const [TeamLeadVal, setTeamLeadVal] = useState([]);
  const [pmos, setPMOS] = useState([]);
  const [pmoVal, setPmoVal] = useState();
  const [cinemas, setCinemas] = useState([]);
  const [cinemaManeger, setCinemaManeger] = useState([]);
  const [regions, setRegions] = useState([]);
  const [audits, setAudits] = useState([]);
  const [departmentsVal, setDepartmentsVal] = useState([]);
  const [departmentsName, setDepartmentsName] = useState([]);
  const [departmentsManID, setDepartmentsManID] = useState([]);
  const [auditorVal, setAuditorVal] = useState([]);
  const [startDate, setStartDate] = useState();
  const [regionVal, setregionVal] = useState();
  const [endDate, setEndDate] = useState();
  const [auditname, setAuditName] = useState();
  const [cinemaId, setCinemaId] = useState();
  const [refresh, setRefresh] = useState(false);
  const [directorname, setDirectorName] = useState();
  const [directorID, setDirectorID] = useState();
  const [manegername, setManegername] = useState([]);
  const { auditdata, setauditData } = useContext(AppContext)
  const { data, setData } = useContext(AppContext)
  const { comeback, setComeBack } = useContext(AppContext)
  const [error, setError] = useState();
  
  postdata.cinema_id = cinemaId
  postdata.start_date = startDate
  postdata.end_date = endDate
  postdata.cinema_id = cinemaId
  postdata.auditName = auditname
  postdata.audit_status = "Draft"
  postdata.current_status = "open"
  postdata.scheduling_type = "cinema"
  postdata.created_by = 1
  postdata.month = new Date().toLocaleString('default', { month: 'long' })
  postdata.tlName = TeamLeadVal
  postdata.pmoName = pmoVal
  postdata.manegername = manegername
  postdata.departmentsName = departmentsName
  postdata.directorname = directorname
  postdata.departmentsManID = departmentsManID
  postdata.directorID = directorID
  postdata.auditorVal = auditorVal
  postdata.departmentsVal = departmentsVal

    function dateformater(date) {
        const [day, month, year] = date.split('-');
        const convertedDate = `${year}-${month}-${day}`;
        return convertedDate;
    }



  useEffect(() => {
      axios
          .post(`${ENV.API_END_POINT}AuditStatusReport/Get_AllAudit`)
          .then(async (res) => {
              let arr = [];
              let result = res.data.filter((item) => item.audit_status !== 'Closed');
              await result.map((item) => {
                  let startDate = item.start_date;
                  let endDate = item.end_date;
                  console.log('Raw Start Date:', startDate);
                  console.log('Raw End Date:', endDate);
                  arr.push({
                      title: item.auditName,
                      start: dateformater(startDate),
                      end: dateformater(endDate) + ' 20:00:00',
                      eventData: item,
                  });
              });
              setEvents(arr);
              setOpenBackDrop(false)
              setIsLoading(false);
              console.log('Full Data:', arr);
          })
          .catch((error) => {
              console.log(error);
          });
      axios
      .post(`${ENV.API_END_POINT}departments/Get_departmentsPOnCinema`, { cinemaId: cinemaId })
      .then((res) => {
          let arr = res.data.data
          setDepartments(arr)
      })
      .catch((error) => { });
  axios
      .post(`${ENV.API_END_POINT}Cinemas/Get_AllCinemas`, { regionVal: regionVal })
      .then((res) => {
          setCinemas(res.data)
      })
      .catch((error) => { });
  axios
      .get(`${ENV.API_END_POINT}Regions//Get_AllRegion`)
      .then((res) => {
          setRegions(res.data)
      })
      .catch((error) => { });
      axios
      .get(`${ENV.API_END_POINT}UsersLogin/Get_Users`)
      .then((res) => {
          let arr = []
          let arrteamlead = []
          let arrPMO = []
          res.data.filter(elem => {
              if (elem.role_id == 5) {
                  arrteamlead.push({ name: ((elem.first_name) + " " + (elem.last_name)), userId: elem.id })
              }
          })
          res.data.filter(elem => {
              if (elem.role_id == 6) {
                  arrPMO.push({ name: ((elem.first_name) + " " + (elem.last_name)), userId: elem.id })
              }
          })
          res.data.filter(elem => {
              if (elem.role_id == 2) {
                  arr.push({ name: ((elem.first_name) + " " + (elem.last_name)), userId: elem.id })
              }
          })
          setUsers(arr)
          setTeamLeads(arrteamlead);
          setPMOS(arrPMO)
      })
      .catch((error) => { });
  }, [refresh, regionVal, cinemaId]);

  function getDate(dayString) {
    const today = new Date();
    let month = (today.getMonth() + 1).toString();
    const year = today.getFullYear().toString();
    var date = dayString;
    date = date.split("-").map((e) => (e[0] == "0" ? e.slice(1) : e));
    date = date[2] + "-" + "0" + date[1] + "-" + date[0];

    if (month.length === 1) {
      month = "0" + month;
    }
    return date;
  }

  let tooltipInstance; 

const handleMouseEnter = (info) => {
  console.log(info);

  if (info.event.extendedProps.eventData) {
    const eventData = info.event.extendedProps.eventData;
    console.log("Tooltip", eventData);
    const tooltipContent = `
      <div class='tooltipabove'>
        <p class='tooltipdate'>${eventData.start_date} to ${eventData.end_date}</p>
        <p class='tooltipname'><b>${eventData.auditName}</b></p>
        <div class='hrule'></div>
      </div>
      <div class='tooltipbottom'>
        <p class='tooltipdate'>Auditor :</p>
        <p class='tooltipauditor'><b>${(eventData.AssignedTo.filter(user => user.role_name === "Auditor"))[0].user_name[0]}</b></p>
      </div>
    `;

    tooltipInstance = new Tooltip(info.el, {
      title: tooltipContent,
      html: true,
      placement: "auto",
      trigger: "hover",
      container: "body",
    });

    tooltipInstance.show();
  }
};

const handleMouseLeave = () => {
  if (tooltipInstance) {
    tooltipInstance.dispose();
    tooltipInstance = null;
  }
};

  const handledateselection = (info) => {
    // console.log(info, "kdkjdkjfsdjb")
    let today = new Date()
    let input = new Date(info.dateStr)
    setStartDate(info.dateStr);
    if((today.getFullYear() === input.getFullYear() &&
    today.getMonth() === input.getMonth() &&
    today.getDate() === input.getDate()) || today.getFullYear() <= input.getFullYear() &&
    today.getMonth() <= input.getMonth() &&
    today.getDate() <= input.getDate() ){
        setIsModalOpen(true)
    }
  };

  const handleDepartment = async (e) => {
    let arr4 = [...departmentsVal];
    if (arr4.find(elem => elem == e.name)) {
        arr4 = arr4.filter(elem => elem != e.name)
    } else {
        arr4.push(e.name)
    }
    await setDepartmentsVal(arr4)
    let arr = departments.filter(obj => (arr4).includes(obj.name))
    let arr2 = departments.filter(obj => (arr4).includes(obj.name))

    let arr3 = []
    let arr1 = []
    let arr5 = []
    arr.map((item) => {
        arr1.push(item.username)
        arr5.push(item.department_Manager)
    })
    arr2.map((item) => {
        arr3.push(item.name)
    })
    arr1 = [...new Set(arr1)]
    arr5 = [...new Set(arr5)]
    console.log(arr5)
    let names = arr1.join(', ');
    setManegername(names)
    setDepartmentsName(arr3)
    setDepartmentsManID(arr5)
    return false
}

// console.log(departmentsVal)

const handleCenter = async(e) => {
    setCinemaId(e.target.value)
    let cinemaManger = cinemas.find((elem) => elem.id == e.target.value)
    console.log(cinemaManger.CinemaManeger, "dkfbfsdjbsdj")
    setCinemaManeger(cinemaManger.CinemaManeger)
}


const handlePreview = async (e) => {
    e.preventDefault()
    let err = {}

    err.audit = auditname != "" && auditname != null ? "" : "Mandatory Field"
    err.region = regionVal != "" && regionVal != null ? "" : "Mandatory Field"
    err.cinema = cinemaId != "" && cinemaId != null ? "" : "Mandatory Field"
    err.dept = departmentsName != "" && departmentsName != null ? "" : "Mandatory Field"
    err.start = startDate != "" && startDate != null ? "" : "Mandatory Field"
    err.end = endDate != "" && endDate != null ? "" : "Mandatory Field"
    err.teamlead = TeamLeadVal != "" && TeamLeadVal != null ? "" : "Mandatory Field"
    err.pmo = pmoVal != "" && pmoVal != null ? "" : "Mandatory Field"
    err.auditor = auditorVal != "" && auditorVal != null ? "" : "Mandatory Field"

    await setError(err)

    if (Object.keys(err).length) {
        const isEmpty = Object.values(err).every((x) => x === "");
        console.log(isEmpty, "rcc");
        if (isEmpty === true) {
            await setauditData(postdata)
            navigate('/deptquest')
        }
        
    }

}

const handleAuditName = async (e) => {
    setAuditName(e.target.value)
    if (e.target.value.length > 0) {
        error.audit = "";
        await setError({ ...error });
    } else {
        error.audit = "Mandatory Field";
        await setError({ ...error });
    }
}

const handleregionName = async (e) => {
    setregionVal(e.target.value)
    setDirectorName((regions.find((elem) => elem.id == e.target.value)['username']))
    setDirectorID(regions.find((elem) => elem.id == e.target.value)['Regional_Director'])
    if (e.target.value) {
        error.region = "";

        await setError({ ...error });
    } else {
        error.region = "Mandatory Field";
        await setError({ ...error });
    }
}

console.log(events, "sdksdfkbsdjb")

  return (
    <div style={{display: 'flex', justifyContent: 'center',}}>
        {isLoading ? (
          <p>Loading data...</p>
        ) : (
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '40px', marginBottom: '30px', backgroundColor: '#000', width: '90%', height: '80%'}}>  
            <div style={{width: '95%', height: '95%', backgroundColor: 'white'}}>
                <div style={{backgroundColor: 'white'}}></div>
                <FullCalendar
                width='100%'
                themeSystem="Default FullCalender Theme"
                plugins={[dayGridPlugin, interactionPlugin]}
                events={events}
                displayEventTime={false}
                headerToolbar={{
                start: 'today',
                center: 'title',
                end: 'prev,next'
                }}
                eventColor="#e3b912"
                selectable={true}
                dateClick={handledateselection}
                eventMouseEnter={handleMouseEnter}
                eventMouseLeave={handleMouseLeave}
                />
            </div>
          </div>
        )}
        <Modal isOpen={isModalOpen} style={customStyles}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ marginBottom: '10px', textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'row' }}>
                        <h4>New Audit</h4>
                        <FaTimes onClick={() => {setIsModalOpen(false); setRefresh(true) }} style={{ float: 'right', cursor: 'pointer', marginLeft: 'auto' }} />
                    </div>
                    <Form
                        style={{ width: '90%' }}
                    >
                        <div className='row mb-2' style={{ width: '100%' }}>
                            <FormControl variant="outlined">
                                <TextField
                                    variant="outlined"
                                    name="audit"
                                    label="Audit Name"
                                    value={auditname}
                                    onChange={(e) => {
                                        handleAuditName(e)
                                    }}
                                    
                                    fullWidth
                                    style={{ marginLeft: '12px' }}
                                />
                                <FormHelperText style={{ color: 'red', fontSize: '10px' }}>{error && error.audit ? error.audit : ''}</FormHelperText>
                            </FormControl>
                        </div>
                        <div className='row mb-2' >
                            <div className='col-md-6 col-xl-6 '>
                                <FormControl variant="outlined">
                                    <InputLabel id="demo-simple-select-outlined-label">Region</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        label="Region"
                                        value={regionVal}
                                        name="region"
                                        onChange={(e) => {
                                            handleregionName(e)
                                        }}
                                        
                                        fullWidth
                                        style={{ width: '270px' }}
                                    >
                                        {regions.length > 0 &&
                                            regions.map((ele) => {
                                                return <MenuItem value={ele.id}>{ele.name}</MenuItem>;
                                            })}
                                    </Select>
                                    <FormHelperText style={{ color: 'red', fontSize: '10px' }}>{error && error.region ? error.region : ''}</FormHelperText>
                                </FormControl>
                            </div>
                            <div className='col-md-6 col-xl-6'>
                                <FormControl variant="outlined">
                                    <InputLabel id="demo-simple-select-outlined-label">Cinema</InputLabel>
                                    {regionVal ?
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            label="Cinema"
                                            value={cinemaId}
                                            name="region"
                                            onChange={async (ele) => {
                                                handleCenter(ele)
                                                if (ele.target.value) {
                                                    error.cinema = "";

                                                    await setError({ ...error });
                                                } else {
                                                    error.cinema = "Mandatory Field";
                                                    await setError({ ...error });
                                                }
                                            }}
                                            
                                            fullWidth
                                            style={{ width: '270px' }}
                                        >
                                            {cinemas.length > 0 &&
                                                cinemas.map((ele) => {
                                                    return <MenuItem value={ele.id}>{ele.name}</MenuItem>;
                                                })}
                                        </Select>
                                        :
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            label="Cinema"
                                            value={cinemaId}
                                            name="region"
                                            onChange={async (ele) => {
                                                handleCenter(ele)
                                                if (ele.target.value) {
                                                    error.cinema = "";

                                                    await setError({ ...error });
                                                } else {
                                                    error.cinema = "Mandatory Field";
                                                    await setError({ ...error });
                                                }
                                            }}
                                            disabled
                                            
                                            fullWidth
                                            style={{ width: '270px' }}
                                        >
                                            {cinemas.length > 0 &&
                                                cinemas.map((ele) => {
                                                    return <MenuItem value={ele.id}>{ele.name}</MenuItem>;
                                                })}
                                        </Select>}
                                    <FormHelperText style={{ color: 'red', fontSize: '10px' }}>{error && error.cinema ? error.cinema : ''}</FormHelperText>
                                </FormControl>
                            </div>
                        </div>
                        <div className='row mb-1'>
                            {cinemaId ?
                                <FormControl variant="outlined">
                                    <InputLabel id="demo-simple-select-outlined-label">Departments</InputLabel>
                                    <div style={{ marginTop: '50px', marginLeft: '20px' }}>

                                    <div>
                                            {departments.length > 0 &&
                                                departments.map((ele) => {
                                                    return <button 
                                                    style={{ height: '30px', marginLeft: '4px', marginRight: '4px', marginBottom: '7px', 
                                                    textAlign: 'center', border: departmentsVal.find(item => item == ele.name) ? 'none' : 'none', borderRadius: '16px',
                                                     background: departmentsVal.find(item => item == ele.name) ? '#4682B4' : 'lightgrey', 
                                                     color: departmentsVal.find(item => item == ele.name) ? 'white' : 'black', 
                                                     fontSize: 'smaller', boxShadow: '0px 3px 10px lightgrey' }} 
                                                     onClick={async() => { 
                                                        handleDepartment(ele)
                                                        if (ele.name) {
                                                            error.dept = "";

                                                            await setError({ ...error });
                                                        } else {
                                                            error.dept = "Mandatory Field";
                                                            await setError({ ...error });
                                                        }
                                                     }}>
                                                        <p style={{ marginRight: '10px', marginLeft: '10px', marginTop: '4px' }}>{ele.name}</p>
                                                        </button>;
                                                })}
                                        </div>

                                    </div>

                                    <FormHelperText style={{ color: 'red', fontSize: '10px' }}>{error && error.dept ? error.dept : ''}</FormHelperText>
                                </FormControl>
                                : null}
                        </div>
                        <div className='row mb-3'>
                            <div className='col-md-6 col-xl-6'>
                                <FormControl variant="outlined">
                                    <lable>Start Date</lable>
                                    <TextField
                                        variant="outlined"
                                        id="date"
                                        type='date'
                                        name="startdate"
                                        value={startDate}
                                        onChange={async(e) => {
                                            await setStartDate(e.target.value)
                                            if (e.target.value.length > 0) {
                                                error.start = "";
                                                await setError({ ...error });
                                            } else {
                                                error.start = "Mandatory Field";
                                                await setError({ ...error });
                                            }
                                        }}
                                        
                                        fullWidth
                                        style={{ width: '270px' }}
                                        inputProps={{
                                            min: formatDate(new Date()),
                                        }}
                                    />
                                    <FormHelperText style={{ color: 'red', fontSize: '10px' }}>{error && error.start ? error.start : ''}</FormHelperText>
                                </FormControl>
                            </div>
                            <div className='col-md-6 col-xl-6'>
                                <FormControl variant="outlined">
                                    <lable>End Date</lable>
                                    <TextField
                                        variant="outlined"
                                        id="date"
                                        type='date'
                                        name="enddate"
                                        value={endDate}
                                        onChange={async (e) => {
                                            await setEndDate(e.target.value)
                                            if (e.target.value.length > 0) {
                                                error.end = "";

                                                await setError({ ...error });
                                            } else {
                                                error.end = "Mandatory Field";
                                                await setError({ ...error });
                                            }
                                        }}
                                        
                                        fullWidth
                                        style={{ width: '270px' }}
                                        inputProps={{
                                            min: formatDate(new Date()),
                                        }}
                                    />
                                    <FormHelperText style={{ color: 'red', fontSize: '10px' }}>{error && error.end ? error.end : ''}</FormHelperText>
                                </FormControl>
                            </div>
                        </div>
                        <div style={{ border: '1px solid #ccc', borderRadius: '15px', width: '100%', height: '280px' }}>
                            <p style={{ fontSize: '12px', color: 'grey', backgroundColor: 'white', marginLeft: '20px', marginTop: '-10px', width: '50px', textAlign: 'center' }}>TEAM</p>
                            <div style={{ marginLeft: '20px', marginTop: '10px', fontSize: '12px', }}>Regional Director: <b>{directorname}</b></div>
                            <div style={{ marginLeft: '20px', marginTop: '10px', fontSize: '12px', }}>Cinema Manager: <b>{cinemaManeger}</b></div>
                            <div style={{ marginLeft: '20px', marginTop: '10px', fontSize: '12px', }}>Regional Manager: <b>{manegername}</b></div>
                            <div className='row mt-3 mb-2' style={{ marginLeft: '3px' }}>
                                <div className='col-md-6 col-xl-6 '>
                                    <FormControl variant="outlined">
                                        <InputLabel id="demo-simple-select-outlined-label">Team Lead</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            label="Team Lead"
                                            value={TeamLeadVal}
                                            name="TeamLead"
                                            onChange={async (e) => {
                                                await setTeamLeadVal(e.target.value)
                                                if (e.target.value) {
                                                    error.teamlead = "";

                                                    await setError({ ...error });
                                                } else {
                                                    error.teamlead = "Mandatory Field";
                                                    await setError({ ...error });
                                                }
                                            }}
                                            
                                            fullWidth
                                            style={{ width: '250px' }}
                                        >
                                            {TeamLeads.length > 0 &&
                                                TeamLeads.map((ele) => {
                                                    return <MenuItem value={ele.userId}>{ele.name}</MenuItem>;
                                                })}
                                        </Select>
                                        <FormHelperText style={{ color: 'red', fontSize: '10px' }}>{error && error.teamlead ? error.teamlead : ''}</FormHelperText>
                                    </FormControl>
                                </div>
                                <div className='col-md-6 col-xl-6 '>
                                    <FormControl variant="outlined">
                                        <InputLabel id="demo-simple-select-outlined-label">Project Management Office</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={pmoVal}
                                            name="TeamLead"
                                            label="Project Management Office"
                                            onChange={async(e) => {
                                                await setPmoVal(e.target.value)
                                                if (e.target.value) {
                                                    error.pmo = "";

                                                    await setError({ ...error });
                                                } else {
                                                    error.pmo = "Mandatory Field";
                                                    await setError({ ...error });
                                                }
                                            }}
                                            
                                            fullWidth
                                            style={{ width: '250px' }}
                                        >
                                            {pmos.length > 0 &&
                                                pmos.map((ele) => {
                                                    return <MenuItem value={ele.userId}>{ele.name}</MenuItem>;
                                                })}
                                        </Select>
                                        <FormHelperText style={{ color: 'red', fontSize: '10px' }}>{error && error.pmo ? error.pmo : ''}</FormHelperText>
                                    </FormControl>
                                </div>
                            </div>
                            <div className='row mb-2' style={{ marginLeft: '3px' }}>
                                <div className='col-md-6 col-xl-6 '>
                                    <FormControl variant="outlined">
                                        <InputLabel id="demo-simple-select-outlined-label">Auditor</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={auditorVal}
                                            name="TeamLead"
                                            label="Auditor"
                                            onChange={async(e) => {
                                                await setAuditorVal(e.target.value)
                                                if (e.target.value.length > 0) {
                                                    error.auditor = "";

                                                    await setError({ ...error });
                                                } else {
                                                    error.auditor = "Mandatory Field";
                                                    await setError({ ...error });
                                                }
                                            }}
                                            
                                            multiple
                                            fullWidth
                                            style={{ width: '250px' }}
                                        >
                                            {Users.length > 0 &&
                                                Users.map((ele) => {
                                                    return <MenuItem value={ele.userId}>{ele.name}</MenuItem>;
                                                })}
                                        </Select>
                                        <FormHelperText style={{ color: 'red', fontSize: '10px' }}>{error && error.auditor ? error.auditor : ''}</FormHelperText>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                            <Button type="submit" style={{ width: '220px', backgroundColor: '#e3b912', borderColor: '#e3b912' }} onClick={handlePreview}>Preview Questions</Button>
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
    </div>
  );
}
