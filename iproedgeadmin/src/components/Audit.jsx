import React, { useState, useEffect, useContext } from 'react'
import Modal from 'react-modal';
import { Link, useNavigate } from "react-router-dom";
import { FaFilter, FaTimes, FaEye, FaTrashAlt, FaEdit } from "react-icons/fa";
import axios from 'axios'
import Swal from 'sweetalert2';
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
    FormHelperText,
    Chip
} from "@mui/material";
import roleShortId from './Role_short_Ids';
import { AppContext } from './AppContext';
import status_obj from '../audit_status';
import formatDate from './FormatDate';
import AuthDetails from '../services/AuthDetails';
import { BsPencil, BsTrash, BsFillPencilFill, BsCheckCircle } from 'react-icons/bs';
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

const Audit = () => {
    const [openBackDrop, setOpenBackDrop] = React.useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [Users, setUsers] = useState([]);
    const [TeamLeads, setTeamLeads] = useState([]);
    const [TeamLeadVal, setTeamLeadVal] = useState([]);
    const [pmos, setPMOS] = useState([]);
    const [pmoVal, setPmoVal] = useState();
    const [cinemas, setCinemas] = useState([]);
    const [cinemaManeger, setCinemaManeger] = useState([]);
    const [cinemaManegerEmail, setCinemaManegerEmail] = useState([]);
    const [cinemaManegerMobile, setCinemaManegerMobile] = useState([]);
    const [regions, setRegions] = useState([]);
    const [audits, setAudits] = useState([]);
    const [departmentsVal, setDepartmentsVal] = useState([]);
    const [departmentsName, setDepartmentsName] = useState([]);
    const [departmentsManID, setDepartmentsManID] = useState([]);
    const [deptIds, setDeptIds] = useState([])
    const [auditorVal, setAuditorVal] = useState([]);
    const [startDate, setStartDate] = useState();
    const [regionVal, setregionVal] = useState();
    const [endDate, setEndDate] = useState();
    const [auditname, setAuditName] = useState();
    const [cinemaId, setCinemaId] = useState();
    const [refresh, setRefresh] = useState(false);
    const [directorname, setDirectorName] = useState();
    const [directorphone, setDirectorPhone] = useState();
    const [directorEmail, setDirectorEmail] = useState();
    const [directorID, setDirectorID] = useState();
    const [error, setError] = useState();
    const [manegername, setManegername] = useState([]);
    const [manegerEmail, setManegerEmail] = useState([]);
    const [manegerMobile, setManegerMobile] = useState([]);
    const [file, setFile] = useState(null)
    const [bulkAudit, setBulkAudit] = useState()
    const { auditdata, setauditData } = useContext(AppContext)
    const { data, setData } = useContext(AppContext)
    const { comeback, setComeBack } = useContext(AppContext)
    const navigate = useNavigate()
    let postdata = {}
    const role = AuthDetails.getRoles();
    const userId = AuthDetails.getUserId();

    console.log(userId, role, "roleeeeeeeee")

    postdata.cinema_id = cinemaId
    postdata.start_date = startDate
    postdata.end_date = endDate
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
    postdata.directorEmail = directorEmail
    postdata.departmentsManID = departmentsManID
    postdata.directorID = directorID
    postdata.auditorVal = auditorVal
    postdata.departmentsVal = departmentsVal
    postdata.deptIds = deptIds

    const handleAudit = async () => {
        try {
            let data = await ApiCall.getStatusAuditAll({ userId, role });

            if (data) {
                await setAudits((data))
                await setOpenBackDrop(false)
            }
        }
        catch (error) {

            console.log(error);
        }
    }
    const handleFileChange = (event)=>{
        setFile(event.target.files[0]);
    }


    useEffect(() => {
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
        handleAudit()
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
    console.log(Users, 'iuytrfghuygfc')

    console.log(departmentsName, "jhhjhjbjbjhbbjh")

    const handleCenter = async (e) => {
        setCinemaId(e.target.value)
        // let cinemaManger = cinemas.find((elem) => elem.id == e.target.value)
        // console.log(cinemaManger.CinemaManeger, "dkfbfsdjbsdj")
        // setCinemaManeger(cinemaManger.CinemaManeger)
        setCinemaManeger((cinemas.find((elem) => elem.id == e.target.value)['CinemaManeger']))
        setCinemaManegerEmail((cinemas.find((elem) => elem.id == e.target.value)['userEmail']))
        setCinemaManegerMobile((cinemas.find((elem) => elem.id == e.target.value)['userMobile']))

    }


    const handlePreview = async (e) => {
        e.preventDefault()
        if(file){
            const formData = new FormData();
            formData.append('excelFile', file);
            formData.append('tlName', userId)
            formData.append('directorID', directorID)
            console.log(file,"asdfjlsadjlf")
            await axios.post(
                'http://localhost:8698/AuditStatusReport/excel-bulk-upload',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } },
              )
              .then(async(res)=>{
                if (res.data.message === 'Success') {
                    await setBulkAudit(res.data);
                    setIsModalOpen(false);
                    setRefresh(true)
                    console.log(res.data.message, "Success message");
                    Swal.fire('Success', 'Success message', 'success'); 
                  } else {
                    console.log(res.data.message, "Mismatch column message");
                    setIsModalOpen(false);
                    setRefresh(true)
                    Swal.fire('Mismatch Column', 'Mismatch column message', 'error'); 
                  }
                
            })
              .catch((err)=>{console.log(err)});
        }else{

            e.preventDefault()
            let err = {}
    
            err.audit = auditname != "" && auditname != null ? "" : "Mandatory Field"
            err.region = regionVal != "" && regionVal != null ? "" : "Mandatory Field"
            err.cinema = cinemaId != "" && cinemaId != null ? "" : "Mandatory Field"
            err.dept = departmentsName != "" && departmentsName != null ? "" : "Mandatory Field"
            err.start = startDate != "" && startDate != null ? "" : "Mandatory Field"
            err.end = endDate != "" && endDate != null ? "" : "Mandatory Field"
            // err.teamlead = TeamLeadVal != "" && TeamLeadVal != null ? "" : "Mandatory Field"
            // err.pmo = pmoVal != "" && pmoVal != null ? "" : "Mandatory Field"
            // err.auditor = auditorVal != "" && auditorVal != null ? "" : "Mandatory Field"
            await setError(err)
    
            if (Object.keys(err).length) {
                const isEmpty = Object.values(err).every((x) => x === "");
                console.log(isEmpty, "rcc");
                if (isEmpty === true) {
                    let auditdata = {}
                    auditdata.cinema_id = cinemaId
                    auditdata.start_date = startDate
                    auditdata.end_date = endDate
                    auditdata.auditName = auditname
                    auditdata.audit_status = "Draft"
                    auditdata.current_status = "open"
                    auditdata.scheduling_type = "cinema"
                    auditdata.created_by = userId
                    auditdata.month = new Date().toLocaleString('default', { month: 'long' })
                    auditdata.tlName = userId
                    // auditdata.pmoName = pmoVal
                    auditdata.departmentsName = departmentsName
                    auditdata.departmentsManID = departmentsManID
                    auditdata.directorID = directorID
                    // auditdata.auditorVal = auditorVal
                    await setauditData(auditdata)
                    await axios
                        .post(`${ENV.API_END_POINT}AuditStatusReport/Create_audit`, { postdata: auditdata })
                        .then(async (res) => {
                            let id = res.data.data.id
                            await axios
                                .post(`${ENV.API_END_POINT}AuditStatusReport/Get_AllAudit`, { auditId: id })
                                .then(async (res) => {
                                    await setData(res.data[0])
                                })
                                .catch((error) => { });
                            navigate('/deptquest')
                        })
                        .catch((error) => { });
    
                }
    
            }
        }

    }

    const handleView = async (item) => {
        await setData(item)
        navigate('/deptquest')
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
    console.log(directorname, 'hgfdfghjhgfd')
    const handleregionName = async (e) => {
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
    const handleAssigned = (item) => {
        console.log(item, "lkjhgfdsqwuio")
        switch (item.audit_status) {
            case 'In Progress':
                let displayProgress = (item.AssignedTo).some(elem => elem.role_name === 'Auditor') ? ((item.AssignedTo).find(elem => elem.role_name == 'Auditor')['user_name']).toString() : ''
                return displayProgress;
            case 'Scheduled':
                let displayProgress1 = (item.AssignedTo).some(elem => elem.role_name === 'Auditor') ? ((item.AssignedTo).find(elem => elem.role_name == 'Auditor')['user_name']).toString() : ''
                return displayProgress1;
            case 'Sent to PMO':
                let displayPmo = (item.AssignedTo).some(elem => elem.role_name === 'Project Management Office') ?
                    ((item.AssignedTo).find(elem => elem.role_name == 'Project Management Office')['user_name']).toString() : '';
                return displayPmo;
            case 'Sent to TL':
                let displayTL = (item.AssignedTo).some(elem => elem.role_name === 'Team Lead') ?
                    ((item.AssignedTo).find(elem => elem.role_name == 'Team Lead')['user_name']).toString() : '';
                return displayTL;
            case 'Sent to TL':
                let displayQC = "QC"
                return displayQC;
            case 'Sent Back to TL':
                let displayTeL = (item.AssignedTo).some(elem => elem.role_name === 'Team Lead') ?
                    ((item.AssignedTo).find(elem => elem.role_name == 'Team Lead')['user_name']).toString() : '';
                return displayTeL;
            case 'Pending':
                let displayCM = "CAT"
                return displayCM;
            case 'Sent to CM':
                let displaycm = (item.AssignedTo).some(elem => elem.role_name === 'Cinema Manager') ?
                    ((item.AssignedTo).find(elem => elem.role_name == 'Cinema Manager')['user_name']).toString() : ''
                return displaycm;
            case 'Sent to CAT':
                    let displaycat = "CAT"
                    return displaycat;
            case 'Forwarded to TL':
                let displayftl = (item.AssignedTo).some(elem => elem.role_name === 'Team Lead') ?
                    ((item.AssignedTo).find(elem => elem.role_name == 'Team Lead')['user_name']).toString() : '';
                return displayftl;        
            default:
                return '';
        }

    }
    return (
        <>
            <div className='table-view'>
                <div className='row'>
                    <div className='col'>
                        <h4 style={{ marginTop: '6px', marginLeft: '6px', color: 'white', fontFamily: 'Poppins', fontStyle: 'normal' }}>List of Audits</h4>

                    </div>
                    <div className='col'>
                        {role == "5" ? <button className='add_btn' onClick={() => { setIsModalOpen(true); }}>Create Audit</button> : null}
                    </div>
                </div>
                <div style={{ height: '520px', overflowY: 'scroll', background: '#000' }}>
                    <Table style={{ backgroundColor: '#4b4b4b',color:'#fff', fontSize: '12px' }} >
                        <thead style={{ backgroundColor: '#353535',height:'50px',verticalAlign:'middle', color: '#fff', position: 'sticky', top: -1, zIndex: 1, }}>
                            <tr>
                                <th style={{fontWeight:'400' }}>Audit Id</th>
                                <th style={{fontWeight:'400' }}>Name</th>
                                <th style={{fontWeight:'400' }}>Schedule At</th>
                                <th style={{fontWeight:'400' }}>Status</th>
                                <th style={{fontWeight:'400' }}>Pending With</th>
                                <th style={{fontWeight:'400' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody style={{fontSize:'11px'}}>
                            {audits.map((item, key) => (
                                <tr key={item.display_order}>
                                    <td style={{ verticalAlign: 'middle' }}>{item.company_code + '00' + item.AuditId}</td>
                                    <td style={{ verticalAlign: 'middle' }}>{item.auditName}</td>
                                    <td style={{ verticalAlign: 'middle' }}>{item.Cinema_name}
                                        <br />
                                        <span style={{ fontSize: '12px', fontWeight: '500', color: 'gray', }}>From : <b>{item.start_date}</b> &nbsp; To : <b>{item.end_date}</b></span>
                                    </td>
                                    <td style={{  verticalAlign: 'middle'}}>
                                        <p style={{ width: 'auto', height: '18px', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '400', fontSize: '12px', color: status_obj[item.audit_status] }}>{item.audit_status == 'Closed' ? <Chip variant="outlined" color="success" label="Published" size='small' sx={{ fontSize: '12px', fontWeight: 'none' }} icon={<BsCheckCircle />} /> : item.audit_status}</p>
                                        {item.audit_status == 'Pending' ?
                                            <div style={{display: 'flex', flexDirection: 'row', marginTop: '-2vh' }}>
                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                            </div>
                                            : item.audit_status == 'Draft' ?
                                                <div style={{display: 'flex', flexDirection: 'row', marginTop: '-2vh' }}>
                                                    <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                    <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                    <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                    <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                    <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                </div>
                                                : item.audit_status == 'Scheduled' ?
                                                    <div style={{display: 'flex', flexDirection: 'row', marginTop: '-2vh' }}>
                                                        <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                        <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                        <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                        <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                        <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                    </div>
                                                    : item.audit_status == 'Sent Back to TL' ?
                                                        <div style={{display: 'flex', flexDirection: 'row', marginTop: '-2vh' }}>
                                                            <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                            <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                            <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                            <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                            <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: '#A0A0A0' }} />
                                                        </div>
                                                        : item.audit_status == 'In Progress' ?
                                                            <div style={{display: 'flex', flexDirection: 'row', marginTop: '-2vh' }}>
                                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: '#A0A0A0' }} />
                                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: '#A0A0A0' }} />
                                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: '#A0A0A0' }} />
                                                            </div>
                                                            : item.audit_status == 'Sent to PMO' ?
                                                                <div style={{display: 'flex', flexDirection: 'row', marginTop: '-2vh' }}>
                                                                    <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                    <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                    <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                    <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: '#A0A0A0' }} />
                                                                    <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: '#A0A0A0' }} />
                                                                </div>
                                                                : item.audit_status == 'Sent to TL' ?
                                                                    <div style={{display: 'flex', flexDirection: 'row', marginTop: '-2vh' }}>
                                                                        <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                        <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                        <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                        <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                        <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: '#A0A0A0' }} />
                                                                    </div>
                                                                    : item.audit_status == 'Sent to CM' ?
                                                                        <div style={{display: 'flex', flexDirection: 'row', marginTop: '-2vh' }}>
                                                                            <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                            <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                            <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                            <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                            <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                        </div>
                                                                        : item.audit_status == 'Sent to CAT' ?
                                                                            <div style={{display: 'flex', flexDirection: 'row', marginTop: '-2vh' }}>
                                                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                            </div>
                                                                            : item.audit_status == 'Forwarded to TL' ?
                                                                            <div style={{display: 'flex', flexDirection: 'row', marginTop: '-2vh' }}>
                                                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                            </div>
                                                                            : item.audit_status == 'Sent to QC' ?
                                                                            <div style={{display: 'flex', flexDirection: 'row', marginTop: '-2vh' }}>
                                                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                            </div>
                                                                            : item.audit_status == 'Forwarded to CM' ?
                                                                            <div style={{display: 'flex', flexDirection: 'row', marginTop: '-2vh' }}>
                                                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                                <p style={{ height: '5px', borderRadius: '25px', width: '12px', background: status_obj[item.audit_status] }} />
                                                                            </div>
                                                                            : null}
                                    </td>
                                    <td style={{ textAlign: 'left', fontSize: '12px', verticalAlign: 'middle' }}>
                                        {handleAssigned(item)}
                                    </td>
                                    <td style={{ verticalAlign: 'middle' }} >
                                        {/* <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center'}}> */}
                                        <button className='Icon-button' onClick={() => { handleView(item) }}><FaEye /> View</button>
                                        {/* <button className='Icon-button'><BsFillPencilFill /> Edit</button> */}
                                        {/* <BsTrash style={{ marginRight: '10px', color: '#d63031', cursor: 'pointer', marginRight: '8px', }} /> */}
                                        {/* </div> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackDrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Modal isOpen={isModalOpen} style={customStyles}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ marginBottom: '10px', textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'row' }}>
                        <h4>New Audit</h4>
                        <FaTimes onClick={() => { setIsModalOpen(false); setRefresh(true) }} style={{ float: 'right', cursor: 'pointer', marginLeft: 'auto' }} />
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

                                    fullWidth
                                    style={{ width: '100%', marginLeft: '12px' }}
                                />
                                <FormHelperText style={{ color: 'red', fontSize: '10px' }}>{error && error.audit ? error.audit : ''}</FormHelperText>
                            </FormControl>
                        </div>
                        <div className='row mb-1' style={{ width: '101%' }}>
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
                                                        style={{ height: '30px', marginLeft: '4px', marginRight: '4px', marginBottom: '7px', textAlign: 'center', border: departmentsVal.find(item => item == ele.name) ? 'none' : 'none', borderRadius: '16px', background: departmentsVal.find(item => item == ele.name) ? '#e3b912' : '#fff', color: departmentsVal.find(item => item == ele.name) ? 'white' : 'grey', fontSize: 'smaller', border: "1px solid grey" }}
                                                        onClick={async () => {
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
                                        onFocus={(e) => e.target.blur()}
                                        onKeyDown={(e) => e.preventDefault()}
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
                                        onFocus={(e) => e.target.blur()}
                                        onKeyDown={(e) => e.preventDefault()}
                                        fullWidth
                                        style={{ width: '335px' }}
                                        inputProps={{
                                            min: startDate,
                                        }}
                                    />
                                    <FormHelperText style={{ color: 'red', fontSize: '10px' }}>{error && error.end ? error.end : ''}</FormHelperText>
                                </FormControl>
                            </div>
                        </div>
                        <div style={{ border: '1px solid #ccc', borderRadius: '15px', width: '100%', height: '170px', }}>
                            <p style={{ fontSize: '12px', color: 'grey', backgroundColor: 'white', marginLeft: '20px', marginTop: '-10px', width: '50px', textAlign: 'center' }}>Team</p>
                            {/* <div style={{ marginLeft: '20px', marginTop: '10px', fontSize: '12px', }}>Regional Director: <b>{directorname}</b></div>
                            <div style={{ marginLeft: '20px', marginTop: '10px', fontSize: '12px', }}>Cinema Manager: <b>{cinemaManeger}</b></div>
                            <div style={{ marginLeft: '20px', marginTop: '10px', fontSize: '12px', }}>Regional Manager: <b>{manegername}</b></div> */}
                            <div style={{ width: '100%', maxHeight: '180px', overflowY: 'scroll' }}>
                                <Table>
                                    <tr style={{ fontSize: '15px' }}>
                                        <th>Role</th>
                                        <td style={{borderBottom:'none'}}> <b>Name</b> </td>
                                        <td> <b>Email</b> </td>
                                        <td> <b>Phone</b> </td>
                                    </tr>
                                    <tr style={{ fontSize: '15px' }}>
                                        <th>Regional Director</th>
                                        <td>{directorname}</td>
                                        <td>{directorEmail}</td>
                                        <td>{directorphone}</td>

                                    </tr>
                                    <tr style={{ fontSize: '15px' }}>
                                        <th>Cinema Manager</th>
                                        <td>{cinemaManeger}</td>
                                        <td>{cinemaManegerEmail}</td>
                                        <td>{cinemaManegerMobile}</td>
                                    </tr>
                                    <tr style={{ fontSize: '15px' }}>
                                        <th>Regional Manager</th>
                                        <td>{manegername && manegername.includes('|') ? manegername.split('|').map((elem) => { return <>{elem}<br /></> }) : manegername} </td>
                                        <td>{manegerEmail && manegerEmail.includes('|') ? manegerEmail.split('|').map((elem) => { return <>{elem}<br /></> }) : manegerEmail}</td>
                                        <td>{manegerMobile && manegerMobile.includes('|') ? manegerMobile.split('|').map((elem) => { return <>{elem}<br /></> }) : manegerMobile}</td>
                                    </tr>
                                </Table>
                            </div>
                          
                            {/* <div className='row mt-3 mb-2' style={{ marginLeft: '3px', width: '98%' }}>
                                <div className='col-md-6 col-xl-6 mr-1'>
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
                                </div> */}
                            {/* <div className='row mb-2' style={{ marginLeft: '3px', width: '98%' }}>
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
                            </div> */}
                        </div>
                        <div className='col-md-6 col-xl-6 mr-1'>
                                    <FormControl variant="outlined">
                                    <Form.Control type="file"
                                    onChange={handleFileChange} 
                                    accept='.xlsx,.xls'/>
                                    </FormControl>
                                    
                                </div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                            <Button type="submit" style={{ width: '220px', backgroundColor: '#e3b912', borderColor: '#e3b912' }} onClick={handlePreview}>Preview Questions</Button>
                        </div>
                    </Form>
                </div>

            </Modal>
        </>
    )
}

export default Audit;
