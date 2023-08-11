import React, { useState, useEffect, useContext } from 'react'
import Modal from 'react-modal';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'
import { Button, Form, Table } from "react-bootstrap";
import ApiCall from '../services/ApiCall';
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
import { AppContext } from './AppContext';
import formatDate from './FormatDate';
import AuthDetails from '../services/AuthDetails';
import ENV from '../ENV';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const customStyles = {
    content: {
        top: '4%',
        left: '18%',
        right: '25%',
        bottom: '4%',
        width: '60%'
    },
    overlay: {
        backgroundColor: 'rgb(34 41 47 / 95%)',
        zIndex: '11',
        opacity: '1',
        backdropFilter: 'blur(10px)'
    }
};

const EditAudit = () => {
    const location = useLocation();
    const Auditdetail = location.state;
    console.log(Auditdetail, "sdkbfsdbfbfdsfbsks")
    const [openBackDrop, setOpenBackDrop] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [departments, setDepartments] = useState([]);
    const [Users, setUsers] = useState([]);
    const [TeamLeads, setTeamLeads] = useState([]);
    const [TeamLeadVal, setTeamLeadVal] = useState((Auditdetail.AssignedTo.filter(user => user.role_name === "Team Lead"))[0].UserId);
    const [pmos, setPMOS] = useState([]);
    const [pmoVal, setPmoVal] = useState();
    const [cinemas, setCinemas] = useState([]);
    const [cinemaManeger, setCinemaManeger] = useState([(Auditdetail.AssignedTo.filter(user => user.role_name === "Cinema Manager"))[0].user_name]);
    const [cinemaManegerEmail, setCinemaManegerEmail] = useState([((Auditdetail.AssignedTo).find(elem => elem.role_name == 'Cinema Manager')['user_Mobile'])]);
    const [cinemaManegerMobile, setCinemaManegerMobile] = useState([((Auditdetail.AssignedTo).find(elem => elem.role_name == 'Cinema Manager')['user_Email'])]);
    const [regions, setRegions] = useState([]);
    const [audits, setAudits] = useState([]);
    const [departmentsVal, setDepartmentsVal] = useState([]);
    const [departmentsName, setDepartmentsName] = useState([]);
    const [departmentsManID, setDepartmentsManID] = useState([]);
    const [deptIds, setDeptIds] = useState([])
    const [auditorVal, setAuditorVal] = useState([]);
    const [startDate, setStartDate] = useState(formatDate(new Date(Auditdetail.start_date.split("-").reverse().join("-"))));
    const [regionVal, setregionVal] = useState(Auditdetail.regionId);
    const [endDate, setEndDate] = useState(formatDate(new Date(Auditdetail.end_date.split("-").reverse().join("-"))));
    const [auditname, setAuditName] = useState(Auditdetail.auditName);
    const [cinemaId, setCinemaId] = useState(Auditdetail.cinema_id);
    const [refresh, setRefresh] = useState(false);
    const [directorname, setDirectorName] = useState((Auditdetail.AssignedTo.filter(user => user.role_name === "Regional Director"))[0].user_name[0]);
    const [directorphone, setDirectorPhone] = useState(((Auditdetail.AssignedTo).find(elem => elem.role_name == 'Regional Director')['user_Mobile']).toString());
    const [directorEmail, setDirectorEmail] = useState(((Auditdetail.AssignedTo).find(elem => elem.role_name == 'Regional Director')['user_Email']).toString());
    const [directorID, setDirectorID] = useState((Auditdetail.AssignedTo.filter(user => user.role_name === "Regional Director"))[0].UserId)
    const [error, setError] = useState();
    const [manegername, setManegername] = useState((Auditdetail.AssignedTo.filter(user => user.role_name === "Regional Manager"))[0].user_name.join(', '));
    const [manegerEmail, setManegerEmail] = useState([((Auditdetail.AssignedTo).find(elem => elem.role_name == 'Regional Manager')['user_Email'])]);
    const [manegerMobile, setManegerMobile] = useState([((Auditdetail.AssignedTo).find(elem => elem.role_name == 'Regional Manager')['user_Mobile'])]);
    const { auditdata, setauditData } = useContext(AppContext)
    const { data, setData } = useContext(AppContext)
    const { comeback, setComeBack } = useContext(AppContext)
    const navigate = useNavigate()
    let postdata = {}
    const role = AuthDetails.getRoles();
    const userId = AuthDetails.getUserId();

    
   

    

    const handleAudit = async () => {
        try {
            let data = await ApiCall.getStatusAuditAll({ userId, role });
            if (data) {
                setAudits((data))
            }
        }
        catch (error) {

            // console.log(error);
        }
    }

    useEffect( () => {
        let dept = []
         axios
            .post(`${ENV.API_END_POINT}departments/Get_departmentsPOnCinema`, { cinemaId: cinemaId })
            .then(async(res) => {
                let arr = res.data.data
                await setDepartments(arr)
                dept = arr
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
        handleAudit()
         axios
                .post(`${ENV.API_END_POINT}AuditScheduleDepartments/GetAuditBasedDepartment`, { auditId: Auditdetail.AuditId })
                .then( (res) => {
                    // console.log(res.data,"sdhkfvjdfdfdsff")
                    let arr = [];
                    let arrId = [];
                    res.data.map((item)=> {
                        arr.push(item.name)
                    })
                    setDepartmentsName(arr)
                    setDepartmentsVal(arr)
                    let departmentsIds = res.data.map(department => department.deptId);
                    let filterdepts = dept.filter(department => departmentsIds.includes(department.id));
                    // console.log(filterdepts, "sdfdsfdsffds")
                    filterdepts.map((item)=> {
                        arrId.push(item.department_Manager)
                    })
                    setDepartmentsManID([...new Set(arrId)])
                    
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

    postdata.cinema_id = cinemaId
    postdata.start_date = startDate
    postdata.end_date = endDate
    postdata.auditName = auditname
    postdata.audit_status = "Pending"
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
    postdata.deptIds = deptIds

    console.log(departmentsManID, "hbdhckbskdbk")

    const handleDepartment = async (e) => {
        console.log(e, "jhhjhjbjbjhbbjh")
        let arr4 = [...departmentsVal];
        if (arr4.find(elem => elem == e.name)) {
            arr4 = arr4.filter(elem => elem != e.name)
        } else {
            arr4.push(e.name)
        }
        await setDepartmentsVal(arr4)
        let arr = departments.filter(obj => (arr4).includes(obj.name))
        let arr2 = departments.filter(obj => (arr4).includes(obj.name))

        console.log(arr, arr2, "sdkfbdskfbd")

        let arr3 = []
        let arr1 = []
        let arr5 = []
        let arr6 = []
        let arr7 = []
        let arr8 = []
        arr.map((item) => {
            arr1.push(item.username)
            arr5.push(item.department_Manager)
            arr6.push(item.id)
            arr7.push(item.userEmail)
            arr8.push(item.userMobile)
        })
        arr2.map((item) => {
            arr3.push(item.name)
        })
        arr1 = [...new Set(arr1)]
        arr5 = [...new Set(arr5)]
        arr6 = [...new Set(arr6)]
        arr7 = [...new Set(arr7)]
        arr8 = [...new Set(arr8)]
        console.log(arr5)
        let names = arr1.join(' | ');
        let email = arr7.join(' | ');
        let mobile = arr8.join(' | ');
        await setManegername(names)
        await setDepartmentsName(arr3)
        await setDepartmentsManID(arr5)
        await setDeptIds(arr6)
        await setManegerEmail(email)
        await setManegerMobile(mobile)
        return false
    }

    const handleCenter = async (e) => {
        setDepartmentsManID([])
        setDepartmentsName([])
        setDepartmentsVal([])
        setCinemaId(e.target.value)
        setCinemaManeger((cinemas.find((elem) => elem.id == e.target.value)['CinemaManeger']))
        setCinemaManegerEmail((cinemas.find((elem) => elem.id == e.target.value)['userEmail']))
        setCinemaManegerMobile((cinemas.find((elem) => elem.id == e.target.value)['userMobile']))
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
        if(Auditdetail.audit_status != 'Re-Scheduled'){
        err.pmo = pmoVal != "" && pmoVal != null ? "" : "Mandatory Field"
        err.auditor = auditorVal != "" && auditorVal != null ? "" : "Mandatory Field"}

        await setError(err)

        if (Object.keys(err).length) {
            const isEmpty = Object.values(err).every((x) => x === "");
            // console.log(isEmpty, "rcc");
            if (isEmpty === true) {
                await setOpenBackDrop(true)
                let auditdata = {}
                auditdata.auditId = Auditdetail.AuditId
                auditdata.cinema_id = cinemaId
                auditdata.start_date = startDate
                auditdata.end_date = endDate
                auditdata.auditName = auditname
                if(Auditdetail.audit_status == 'Re-Scheduled'){ auditdata.audit_status = "Draft"   }
                else{ auditdata.audit_status = "Pending" }
                auditdata.current_status = "open"
                auditdata.scheduling_type = "cinema"
                auditdata.created_by = 1
                auditdata.month = new Date().toLocaleString('default', { month: 'long' })
                auditdata.tlName = TeamLeadVal
                if(Auditdetail.audit_status != 'Re-Scheduled'){ auditdata.pmoName = pmoVal   }
                // auditdata.pmoName = pmoVal
                auditdata.departmentsName = departmentsName
                auditdata.departmentsManID = departmentsManID
                auditdata.directorID = directorID
                if(Auditdetail.audit_status != 'Re-Scheduled'){ auditdata.auditorVal = auditorVal  }
                // auditdata.auditorVal = auditorVal
                await setauditData(auditdata)
                await axios
                    .post(`${ENV.API_END_POINT}AuditStatusReport/Update_audit`, { postdata: auditdata })
                    .then(async (res) => {
                        let id = res.data.data.id   
                        await axios
                            .post(`${ENV.API_END_POINT}AuditStatusReport/Get_AllAudit`, { auditId: id })
                            .then(async(res) => {
                                await setData(res.data[0])
                            })
                            .catch((error) => { });
                            navigate('/audits')
                    })
                    .catch((error) => { });
                    await setOpenBackDrop(false)
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
        setDepartmentsManID([])
        setDepartmentsName([])
        setDepartmentsVal([])
        setCinemaId()
        setCinemaManeger([])
        setregionVal(e.target.value)
        setDirectorName((regions.find((elem) => elem.id == e.target.value)['username']))
        setDirectorEmail((regions.find((elem) => elem.id == e.target.value)['userEmail']))
        setDirectorPhone((regions.find((elem) => elem.id == e.target.value)['userMobile']))
        setDirectorID(regions.find((elem) => elem.id == e.target.value)['Regional_Director'])
        if (e.target.value) {
            error.region = "";

            await setError({ ...error });
        } else {
            error.region = "Mandatory Field";
            await setError({ ...error });
        }
    }

    return (
        <>
            <Modal isOpen={isModalOpen} style={customStyles}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ marginBottom: '10px', textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'row' }}>
                        <h4>Edit Audit</h4>
                        {/* <FaTimes onClick={() => setIsModalOpen(false)} style={{ float: 'right', cursor: 'pointer', marginLeft: 'auto' }} /> */}
                    </div>
                    <Form
                        style={{ width: '90%' }}
                    >
                        <div className='row mb-2' style={{ width: '99%' }}>
                            <FormControl variant="outlined">
                                <TextField
                                    variant="outlined"
                                    name="audit"
                                    label="Audit Name"
                                    value={auditname}
                                    onChange={(e) => {
                                        handleAuditName(e)
                                    }}
                                    disabled
                                    fullWidth
                                    style={{ width: '100%', marginLeft: '12px' }}
                                />
                                <FormHelperText style={{ color: 'red', fontSize: '10px' }}>{error && error.audit ? error.audit : ''}</FormHelperText>
                            </FormControl>
                        </div>
                        <div className='row mb-2' style={{ width: '101%' }}>
                            <div className='col-md-6 col-xl-6 mr-1'>
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
                                        disabled
                                        fullWidth
                                        style={{ width: '338px' }}
                                    >
                                        {regions.length > 0 &&
                                            regions.map((ele) => {
                                                return <MenuItem value={ele.id}>{ele.name}</MenuItem>;
                                            })}
                                    </Select>
                                    <FormHelperText style={{ color: 'red', fontSize: '10px' }}>{error && error.region ? error.region : ''}</FormHelperText>
                                </FormControl>
                            </div>
                            <div className='col-md-6 col-xl-6 ml-1'>
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
                                            disabled
                                            fullWidth
                                            style={{ width: '338px' }}
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
                                            style={{ width: '330px' }}
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
                                                        type='button'
                                                        style={{ height: '30px', marginLeft: '4px', marginRight: '4px', marginBottom: '7px', textAlign: 'center', border: departmentsVal.find(item => item == ele.name) ? 'none' : 'none', borderRadius: '16px', background: departmentsVal.find(item => item == ele.name) ? '#e3b912' : '#fff',color: departmentsVal.find(item => item == ele.name) ? 'white' : 'grey', fontSize: 'smaller', border: "1px solid grey" }}
                                                        // onClick={async () => {
                                                        //     handleDepartment(ele)
                                                        //     if (ele.name) {
                                                        //         error.dept = "";

                                                        //         await setError({ ...error });
                                                        //     } else {
                                                        //         error.dept = "Mandatory Field";
                                                        //         await setError({ ...error });
                                                        //     }
                                                        // }}
                                                        >
                                                        <p style={{ marginRight: '10px', marginLeft: '10px', marginTop: '4px' }}>{ele.name}</p>
                                                    </button>;
                                                })}
                                        </div>

                                    </div>

                                    <FormHelperText style={{ color: 'red', fontSize: '10px' }}>{error && error.dept ? error.dept : ''}</FormHelperText>
                                </FormControl>
                                : null}
                        </div>
                        <div className='row mb-3' style={{ width: '100%' }}>
                            <div className='col-md-6 col-xl-6 '>
                                <FormControl variant="outlined">
                                    <lable>Start Date</lable>
                                    <TextField
                                        variant="outlined"
                                        id="date"
                                        type='date'
                                        name="startdate"
                                        value={startDate}
                                        onChange={async (e) => {
                                            await setStartDate(e.target.value)
                                            if (e.target.value.length > 0) {
                                                error.start = "";
                                                await setError({ ...error });
                                            } else {
                                                error.start = "Mandatory Field";
                                                await setError({ ...error });
                                            }
                                        }}
                                        disabled={Auditdetail.audit_status == 'Re-Scheduled'? false: true}
                                        fullWidth
                                        style={{ width: '335px' }}
                                        inputProps={{
                                            min: formatDate(new Date()),
                                        }}
                                    />
                                    <FormHelperText style={{ color: 'red', fontSize: '10px' }}>{error && error.start ? error.start : ''}</FormHelperText>
                                </FormControl>
                            </div>
                            <div className='col-md-6 col-xl-6 '>
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
                                        disabled={Auditdetail.audit_status == 'Re-Scheduled'? false: true}
                                        fullWidth
                                        style={{ width: '335px' }}
                                        inputProps={{
                                            min: formatDate(new Date(startDate)),
                                        }}
                                    />
                                    <FormHelperText style={{ color: 'red', fontSize: '10px' }}>{error && error.end ? error.end : ''}</FormHelperText>
                                </FormControl>
                            </div>
                        </div>
                        <div style={{ border: '1px solid #ccc', borderRadius: '15px', width: '100%', height: (Auditdetail.audit_status == 'Re-Scheduled'? '146px':'280px') }}>
                            <p style={{ fontSize: '12px', color: 'grey', backgroundColor: 'white', marginLeft: '20px', marginTop: '-10px', width: '50px', textAlign: 'center' }}>TEAM</p>
                            <div style={{ width: '100%', maxHeight: '100px', overflowY: 'scroll' }}>
                                <Table>
                                    <tr style={{ fontSize: '12px' }}>
                                        <th>Role</th>
                                        <td> <b>Name</b> </td>
                                        <td> <b>Email</b> </td>
                                        <td> <b>Phone</b> </td>
                                    </tr>
                                    <tr style={{ fontSize: '12px' }}>
                                        <th>Regional Director</th>
                                        <td>{directorname}</td>
                                        <td>{directorEmail}</td>
                                        <td>{directorphone}</td>

                                    </tr>
                                    <tr style={{ fontSize: '12px' }}>
                                        <th>Cinema Manager</th>
                                        <td>{cinemaManeger}</td>
                                        <td>{cinemaManegerEmail}</td>
                                        <td>{cinemaManegerMobile}</td>
                                    </tr>
                                    <tr style={{ fontSize: '12px' }}>
                                        <th>Regional Manager</th>
                                        <td>{manegername && manegername.includes('|') ? manegername.split('|').map((elem) => { return <>{elem}<br /></> }) : manegername} </td>
                                        <td>{manegerEmail && manegerEmail.includes('|') ? manegerEmail.split('|').map((elem) => { return <>{elem}<br /></> }) : manegerEmail}</td>
                                        <td>{manegerMobile && manegerMobile.includes('|') ? manegerMobile.split('|').map((elem) => { return <>{elem}<br /></> }) : manegerMobile}</td>
                                    </tr>
                                </Table>
                            </div>
                            {Auditdetail.audit_status != 'Re-Scheduled'?
                            <div>
                            <div className='row mt-3 mb-2' style={{ marginLeft: '3px', width: '98%' }}>
                                <div className='col-md-6 col-xl-6 mr-1'>
                                    <FormControl variant="outlined">
                                        <InputLabel id="demo-simple-select-outlined-label">Team Lead</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            label="Team Lead"
                                            value={TeamLeadVal}
                                            name="TeamLead"
                                            disabled
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
                                            style={{ width: '320px' }}
                                        >
                                            {TeamLeads.length > 0 &&
                                                TeamLeads.map((ele) => {
                                                    return <MenuItem value={ele.userId}>{ele.name}</MenuItem>;
                                                })}
                                        </Select>
                                        <FormHelperText style={{ color: 'red', fontSize: '10px' }}>{error && error.teamlead ? error.teamlead : ''}</FormHelperText>
                                    </FormControl>
                                </div>
                                <div className='col-md-6 col-xl-6 ml-1'>
                                    <FormControl variant="outlined">
                                        <InputLabel id="demo-simple-select-outlined-label">Project Management Office</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={pmoVal}
                                            name="TeamLead"
                                            label="Project Management Office"
                                            onChange={async (e) => {
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
                                            style={{ width: '320px' }}
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
                            <div className='row mb-2' style={{ marginLeft: '3px', width: '98%' }}>
                                <div className='col-md-6 col-xl-6 mr-1'>
                                    <FormControl variant="outlined">
                                        <InputLabel id="demo-simple-select-outlined-label">Auditor</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={auditorVal}
                                            name="TeamLead"
                                            label="Auditor"
                                            onChange={async (e) => {
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
                                            style={{ width: '320px' }}
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
                            : null}
                        </div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        {Auditdetail.audit_status == "Re-Scheduled" ?
                        <Button type="submit" style={{ width: '220px', backgroundColor: '#e3b912', borderColor: '#e3b912' }} onClick={handlePreview}>Rescheduled Audit</Button>:
                            <Button type="submit" style={{ width: '220px', backgroundColor: '#e3b912', borderColor: '#e3b912' }} onClick={handlePreview}>Submit Audit</Button>}
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

export default EditAudit;
