import React, { useEffect, useState, useContext, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Spinner from 'react-bootstrap/Spinner';
import { Card, ProgressBar } from 'react-bootstrap';
import { FaEye, FaDownload, FaExchangeAlt, FaUpload, FaInbox, FaTimes, FaAngleDoubleLeft, FaAngleDoubleRight, FaMobileAlt, FaComments, FaPaperPlane } from "react-icons/fa";
import './styles.css'
import { NavLink, Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { AppContext } from './AppContext';
import ApiCall from '../services/ApiCall';
import socket from '../services/socketIO';
import axios from 'axios';
import PptxGenJS from 'pptxgenjs';
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    FormGroup,
    RadioGroup,
    Radio,
    Checkbox,
    Rating,
    Typography,
    ExpandMoreIcon,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
} from "@mui/material";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import Modal from 'react-modal';
import { Button, Form, Table } from "react-bootstrap";
import status_obj from '../audit_status';
import { right } from '@popperjs/core';
import roleShortId from './Role_short_Ids';
import { FaCheckCircle, FaHistory, FaArrowDown, FaArrowUp } from "react-icons/fa";
import AuthDetails from '../services/AuthDetails';
import ProgressBarDept from '../reUseAble/progressBarDept';
import Swal from 'sweetalert2';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { BsArrowLeft, BsCheckCircle, BsTrash } from 'react-icons/bs';
import ENV from '../ENV';
const customStyles = {
    content: {
        top: '4%',
        left: '18%',
        right: '18%',
        bottom: '4%',
        // width: '60%'
    },
    overlay: {
        backgroundColor: 'rgb(34 41 47 / 95%)',
        zIndex: '11',
        opacity: '1',
        backdropFilter: 'blur(10px)'
    },
    helperText: {
        color: 'red',
        fontSize: '10px'
    }
};

const customStyles2 = {
    content: {
        top: '20%',
        left: '65%',
        right: '1%',
        bottom: '1%',
        padding: '0px',
        borderRadius: '7px'
    },
    overlay: {
        zIndex: '11',
        opacity: '1',
        backgroundColor: 'none',
    },
    helperText: {
        color: 'red',
        fontSize: '10px'
    }
};


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 7,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 300 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#e3b912' : '#308fe8',
    },
    left: '20px',
    width: '85%',
    top: '66vh'
}));



const DeptQuestion = (props) => {
    const hiddenFileInput = useRef(null);
    const hiddenFileInput2 = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [image, setImage] = useState();
    const [quesId, setquesId] = useState();
    const [departments, setDepartments] = useState([])
    const [itemData, setItemData] = useState('')
    const [queData, setQueData] = useState([])
    const [allques, setAllQues] = useState([])
    const [queObservations, setqueObservations] = useState([])
    const [allqueObservations, setallqueObservations] = useState([])
    const [auditDetails, setAuditDetails] = useState('')
    const [departmentsVal, setDepartmentsVal] = useState('');
    const [dataLoad, setDataLoad] = useState(0);
    const [Users, setUsers] = useState([]);
    const [TeamLeads, setTeamLeads] = useState([]);
    const [TeamLeadVal, setTeamLeadVal] = useState([]);
    const [pmos, setPMOS] = useState([]);
    const [cinemas, setCinemas] = useState([]);
    const [pmoVal, setPmoVal] = useState();
    const { auditdata, setauditData } = useContext(AppContext)
    const { data, setData } = useContext(AppContext)
    const { comeback, setComeBack } = useContext(AppContext)
    const [percentage, setPercentage] = useState(0);
    const [filledAnswer, setFilledAnswer] = useState(0);
    const [checkAns, setCheckAns] = useState();
    const [Total, setTotal] = useState(0);
    const [editableAnswer, setEditableAnswer] = useState(null);
    const [isEditMode, setIsEditMode] = useState({});
    const [editingEnabled, setEditingEnabled] = useState(true);
    const [refresh, setRefresh] = useState("0");
    const [observrefresh, setObservRefresh] = useState("0");
    const [isRating, setIsRating] = useState()
    const [selectedValues, setSelectedValues] = useState([]);
    const [totalScore, setTotalScore] = useState(0)
    const [mark, setMark] = useState()
    const [totalMark, setTotalMark] = useState()
    const [toogle, setToggle] = useState("All");
    const [arrow, setArrow] = useState("Down");
    const [editObservation, setEditObservation] = useState('')
    const [Observation, setObservation] = useState("");
    const [obserHelpertext, setObserHelpertext] = useState("");
    const [cmquesstatus, setCmquesstatus] = useState("")
    const [cmAgree, setCmAgree] = useState(false)
    const [isCMAccrodian, setIsCMAccrodian] = useState({})
    const [cmObservation, setCMObservation] = useState()
    const [renderValue, setRenderVal] = useState('')
    const [edittexthelp, setedittexthelp] = useState('')
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [arrayPos, setArrayPos] = useState(0);
    const [remediaiondata, setRemediationData] = useState([]);
    const userId = AuthDetails.getUserId();
    const rollId = AuthDetails.getRoles();
    const [chatModel, setChatModel] = useState(false)
    const [chatModelData, setChatModelData] = useState([])
    const [cmRemApprove, setCmRemApprove] = useState(false)

    const navigate = useNavigate()
    let postdata = {}
    console.log(queData, "sdhfbfsd")
    const role = AuthDetails.getRoles()
    const username = AuthDetails.getUserName()

    function formatDate(date) {
        const options = {
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Kolkata' // Adjust the time zone as per your requirement
        };

        const formattedDate = date.toLocaleString('en-In', options);
        return formattedDate;
    }

    var criticality_obj = {
        'Essential': '#89FE02',
        'Critical': '#EC9E68',
        'Super Critical': '#FF5100',
        'Non Critical': '#FF8403',
        'Ultra Critical': '#FE0002',
    }

    const handleNext = () => {
        if (arrayPos === (queData.length - 1)) {
            setArrayPos(queData.length - 1)
        } else {
            setArrayPos(arrayPos + 1)
        }
    }
    const handlePrev = () => {
        if (arrayPos === (0)) {
            setArrayPos(0)
        } else {
            setArrayPos(arrayPos - 1)
        }
    }

    const socketSenddata = async (AuditId, deptId) => {
        let data = {
            AuditId,
            deptId,
            room: "updateQuestion",
        }
        await socket.emit('send_message', data);
    }

    const socketconnect = () => {
        setRefresh("0")
        socket.emit('question_update', 'updateQuestion');
    }

    useEffect(() => {
        socket.on("recived_message", (data) => {
            if (data) {
                setRefresh("1")
            }
        })
    })

    const handleEditClick = () => {
        // setEditableAnswer(answer);

    };

    const handleSaveClick = (newAnswer) => {
        // Call your backend API to update the answer in the database
        setIsEditMode(false);
        setEditableAnswer(null);
    };
    console.log(queObservations, "xkjfbxkjjd")
    function filterCriticalObjects(array, queObservationsData = queObservations) {
        if (queObservationsData && queObservationsData.length > 0) {
            console.log(queObservationsData, "sdjfvjsdvf")
            const distinctQuestionIds = [...new Set(queObservationsData.map(obj => obj.questionId))];
            const foundObjects = array.filter(obj => distinctQuestionIds.includes(obj.id))
            console.log(foundObjects, "sdhfbshdbdf")
            return foundObjects
        }
    }


    const fetchData = async () => {
        let allquestios = [];
        let allobserv = [];
        await setCmquesstatus("")
        if (data.AuditId) {

            try {
                const auditDetailsResponse = await axios.post(`${ENV.API_END_POINT}AuditStatusReport/Get_AllAudit`, { auditId: data.AuditId });
                console.log("auditDetails", auditDetailsResponse.data[0]);
                setAuditDetails(auditDetailsResponse.data[0]);
                setDataLoad(0);

                const remediaitonResponse = await axios.post(`${ENV.API_END_POINT}AuditStatusReport/GetRemediationImage`, { auditId: data.AuditId });
                console.log("auditDetails", remediaitonResponse);
                await setRemediationData(remediaitonResponse.data);
                if(rollId == 7){
                    
                }

                const departmentsResponse = await axios.post(`${ENV.API_END_POINT}AuditScheduleDepartments/GetAuditBasedDepartment`, { auditId: data.AuditId });
                await setDepartments(departmentsResponse.data);
                await setItemData(departmentsResponse.data[0]);
                await setDepartmentsVal(departmentsResponse.data[0].name);

            } catch (error) {
                // Handle error
            }
        } else {
            try {
                const departmentsResponse = await axios.post(`${ENV.API_END_POINT}AuditScheduleDepartments/GetAuditBasedDepartment`, { deptname: auditdata.deptIds });
                await setDepartments(departmentsResponse.data);
                await setItemData(departmentsResponse.data[0]);
                await setDepartmentsVal(departmentsResponse.data[0].name);
            } catch (error) {
                // Handle error
            }
        }

        try {
            const cinemasResponse = await axios.post(`${ENV.API_END_POINT}Cinemas/Get_AllCinemas`);
            await setCinemas(cinemasResponse.data);
        } catch (error) {
            // Handle error
        }

        try {
            const questionResponse = await axios.post(`${ENV.API_END_POINT}QuestionnaireByDepartment/ALL`, { auditId: data.AuditId });
            allquestios = questionResponse.data.data;
            await setAllQues(questionResponse.data.data);
        } catch (error) {
            // Handle error
        }



        try {
            const observationResponse = await axios.post(`${ENV.API_END_POINT}AuditQuestionnaireComments/get-observation`, { auditId: data.AuditId });
            allobserv = observationResponse.data;
            await setallqueObservations(observationResponse.data);
        } catch (error) {
            // Handle error
        }

        try {
            const usersResponse = await axios.get(`${ENV.API_END_POINT}UsersLogin/Get_Users`);
            let arr = [];
            let arrteamlead = [];
            let arrPMO = [];
            usersResponse.data.filter((elem) => {
                if (elem.role_id == 5) {
                    arrteamlead.push({ name: `${elem.first_name} ${elem.last_name}`, userId: elem.id });
                }
            });
            usersResponse.data.filter((elem) => {
                if (elem.role_id == 6) {
                    arrPMO.push({ name: `${elem.first_name} ${elem.last_name}`, userId: elem.id });
                }
            });
            usersResponse.data.filter((elem) => {
                if (elem.role_id == 2) {
                    arr.push({ name: `${elem.first_name} ${elem.last_name}`, userId: elem.id });
                }
            });
            setUsers(arr);
            setTeamLeads(arrteamlead);
            setPMOS(arrPMO);
        } catch (error) {
            // Handle error
        }

        console.log(allquestios, allobserv);
        await setRenderVal(checkAllQuestionIdsAndEscalationStatus(allquestios, allobserv));
    };

    useEffect(() => {
        fetchData();
    }, [data, refresh, dataLoad]);

    const assignques = async (res, queObservationsData) => {
        if ((rollId == 7 || rollId==8) && auditDetails.audit_status != 'Pending' && auditDetails.audit_status != 'Scheduled') {
            await setQueData(filterCriticalObjects(res.data.data, queObservationsData))
        }
        else {
            console.log(res.data.data, "sdfvvfhsdv")
            await setQueData(res.data.data)
        }
        setMark(res.data.mark)
        setTotalMark(res.data.total)
    }

    const fetchQues = async () => {
        if (data.AuditId) {

            try {
                
                await axios.post(`${ENV.API_END_POINT}AuditQuestionnaireComments/get-observation`, { auditId: data.AuditId, deptId: itemData.deptId })
                    .then(async (res) => {
                        var queObservationsData = res.data
                        await setqueObservations(queObservationsData)
                        console.log(queObservationsData, 'queObservations')
                        await axios.post(`${ENV.API_END_POINT}QuestionnaireByDepartment`, { depatmentId: itemData.deptId, auditId: data.AuditId })
                            .then(async (res) => {
                                assignques(res, queObservationsData);
                            })
                    })


            } catch (error) {
                // Handle error
            }
        }
    };


    useEffect(() => {
        socketconnect()
        if (itemData && itemData.deptId) {
            if (data.AuditId) {
                socketSenddata(data.AuditId, itemData.deptId);
                handlePercentage(data.AuditId, itemData.deptId);
                if (toogle == "Low") { setToggle("All") }

                if (rollId == 7 || rollId == 8) {
                    setToggle('Low')
                }

                if (observrefresh == "1") { setObservRefresh("0") }
                fetchQues();


            } else {
                axios.post(`${ENV.API_END_POINT}Question/Get_questions`, { deptId: itemData.deptId })
                    .then((res) => {
                        setQueData(res.data.data)
                        setMark(res.data)
                        setTotalMark(res.data.total)

                    })
            }
        }

    }, [data, itemData, refresh, observrefresh])

    console.log(queData, toogle, arrayPos, rollId, "sfshdbfhbf")

    const handlePercentage = async (auditId, deptId) => {
        try {
            let data = await ApiCall.statusAudit({ auditId, deptId });
            if (data?.total) {
                setPercentage(data?.percentage)
                setFilledAnswer(data?.match)
                setTotal(data?.total)
            }
        }
        catch (error) {

            console.log(error);
        }
    }



    const handleSubmit = async () => {
        await axios
            .post(`${ENV.API_END_POINT}AuditStatusReport/update-audit-status`, { status: 'Pending', auditId: auditDetails.AuditId, AuditDetail: auditDetails, departments: departments.map(department => department.name) })
            .then((res) => {
                navigate('/audits')
            })
            .catch((error) => { });
    }

    const handleEditObservation = async (item) => {
        console.log(editObservation, "sdkjfnsjdfnd")
        if (editObservation) {
            let Editdata = {
                user_id: userId,
                Role_Id: 6,
                audit_schedule_id: item.audit_schedule_id,
                department_Id: item.audit_schedule_department_id,
                audit_schedule_questionnaire_id: item.id,
                observations: editObservation,
            }
            await axios.post(
                `${ENV.API_END_POINT}AuditStatusReport/submit-Audit-Answer`,
                {
                    auditId: item.audit_schedule_id,
                    questionId: item.question_id,
                    answers: item.answer,
                },
            ).then((res) => {
                console.log("successfully answerUpdated")
            })
            await axios
                .post(`${ENV.API_END_POINT}AuditQuestionnaireEditableObservations`, { Editdata })
                .then((res) => {
                    setEditObservation('')
                    console.log("successfully observation added")
                })
                .catch((error) => { });
            setIsEditMode(false);
            setRefresh("1")
        }
        else {
            setedittexthelp("Remarks are mandatory")
        }
    }

    const handleCMObservation = async (item) => {

        await axios
            .post(`${ENV.API_END_POINT}AuditStatusReport/submit-status-ques-observations`, { auditId: item.audit_schedule_id, quesId: item.id, status: cmObservation })
            .then((res) => {
                // console.log("successfully observation added")
                setIsCMAccrodian(false)

            })
            .catch((error) => { });
        setIsCMAccrodian(false);

    }

    const handleClick = (item) => {
        setDepartmentsVal(item.name)
        setItemData(item)
    }
    const handleChange = async (questionId, answer) => {
        // console.log("questionId, answer", questionId, answer)
        var newArr = [...queData]
        newArr.find(elem => elem.id == questionId)['answer'] = answer
        await setQueData(newArr)
        setIsEditMode(prevState => ({ ...prevState, [questionId]: true }))
    };
    const handleChangeRating = async (questionId, answer) => {
        var newArr = [...queData]
        newArr.find(elem => elem.id == questionId)['answer'] = answer
        await setQueData(newArr)
        setIsRating(answer)
        setIsEditMode(prevState => ({ ...prevState, [questionId]: true }))
    };
    const handleChangeCheck = async (questionId, answer) => {
        setSelectedValues(prevValues => [...prevValues, answer])
        let arr = [...selectedValues, answer]
        var newArr = [...queData]
        newArr.find(elem => elem.id == questionId)['answer'] = arr.join(',')
        await setQueData(newArr)

    };

    const handleDeleteAudit = async () => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete audit",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e3b912',
            cancelButtonColor: '#A0A0A0',
            closeOnClickOutside: true,
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.value) {
                await axios.post(
                    `${ENV.API_END_POINT}AuditStatusReport/Delete_audit`,
                    {
                        auditId: data.AuditId
    
                    },
                ).then((res)=> {
                    navigate('/audits')
                })
            }})

    }


    console.log(data, 'yyyyyyy')
    const handleApprove = async (status) => {
        let pptobj;
        const names = departments.map(item => item.name)
        let input = {
            "auditId": data.AuditId,
            "status": status,
            "AuditDetail": auditDetails,
            "departments": names
        }

        if (status == "Sent to QC" || status == "Forwarded to CM" || status == "CAT to Validate") {
            // pptobj = generatePpt()
            input.pptdata = allques;
        }

        await axios.post(`${ENV.API_END_POINT}AuditStatusReport/update-audit-status`, input)
            .then((res) => {
                setDataLoad(1)
                Swal.fire({
                    icon: 'success',
                    text: `Successfully ${status}`,
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch((error) => { console.log(error) });

        if (status == "Sent to PMO" || (rollId == 5 && status == "Closed")) {
            await axios.post(
                `${ENV.API_END_POINT}AuditStatusReport/submit-edit-Audit-Answer`,
                {
                    auditId: data.AuditId,
                    queData: queData,

                },
            )
        }

        navigate('/audits')
    }

    const handleReject = async (status) => {
        const names = departments.map(item => item.name)
        let input = {
            "auditId": data.AuditId,
            "status": status,
            "AuditDetail": auditDetails,
            "departments": names
        }
        console.log(status, "dfkjgbkjdf")
        Swal.fire({
            title: 'Enter Remark',
            input: 'text',
            confirmButtonColor: '#e3b912',
            cancelButtonColor: '#A0A0A0',
            showCancelButton: true,
            confirmButtonText: 'Send'
        }).then(async (remark) => {
            // console.log(remark, "dsnbfsdnfs")
            if (remark.value && remark.value != null && remark.value != '' && remark.isConfirmed == true) {
                input.Remark = remark.value;
                await axios.post(`${ENV.API_END_POINT}AuditStatusReport/update-audit-status`, input)
                    .then((res) => {
                        setDataLoad(1)
                        Swal.fire({
                            icon: 'warning',
                            text: 'rejected',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
                    .catch((error) => { console.log(error) });
            }
        })
        navigate('/audits')
    }


    const loaderDisplayCondition = () => {
        switch (auditDetails.audit_status) {
            case 'Closed':
                let display = <span> <img src="./closed1.png" alt="closed" style={{ width: '100px', opacity: '0.5', rotate: '-30deg', justifyContent: 'center', alignItems: 'center', marginTop: '15px', marginLeft: '-23px' }} /> </span>;
                return display;
            case 'In Progress':
                let displayProgress = <><span className='badge float-right' style={{ color: 'white', background: status_obj[auditDetails.audit_status], fontSize: 'small', position: 'absolute', top: '4px', right: '4px' }}>{auditDetails.audit_status}</span> <br /><br />
                    {percentage !== 100 ? <Spinner variant="info" /> : null}
                    <br /><br />
                    <ProgressBar now={percentage} label={`${percentage}%`} />
                </>
                return displayProgress

            default:
                let displaydefault = <><span className='badge float-right' style={{ color: 'white', background: status_obj[auditDetails.audit_status], fontSize: 'small', position: 'absolute', top: '4px', right: '4px' }}>
                    {auditDetails.audit_status}</span><br /><br />
                </>
                return displaydefault
        }

    }

    const handleFileSelect = async (event) => {
        await setquesId(queData[arrayPos].id)
        console.log(quesId, queData[arrayPos].id, "fgdfgdfgfdgdg")
        await setSelectedFile(event.target.files[0])
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to upload image",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e3b912',
            cancelButtonColor: '#A0A0A0',
            closeOnClickOutside: true,
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.value) {
                const formData = new FormData();
                formData.append('image', event.target.files[0]);
                let detail = {
                    auditId: data.AuditId,
                    questionId: queData[arrayPos].id,
                    userId: userId,
                };
                Object.entries(detail).forEach(([key, value]) => {
                    formData.append(`data[${key}]`, value);
                });
                await axios
                    .post(`${ENV.API_END_POINT}AuditStatusReport/changeQuesImage`, formData, { headers: { "Content-Type": "multipart/form-data" } })
                    .then((res) => {
                        setIsModalOpen(false); setImage(); setquesId();
                        setRefresh("1")
                    })
                    .catch((error) => { });

            }
        })
    }

    const handleFileRemediation = async (event) => {
        // await setquesId(queData[arrayPos].id)
        console.log(itemData.deptId, queData[arrayPos].id, "fgdfgdfgfdgdg")
        // await setSelectedFile(event.target.files[0])
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to upload image",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e3b912',
            cancelButtonColor: '#A0A0A0',
            closeOnClickOutside: true,
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.value) {
                const formData = new FormData();
                formData.append('image', event.target.files[0]);
                let detail = {
                    auditId: data.AuditId,
                    questionId: queData[arrayPos].id,
                    userId: userId,
                    deptId: itemData.deptId
                };
                Object.entries(detail).forEach(([key, value]) => {
                    formData.append(`data[${key}]`, value);
                });
                await axios
                    .post(`${ENV.API_END_POINT}AuditStatusReport/QuesRemedImage`, formData, { headers: { "Content-Type": "multipart/form-data" } })
                    .then((res) => {
                        setIsModalOpen(false); setImage(); setquesId();
                        setRefresh("1")
                    })
                    .catch((error) => { });

            }
        })
    }

    const handleFileReport = async (event) => {
        console.log(event.target.files[0], "sdkfsdjlnfsld")
        let reportfile = event.target.files[0]
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to upload Report",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e3b912',
            cancelButtonColor: '#A0A0A0',
            closeOnClickOutside: true,
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.value) {
                const formData = new FormData();
                formData.append('ppt', event.target.files[0]);
                let detail = {
                    auditId: data.AuditId,
                    questionId: queData[arrayPos].id,
                    userId: userId,
                    deptId: itemData.deptId
                };
                Object.entries(detail).forEach(([key, value]) => {
                    formData.append(`data[${key}]`, value);
                });
                await axios
                    .post(`${ENV.API_END_POINT}AuditStatusReport/UpdateReport/` + data.AuditId, formData, { headers: { "Content-Type": "multipart/form-data" } })
                    .then((res) => {
                        setRefresh("1")
                    })
                    .catch((error) => { });
            }
        })
    }

    const handleModel = async (item) => {
        await setImage(item.FILE_PATH)
        await setquesId(item.id)
        await setIsModalOpen(true)
        // console.log(item.FILE_PATH, quesId, "vjbsdhkvbskdbjd")
    }

    const handleModel2 = async (item) => {
        await setImage(item.file_path)
        await setquesId(item.Audit_question_id)
        await setIsModalOpen(true)
        // console.log(item.FILE_PATH, quesId, "vjbsdhkvbskdbjd")
    }


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
                axios.get(`${ENV.API_END_POINT}AuditScheduleQuestionnaireAnswers/Remove_ques/${item.id}`).then(async (res) => {
                    await axios
                        .post(`${ENV.API_END_POINT}AuditStatusReport/Get_AllAudit`, { auditId: auditDetails.AuditId })
                        .then(async (res) => {
                            await setData(res.data[0])
                        })
                        .catch((error) => { });
                    navigate('/deptquest')
                })
            }
        })

    };



    const handleToogle = async (item) => {
        if (item == "All") {
            axios.post(`${ENV.API_END_POINT}QuestionnaireByDepartment`, { depatmentId: itemData.deptId, auditId: data.AuditId })
                .then(async (res) => {
                    await setArrayPos(0)
                    await setQueData(res.data.data)
                })

            setToggle("All")
        }
        else if (item == "Low") {
            const criticalObjects = filterCriticalObjects(queData);
            await setArrayPos(0)
            await setQueData(criticalObjects)
            setToggle("Low")
        }
    }

    const handleObservation = async () => {
        let item = queData[arrayPos]
        console.log('skdjbfksdfdfdfsdff')
        let newArray = queObservations.filter(function (el) {
            return el.questionId == item.id;
        }
        )
        if (newArray && newArray.length > 0 && newArray[0] && newArray[0].observations) {

            await setChatModelData(newArray[0].observations)
            await setChatModel(true)
        }
        else {
            return "No Observation"
        }

    }

    // console.log(auditDetails.audit_status,rollId,queData[arrayPos].escalations_status,"kjhgfdswertyuio")
    const Observaition = () => {
        let item = queData[arrayPos]
        let newArray = queObservations.filter(function (el) {
            return el.questionId == item.id;
        })
        console.log(item, newArray, 'skdjbfksdfdfdfsdff')

        if (newArray && newArray.length > 0 && newArray[0] && newArray[0].observations) {
            return (
                <div>
                    <div>Comments:
                        {queData[arrayPos].escalations_status && queData[arrayPos].escalations_status != null && queData[arrayPos].escalations_status != undefined && queData[arrayPos].escalations_status != ''
                            ?
                            <span className='badge' style={{ color: 'white', background: (queData[arrayPos].escalations_status.includes("Accept") ? "#89fe02" : 'red'), fontSize: 'x-small', float: 'right' }}>{queData[arrayPos].escalations_status}</span>
                            : null}

                    </div>
                    <div>
                        <div style={{ width: "100%", maxHeight: "260px", overflowY: 'scroll' }}>
                            <div>
                                {newArray[0].observations.map((item, index) =>
                                    <div key={index} style={{ padding: "6px 16px", borderRadius: "5px", backgroundColor: "#fff", marginBottom: '5PX' }}>
                                        <div style={{ fontFamily: 'poppins', fontSize: '14px', fontWeight: 'bold', color: '#000', display: 'flex', justifyContent: 'space-between' }}>
                                            <div>{item.username} ({item.rolename})</div>
                                            <div style={{ fontFamily: 'poppins', fontSize: '13px', color: '#898686' }}>{formatDate(new Date(item.created))}</div>
                                        </div>
                                        <div style={{ fontFamily: 'poppins', fontSize: '13px', color: '#000' }}>{item.comments}</div>
                                    </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    const handleRemediation = (item) => {
        let newArray = remediaiondata.filter(function (el) {
            return el.Audit_question_id == item.id;
        }
        )
        console.log(newArray, "sdnfkndf")
        if (newArray.length > 0 && newArray[0].file_path) {
            if (toogle == "Low") {
                if (auditDetails.audit_status == 'Forwarded to CM' && rollId == 7) {
                    return (
                        <img src={newArray[0].file_path} onClick={() => handleModel2(newArray[0])} style={{ width: '300px', height: '200px', cursor: 'pointer' }} />
                    )
                }
                else {
                    return (
                        <img src={newArray[0].file_path} onClick={() => handleModel2(newArray[0])} style={{ width: '400px', height: '300px', cursor: 'pointer' }} />
                    )
                }
            }
            else {
                return (
                    <img src={newArray[0].file_path} onClick={() => handleModel2(newArray[0])} style={{ width: '400px', height: '300px', cursor: 'pointer' }} />
                )
            }

        }

    }


    const handleSend = (item, status) => {
        let deptobj = itemData
        if (Observation) {
            if (rollId == 5) {
                if (status) {
                    axios.post(`${ENV.API_END_POINT}AuditStatusReport/submit-status-ques-escstatus`, { auditId: item.audit_schedule_id, quesId: item.id, status: status })
                        .then((res) => {
                            axios.post(`${ENV.API_END_POINT}AuditQuestionnaireComments/createObservation`, { user_id: userId, Role_Id: parseInt(rollId), audit_schedule_id: item.audit_schedule_id, department_Id: item.audit_schedule_department_id, audit_schedule_questionnaire_id: item.id, comments: Observation })
                                .then(async (res) => {
                                    await setCmquesstatus("")
                                    await setRefresh("1")
                                    await setToggle("Low");
                                    await setDepartmentsVal(deptobj.name)
                                    await setItemData(deptobj)
                                })
                        })
                }
                else {
                    axios.post(`${ENV.API_END_POINT}AuditQuestionnaireComments/createObservation`, { user_id: userId, Role_Id: parseInt(rollId), audit_schedule_id: item.audit_schedule_id, department_Id: item.audit_schedule_department_id, audit_schedule_questionnaire_id: item.id, comments: Observation })
                        .then(async (res) => {
                            await setCmquesstatus("")
                            await setRefresh("1")
                            await setToggle("Low");
                            await setDepartmentsVal(deptobj.name)
                            await setItemData(deptobj)
                        })
                }

            }
            else if (rollId == 7) {
                if (status) {
                    axios.post(`${ENV.API_END_POINT}AuditStatusReport/submit-status-ques-escstatus`, { auditId: item.audit_schedule_id, quesId: item.id, status: status })
                        .then((res) => {
                            let data = {
                                user_id: userId,
                                Role_Id: rollId,
                                audit_schedule_id: item.audit_schedule_id,
                                department_Id: item.audit_schedule_department_id,
                                audit_schedule_questionnaire_id: item.id,
                                comments: Observation
                            };
                            axios.post(`${ENV.API_END_POINT}AuditQuestionnaireComments/createObservation`, data)
                                .then(async (res) => {
                                    await setCmquesstatus("")
                                    await setRefresh("1")
                                    await setToggle("Low");
                                    await setDepartmentsVal(deptobj.name)
                                    await setItemData(deptobj)
                                })
                        })
                }
                else {
                    let data = {
                        user_id: userId,
                        Role_Id: rollId,
                        audit_schedule_id: item.audit_schedule_id,
                        department_Id: item.audit_schedule_department_id,
                        audit_schedule_questionnaire_id: item.id,
                        comments: Observation
                    };
                    axios.post(`${ENV.API_END_POINT}AuditQuestionnaireComments/createObservation`, data)
                        .then(async (res) => {
                            await setCmquesstatus("")
                            await setRefresh("1")
                            await setToggle("Low");
                            await setDepartmentsVal(deptobj.name)
                            await setItemData(deptobj)
                        })
                }


            }
            else if(rollId == 8){
                if(status){
                    axios.post(`${ENV.API_END_POINT}AuditStatusReport/submit-status-ques-escstatus`, { auditId: item.audit_schedule_id, quesId: item.id, status: status })
                        .then((res) => {
                            let data = {
                                user_id: userId,
                                Role_Id: rollId,
                                audit_schedule_id: item.audit_schedule_id,
                                department_Id: item.audit_schedule_department_id,
                                audit_schedule_questionnaire_id: item.id,
                                comments: Observation
                            };
                    axios.post(
                        `${ENV.API_END_POINT}AuditStatusReport/submit-Audit-Answer`,
                        {
                            auditId: item.audit_schedule_id,
                            questionId: item.question_id,
                            answers: item.answer,
                        },
                    ).then((res) => {
                        console.log("successfully answerUpdated")
                    })
                    axios.post(`${ENV.API_END_POINT}AuditQuestionnaireComments/createObservation`, { user_id: userId, Role_Id: parseInt(rollId), audit_schedule_id: item.audit_schedule_id, department_Id: item.audit_schedule_department_id, audit_schedule_questionnaire_id: item.id, comments: Observation })
                    .then(async (res) => {
                        await setCmquesstatus("")
                        setObservation('')
                        await setRefresh("1")
                        await setToggle("Low");
                        await setDepartmentsVal(deptobj.name)
                        await setItemData(deptobj)
                    }) 
                })
                }
                else{
                    axios.post(
                        `${ENV.API_END_POINT}AuditStatusReport/submit-Audit-Answer`,
                        {
                            auditId: item.audit_schedule_id,
                            questionId: item.question_id,
                            answers: item.answer,
                        },
                    ).then((res) => {
                        console.log("successfully answerUpdated")
                    })
                    axios.post(`${ENV.API_END_POINT}AuditQuestionnaireComments/createObservation`, { user_id: userId, Role_Id: parseInt(rollId), audit_schedule_id: item.audit_schedule_id, department_Id: item.audit_schedule_department_id, audit_schedule_questionnaire_id: item.id, comments: Observation })
                    .then(async (res) => {
                        await setCmquesstatus("")
                        setObservation('')
                        await setRefresh("1")
                        await setToggle("Low");
                        await setDepartmentsVal(deptobj.name)
                        await setItemData(deptobj)
                    }) 
                }
            }
        }
        else {
            setObserHelpertext("Observation is required")
        }

    }



    const handleSatus = (item, status) => {
        // console.log(status, "skdnfksdfksd")
        if (status == "CM_Accept") {
            setCmquesstatus(status)
        }
        else if (status == "CM_Reject") {
            setCmquesstatus(status)
        }
        else if (status == "TL_Reject") {
            setCmquesstatus(status)
        }
        else if (status == "TL_Accept") {
            setCmquesstatus(status)
        }

    }

    const handleSendBack = async (status) => {
        const names = departments.map(item => item.name)
        // console.log(names, "sdkjfkdsnfjbds")
        let input = {
            "auditId": data.AuditId,
            "status": status,
            "AuditDetail": auditDetails,
            "departments": names
        }
        await axios.post(`${ENV.API_END_POINT}AuditStatusReport/update-audit-status`, input)
            .then((res) => {
                setDataLoad(1)
                Swal.fire({
                    icon: 'success',
                    text: `Successfully ${status}`,
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch((error) => { console.log(error) });
        navigate('/audits')
    }

    const checkAllQuestionIdsAndEscalationStatus = (data, queObservation) => {
        let allquesIdsPresent = data.every((question) => {
            return queObservation.filter((observation) => {
                return observation.questionId === question.id;
            });
        });

        if (allquesIdsPresent && rollId == 7) {
            const distinctObservQuestionIds = [
                ...new Set(queObservation.map((item) => item.questionId)),
            ];
            const foundquestions = data.filter((obj) => {
                return distinctObservQuestionIds.includes(obj.id);
            });

            const escalationStatuses = foundquestions.map(question => question.escalations_status);

            if (escalationStatuses.some(status => status === null || status === '')) {
                return "no_status";
            } else if (escalationStatuses.includes("CM_Reject")) {
                return "rejected";
            } else if (escalationStatuses.every(status => status === "CM_Accept")) {
                return "approved";
            }
        }
        else if (allquesIdsPresent && rollId == 5) {
            const distinctObservQuestionIds = [
                ...new Set(queObservation.map((item) => item.questionId)),
            ];
            const foundquestions = data.filter((obj) => {
                return distinctObservQuestionIds.includes(obj.id);
            });

            const escalationStatuses = foundquestions.map(question => question.escalations_status);

            if (escalationStatuses.some(status => status === null || status === '' || status === 'CM_Reject')) {
                return "no_status";
            } else if (escalationStatuses.includes("TL_Reject")) {
                return "rejected";
            } else if (escalationStatuses.every(status => status === "TL_Accept" || status === "CM_Accept")) {
                return "approved";
            }
        }
        else if (allquesIdsPresent && rollId == 8) {
            const distinctObservQuestionIds = [
                ...new Set(queObservation.map((item) => item.questionId)),
            ];
            const foundquestions = data.filter((obj) => {
                return distinctObservQuestionIds.includes(obj.id);
            });

            const escalationStatuses = foundquestions.map(question => question.escalations_status);

            if (escalationStatuses.every(status => status === "CAT_Acted")) {
                return "approved";
            }
        }
        else {
            return "approved";
        }
    };

    console.log(renderValue, "skjdbfkjsdbjkd")

    return (

        <div className='container-fluid' style={{ position: 'relative' }}>
            <div className='details-box'>
                {data && data.AuditId && auditDetails && auditDetails !== '' ?
                    <>
                        {auditDetails.audit_status != 'Closed' ?
                            <p className='status-span' style={{ color: status_obj[auditDetails.audit_status], position: 'absolute', top: 5, right: 10 }}>{auditDetails.audit_status}</p> : null}
                        {auditDetails.audit_status == 'Pending' ?
                            <ProgressBarDept status={status_obj[auditDetails.audit_status]} percentage={10} />
                            : auditDetails.audit_status == 'Scheduled' ?
                                <ProgressBarDept status={status_obj[auditDetails.audit_status]} percentage={20} />
                                : auditDetails.audit_status == 'In Progress' ?
                                    <ProgressBarDept status={status_obj[auditDetails.audit_status]} percentage={30} />
                                    : auditDetails.audit_status == 'Sent to PMO' ?
                                        <ProgressBarDept status={status_obj[auditDetails.audit_status]} percentage={40} />
                                        : auditDetails.audit_status == 'Sent to TL' ?
                                            <ProgressBarDept status={status_obj[auditDetails.audit_status]} percentage={50} />
                                            : auditDetails.audit_status == 'Sent to CM' ?
                                                <ProgressBarDept status={status_obj[auditDetails.audit_status]} percentage={60} />
                                                : auditDetails.audit_status == 'Sent Back to TL' ?
                                                    <ProgressBarDept status={status_obj[auditDetails.audit_status]} percentage={70} />
                                                    : auditDetails.audit_status == 'Draft' ?
                                                        <ProgressBarDept status={status_obj[auditDetails.audit_status]} percentage={0} />
                                                        : auditDetails.audit_status == 'Sent to CAT' ?
                                                            <ProgressBarDept status={status_obj[auditDetails.audit_status]} percentage={100} />
                                                            : auditDetails.audit_status == 'Sent to QC' ?
                                                                <ProgressBarDept status={status_obj[auditDetails.audit_status]} percentage={100} />
                                                                : auditDetails.audit_status == 'Forwarded to TL' ?
                                                                    <ProgressBarDept status={status_obj[auditDetails.audit_status]} percentage={100} />
                                                                    : auditDetails.audit_status == 'Forwarded to CM' ?
                                                                        <ProgressBarDept status={status_obj[auditDetails.audit_status]} percentage={100} /> : null}
                        <p className='audit-header'>{auditDetails.auditName}</p>
                        <p className='audit-code'>({auditDetails.company_code + '00' + auditDetails.AuditId})</p>
                        <div className='duration-header'>Start : {auditDetails.start_date} <br />End : {auditDetails.end_date}</div>
                        <p className='devider1'></p>
                        <p className='cinema-header'>{auditDetails.Cinema_name}</p>
                        <div className='cinema-address' style={{ marginTop: '5px' }}>{auditDetails.cinema_address}</div>
                        <p className='devider2'></p>
                        {auditDetails.AssignedTo && auditDetails.AssignedTo.length > 0 ?
                            <div className='team-header'>

                                {(auditDetails.AssignedTo).find(elem => elem.role_name == 'Auditor') ?
                                    <p><b>Auditor Details :</b>
                                        <p style={{ lineHeight: '10px', fontSize: '10px', marginTop: '3px' }}>
                                            {((auditDetails.AssignedTo).find(elem => elem.role_name == 'Auditor')['user_name']).map((item, index) =>
                                                <p style={{ lineHeight: '5px', fontSize: '10px' }}>{item}</p>
                                            )}
                                            <br />
                                            <FaInbox style={{ color: '#fff', marginRight: '5px' }} />{((auditDetails.AssignedTo).find(elem => elem.role_name == 'Auditor')['user_Email']).map((item, index) => <span style={{ lineHeight: '5px', fontSize: '10px', marginTop: '3px' }}>{item}&nbsp;|&nbsp;</span>)}
                                            <FaMobileAlt style={{ color: '#fff', marginRight: '5px' }} />{((auditDetails.AssignedTo).find(elem => elem.role_name == 'Auditor')['user_Mobile']).map((item, index) => <span style={{ lineHeight: '5px', fontSize: '10px', marginTop: '3px' }}>{item}</span>)}
                                        </p>


                                    </p>
                                    : null}


                                {(auditDetails.AssignedTo).find(elem => elem.role_name == 'Project Management Office') ? <p style={{ marginTop: '-5px' }}><b>PMO Details :</b> <span style={{ fontSize: '10px' }}><br />{((auditDetails.AssignedTo).find(elem => elem.role_name == 'Project Management Office')['user_name']).toString()}<br /> <FaInbox style={{ color: '#fff', marginRight: '5px' }} />{((auditDetails.AssignedTo).find(elem => elem.role_name == 'Project Management Office')['user_Email']).toString()} | <FaMobileAlt style={{ color: '#fff', marginRight: '5px' }} />{((auditDetails.AssignedTo).find(elem => elem.role_name == 'Project Management Office')['user_Mobile']).toString()} </span> <br /></p> : null}

                                {(auditDetails.AssignedTo).find(elem => elem.role_name == 'Team Lead') ? <p style={{ marginTop: '-5px' }}><b>TL Details :</b> <span style={{ fontSize: '10px' }}><br />{((auditDetails.AssignedTo).find(elem => elem.role_name == 'Team Lead')['user_name']).toString()} <br /> <FaInbox style={{ color: '#fff', marginRight: '5px' }} />{((auditDetails.AssignedTo).find(elem => elem.role_name == 'Team Lead')['user_Email']).toString()} | <FaMobileAlt style={{ color: '#fff', marginRight: '5px' }} /> {((auditDetails.AssignedTo).find(elem => elem.role_name == 'Team Lead')['user_Mobile']).toString()} </span> <br /> </p> : null}

                                {(auditDetails.AssignedTo).find(elem => elem.role_name == 'Cinema Manager') ? <p style={{ marginTop: '-5px' }}><b>CM Details :</b> <span style={{ fontSize: '10px' }}><br />{((auditDetails.AssignedTo).find(elem => elem.role_name == 'Cinema Manager')['user_name']).toString()} <br /> <FaInbox style={{ color: '#fff', marginRight: '5px' }} />{((auditDetails.AssignedTo).find(elem => elem.role_name == 'Cinema Manager')['user_Email']).toString()} | <FaMobileAlt style={{ color: '#fff', marginRight: '5px' }} />{((auditDetails.AssignedTo).find(elem => elem.role_name == 'Cinema Manager')['user_Mobile']).toString()} </span> <br /> </p> : null}

                                {(auditDetails.AssignedTo).find(elem => elem.role_name == 'Regional Manager') ? <p style={{ marginTop: '-5px' }}><b>RM Details : </b><span style={{ fontSize: '10px' }}><br />{((auditDetails.AssignedTo).find(elem => elem.role_name == 'Regional Manager')['user_name']).toString()} <br /> <FaInbox style={{ color: '#fff', marginRight: '5px' }} />{((auditDetails.AssignedTo).find(elem => elem.role_name == 'Regional Manager')['user_Email']).toString()} | <FaMobileAlt style={{ color: '#fff', marginRight: '5px' }} />{((auditDetails.AssignedTo).find(elem => elem.role_name == 'Regional Manager')['user_Mobile']).toString()} </span> <br /> </p> : null}

                                {(auditDetails.AssignedTo).find(elem => elem.role_name == 'Regional Director') ? <p style={{ marginTop: '-5px' }}><b>RD Details :</b> <span style={{ fontSize: '10px' }}><br />{((auditDetails.AssignedTo).find(elem => elem.role_name == 'Regional Director')['user_name']).toString()} <br /> <FaInbox style={{ color: '#fff', marginRight: '5px' }} />{((auditDetails.AssignedTo).find(elem => elem.role_name == 'Regional Director')['user_Email']).toString()} | <FaMobileAlt style={{ color: '#fff', marginRight: '5px' }} />{((auditDetails.AssignedTo).find(elem => elem.role_name == 'Regional Director')['user_Mobile']).toString()} </span> <br /> </p> : null}

                            </div>
                            : null}
                        <p className='devider3'></p>
                        {auditDetails.audit_status == 'In Progress' ?
                            <div style={{ marginTop: '50px' }} >
                                <p style={{ position: 'absolute', fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '10px', color: '#fff', top: '60vh', left: '3vh' }}>Score/Total</p>
                                <p style={{ position: 'absolute', fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '27px', color: '#e3b912', top: '63vh', left: '3vh' }}>{mark}<span style={{ color: '#A0A0A0' }}>/{totalMark}</span></p>
                                <p style={{ position: 'absolute', fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '8px', color: '#fff', top: '60vh', left: '30.5vh' }}> Questions</p>
                                <p style={{ position: 'absolute', fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '27px', color: '#A0A0A0', top: '63vh', left: Total > 99 ? '28vh' : '29vh' }}><span style={{ color: '#e3b912' }}>{filledAnswer}</span>/{Total}</p>
                                <p style={{ position: 'absolute', fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '8px', color: '#e3b912', top: '75vh', left: '3vh' }}>{"( " + percentage + " ) %"}</p>
                                <BorderLinearProgress variant="determinate" value={percentage} style={{ marginTop: '23px' }} />


                            </div>
                            : auditDetails.audit_status == 'Closed' ?
                                <span> <img src="./closed1.png" alt="closed" style={{ width: '100px', opacity: '0.5', rotate: '-30deg', justifyContent: 'center', alignItems: 'center', marginTop: '61vh', marginLeft: '15vh' }} /> </span>
                                : null}
                        {status_obj.hasOwnProperty(auditDetails.audit_status) && auditDetails.audit_status == 'Draft' && role == "5" ?
                            <div className='button-comp' style={{ marginTop: '-55px', marginRight: '20px' }}>
                                {auditDetails.audit_status == 'Draft' && role == "5" ?
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ marginTop: "20px" }}>
                                            <p style={{ fontFamily: 'Poppins', fontSize: '12px', color: '#fff', }}>Score/Total</p>
                                            <p style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '31px',marginTop:'-10px', color: '#e3b912', }}>{mark}/{totalMark}</p>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <Link to='/Editaudits' state={auditDetails}>
                                                <button className='add_btn' style={{ backgroundColor: '#e3b912', color: '#fff', width: '100px', marginRight: '10px',fontSize:"10px" }}>Define Team</button>
                                            </Link>
                                            <button className='add_btn' style={{ width: '100px', padding: '0px 15px',fontSize:"10px" }} onClick={() => handleApprove('Re-Scheduled')}>Reschedule</button>
                                        </div>
                                    </div>
                                    : ""
                                }

                            </div>
                            : role == "6" && auditDetails.audit_status == 'Sent to PMO' ?
                                <div style={{ display: 'flex' }}>
                                    <div style={{ marginTop: "20px", position: 'absolute', top: '52vh' }}>
                                        <p style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '12px', color: '#fff', marginTop: '30px',marginLeft:'15px' }}>Score/Total</p>
                                        <p style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '31px', color: '#e3b912',marginTop:'-10px',marginLeft:'10px' }}>{mark}/{totalMark}</p>
                                    </div>

                                    <div className='button-comp' >
                                        <button className='add_btn' style={{ backgroundColor: '#e3b912', color: '#fff', alignItems: 'center', border: '1px solid #e3b912',fontSize:'10px',padding:'0px 20px'}} onClick={() => handleApprove('Sent to TL')}> Approve</button>
                                    </div>
                                </div>
                                : role == "5" && auditDetails.audit_status == 'Sent to TL' ?
                                    <div className='button-comp' style={{ marginTop: '-55px', marginRight: '20px' }}>

                                        <div style={{ marginTop: "20px" }}>
                                            <p style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '12px', color: '#fff', }}>Score/Total</p>
                                            <p style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '31px', color: '#e3b912', }}>{mark}/{totalMark}</p>
                                        </div>
                                        <div>
                                            <button className='add_btn' style={{ backgroundColor: '#e3b912', color: '#fff', marginLeft: '47px', marginTop: '-5px', border: '1px solid #e3b912' }} onClick={() => handleApprove('Sent to CM')}><BsCheckCircle /> Approve</button>
                                            {/* <button className='add_btn'><BsArrowLeft /> Send Back</button> */}
                                        </div>

                                    </div>
                                    : role == "5" && auditDetails.audit_status == 'Sent Back to TL' ?
                                        <div className='button-comp' style={{ marginTop: '-55px', marginRight: '20px' }}>
                                            <div style={{ display: 'flex',flexDirection:'column' }}>
                                                <div style={{ marginTop: "60px" }}>
                                                    <p style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '12px', color: '#fff', }}>Score/Total</p>
                                                    <p style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '31px', color: '#e3b912',marginTop:'-10px' }}>{mark}/{totalMark}</p>
                                                </div>
                                                <div style={{ marginLeft: '120px', marginTop: '50px' }}>
                                                    {renderValue == "approved" ?
                                                        <button className='add_btn' style={{ backgroundColor: '#e3b912', color: '#fff', marginLeft: '1.5vh', border: '1px solid #e3b912' }} onClick={() => handleApprove('Sent to QC')}><BsCheckCircle />Approve</button> :
                                                        renderValue == "rejected" ?
                                                            <button className='add_btn' onClick={() => handleSendBack('Sent to CAT')}> Escalate</button> : null}
                                                </div>
                                            </div>
                                        </div>
                                        : role == "8" && auditDetails.audit_status == 'Pending' ?
                                            <div className='button-comp' >
                                                <div >
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <button className='add_btn' style={{ padding: '0px 15px' }} onClick={() => handleApprove('Re-Scheduled')}>Reschedule</button>
                                                        <button className='add_btn' style={{ backgroundColor: '#e3b912', color: '#fff', padding: '0px 15px' }} onClick={() => handleApprove('Scheduled')}> Approve</button>
                                                    </div>
                                                </div>
                                            </div>
                                            : role == "7" && auditDetails.audit_status == 'Sent to CM' ?
                                                <div className='button-comp' style={{ marginTop: '15px', marginRight: '20px' }}>
                                                    <div style={{ display:'flex',flexDirection:'column'}}>
                                                        <div style={{}}>
                                                            <p style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '12px', color: '#fff', }}>Score/Total</p>
                                                            <p style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '31px', color: '#e3b912',marginTop:'-10px' }}>{mark}/{totalMark}</p>
                                                        </div>
                                                        <div>
                                                            {renderValue == "approved" ?
                                                                <button className='add_btn' style={{ backgroundColor: '#e3b912', color: '#fff', marginLeft: '1vh', border: '1px solid #e3b912' }} onClick={() => handleApprove('Sent Back to TL')}><BsCheckCircle /> Approve</button> :
                                                                renderValue == "rejected" ?
                                                                    <button className='add_btn' style={{}} onClick={() => handleSendBack('Sent Back to TL')}>Send Back</button> : null}

                                                        </div>
                                                    </div>
                                                </div>
                                                : role == "8" && auditDetails.audit_status == 'Sent to CAT' ?
                                                    <div>
                                                        <div style={{ marginTop: "20px" }}>
                                                            <p style={{ position: 'absolute', fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '12px', color: '#fff', top: '70vh', left: '3vh' }}>Score/Total</p>
                                                            <p style={{ position: 'absolute', fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '31px', color: '#e3b912', top: '72vh', left: '3vh' }}>{mark}/{totalMark}</p>
                                                        </div>

                                                        <div className='button-comp'>
                                                        {renderValue == "approved" ? <button className='add_btn' style={{ backgroundColor: '#e3b912', color: '#fff', marginLeft: '150px', border: '1px solid #e3b912' }} onClick={() => handleApprove('Forwarded to TL')}> Approve</button> : null }
                                                        </div>
                                                    </div>
                                                    : role == "9" && auditDetails.audit_status == 'Sent to QC' ?
                                                        <div>
                                                            <div style={{ marginTop: "20px" }}>
                                                                <p style={{ position: 'absolute', marginTop: '10px', top: '57vh', left: '3vh' }}>Audit Report:</p>
                                                                <a href={auditDetails.File_Name} download="download.pptx" style={{ textDecoration: 'none', position: 'absolute', marginTop: '10px', cursor: 'pointer', top: '57vh', left: '18vh' }}>
                                                                    Download <FaDownload style={{ fontSize: '15px', color: '#e3b912' }} />
                                                                </a>
                                                                <div className='upload_btn' style={{ position: 'absolute', textDecoration: 'none', lineHeight: '20px', marginTop: '30px', cursor: 'pointer', top: '59vh', left: '3vh' }} onClick={() => { hiddenFileInput2.current.click(); }}>
                                                                    <input type="file" style={{ display: 'none' }} ref={hiddenFileInput2} onChange={handleFileReport} />
                                                                    <FaUpload style={{ fontSize: '15px' }} />&nbsp;Upload
                                                                </div>
                                                            </div>
                                                            <div style={{ marginTop: "20px" }}>
                                                                <p style={{ position: 'absolute', fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '12px', color: '#fff', top: '70vh', left: '3vh' }}>Score/Total</p>
                                                                <p style={{ position: 'absolute', fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '31px', color: '#e3b912', top: '72vh', left: '3vh' }}>{mark}/{totalMark}</p>
                                                            </div>
                                                            <div className='button-comp'>
                                                                <button className='add_btn' style={{ backgroundColor: '#e3b912', color: '#fff', marginLeft: '47px', marginTop: '-5px', border: '1px solid #e3b912' }} onClick={() => handleApprove('Forwarded to CAT')}>
                                                                    <BsCheckCircle /> Approve
                                                                </button>
                                                                {/* <button className='add_btn' onClick={() => handleReject('Sent Back to TL')}><BsArrowLeft />Send Back</button> */}
                                                            </div>
                                                        </div>
                                                        : role == "8" && auditDetails.audit_status == 'Forwarded to CAT' ?
                                                            <div>
                                                                <div style={{ marginTop: "20px" }}>
                                                                    <p style={{ position: 'absolute', marginTop: '10px', cursor: 'pointer', top: '57vh', left: '3vh' }}>Audit Report:</p>
                                                                    <a href={auditDetails.File_Name} download="download.pptx" style={{ textDecoration: 'none', textDecorationColor: 'black', position: 'absolute', fontSize: '12px', marginTop: '10px', cursor: 'pointer', top: '57vh', left: '18vh' }}>
                                                                        Download &nbsp; <FaDownload style={{ fontSize: '15px', color: '#e3b912' }} />
                                                                    </a>
                                                                </div>
                                                                <div style={{ marginTop: "20px" }}>
                                                                    <p style={{ position: 'absolute', fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '12px', color: '#fff', top: '70vh', left: '3vh' }}>Score/Total</p>
                                                                    <p style={{ position: 'absolute', fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '31px', color: '#e3b912', top: '72vh', left: '3vh' }}>{mark}/{totalMark}</p>
                                                                </div>
                                                                <div className='button-comp'>
                                                                    <button className='add_btn' style={{ backgroundColor: '#e3b912', color: '#fff', marginLeft: '47px', marginTop: '-5px', border: '1px solid #e3b912' }} onClick={() => handleApprove('Forwarded to CM')}>
                                                                        <BsCheckCircle /> Approve
                                                                    </button>
                                                                    {/* <button className='add_btn' onClick={() => handleReject('Sent Back to TL')}><BsArrowLeft />Send Back</button> */}
                                                                </div>
                                                            </div>
                                                            : (role == "7" && auditDetails.audit_status == 'Forwarded to CM')?
                                                                <div>
                                                                    <div style={{ marginTop: "20px" }}>
                                                                        <p style={{ position: 'absolute', marginTop: '10px', cursor: 'pointer', top: '57vh', left: '3vh' }}>Audit Report:</p>
                                                                        <a href={auditDetails.File_Name} download="download.pptx" style={{ textDecoration: 'none', position: 'absolute', marginTop: '10px', cursor: 'pointer', top: '57vh', left: '18vh' }}>
                                                                            Download &nbsp; <FaDownload style={{ fontSize: '15px', color: '#e3b912' }} />
                                                                        </a>
                                                                    </div>
                                                                    <div style={{ marginTop: "20px" }}>
                                                                        <p style={{ position: 'absolute', fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '12px', color: '#fff', top: '70vh', left: '3vh' }}>Score/Total</p>
                                                                        <p style={{ position: 'absolute', fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '31px', color: '#e3b912', top: '72vh', left: '3vh' }}>{mark}/{totalMark}</p>
                                                                    </div>
                                                                    <div className='button-comp'>
                                                                        <button className='add_btn' style={{ backgroundColor: '#e3b912', color: '#fff', marginLeft: '150px', border: '1px solid #e3b912' }} onClick={() => handleApprove('CAT to Validate')}>
                                                                            <BsCheckCircle /> Approve
                                                                        </button>
                                                                        {/* <button className='add_btn' onClick={() => handleReject('Sent Back to TL')}><BsArrowLeft />Send Back</button> */}
                                                                    </div>
                                                                </div>
                                                                : (role == "8" && auditDetails.audit_status == 'CAT to Validate')?
                                                                <div>
                                                                    <div style={{ marginTop: "20px" }}>
                                                                        <p style={{ position: 'absolute', marginTop: '10px', cursor: 'pointer', top: '57vh', left: '3vh',color:'#fff' }}>Audit Report:</p>
                                                                        <a href={auditDetails.File_Name} download="download.pptx" style={{ textDecoration: 'none', position: 'absolute', marginTop: '10px', cursor: 'pointer', top: '57vh', left: '18vh' }}>
                                                                            <FaDownload style={{ fontSize: '15px', color: '#e3b912' }} />
                                                                        </a>
                                                                    </div>
                                                                    <div style={{ marginTop: "20px" }}>
                                                                        <p style={{ position: 'absolute', fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '12px', color: '#fff', top: '70vh', left: '3vh' }}>Score/Total</p>
                                                                        <p style={{ position: 'absolute', fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '31px', color: '#e3b912', top: '72vh', left: '3vh' }}>{mark}/{totalMark}</p>
                                                                    </div>
                                                                    {/* <div className='button-comp'>
                                                                        <button className='add_btn' style={{ backgroundColor: '#e3b912', color: '#fff', marginLeft: '150px', border: '1px solid #e3b912' }} onClick={() => handleApprove('CAT to Validate')}>
                                                                            <BsCheckCircle /> Approve
                                                                        </button>
                                                                        <button className='add_btn' onClick={() => handleReject('Sent Back to TL')}><BsArrowLeft />Send Back</button>
                                                                    </div> */}
                                                                </div>
                                                                : role == "5" && auditDetails.audit_status == 'Forwarded to TL' ?
                                                                    <div>
                                                                        <div style={{ marginTop: "20px" }}>
                                                                            <p style={{ position: 'absolute', fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '12px', color: '#fff', top: '70vh', left: '3vh' }}>Score/Total</p>
                                                                            <p style={{ position: 'absolute', fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '31px', color: '#e3b912', top: '72vh', left: '3vh' }}>{mark}/{totalMark}</p>
                                                                        </div>

                                                                        <div className='button-comp'>
                                                                            <button className='add_btn' style={{ backgroundColor: '#e3b912', color: '#fff', marginLeft: '150px', border: '1px solid #e3b912' }} onClick={() => handleApprove('Sent to QC')}><BsCheckCircle /> Approve</button>
                                                                        </div>
                                                                    </div>
                                                                    : auditDetails.audit_status == 'Report Published' ?
                                                                        <div>
                                                                            <div style={{ marginTop: "20px" }}>
                                                                                <p style={{ position: 'absolute', marginTop: '10px', cursor: 'pointer', top: '57vh', left: '3vh' }}>Audit Report:</p>
                                                                                <a href={auditDetails.File_Name} download="download.pptx" style={{ textDecoration: 'none', position: 'absolute', marginTop: '10px', cursor: 'pointer', top: '57vh', left: '18vh' }}>
                                                                                    Download &nbsp; <FaDownload style={{ fontSize: '15px', color: '#e3b912' }} />
                                                                                </a>
                                                                            </div>
                                                                            <div style={{ marginTop: "20px" }}>
                                                                                    <p style={{ position: 'absolute', fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '12px', color: '#fff', top: '70vh', left: '3vh' }}>Score/Total</p>
                                                                                    <p style={{ position: 'absolute', fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '31px', color: '#e3b912', top: '72vh', left: '3vh' }}>{mark}/{totalMark}</p>
                                                                                </div>
                                                                            </div> :
                                                                            auditDetails.audit_status == 'Scheduled' ?
                                                                                <div>
                                                                                    <p style={{ position: 'absolute', fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '12px', color: '#fff', top: '68vh', left: '3vh' }}>Score/Total</p>
                                                                                    <p style={{ position: 'absolute', fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '31px', color: '#e3b912', top: '71vh', left: '3vh' }}>{mark}/{totalMark}</p>
                                                                                </div>
                                                                                :
                                                                                auditDetails.audit_status == 'Re-Scheduled' && role == "5" ?
                                                                                    <div className='button-comp' >
                                                                                        <div style={{ marginTop: "20px" }}>
                                                                                            <p style={{ fontFamily: 'Poppins', fontSize: '12px', color: '#fff', }}>Score/Total</p>
                                                                                            <p style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontSize: '31px', marginTop: '-10px', color: '#e3b912', }}>{mark}/{totalMark}</p>
                                                                                        </div>
                                                                                        <div style={{ display: 'flex' }}>
                                                                                            <Link to='/Editaudits' state={auditDetails}>
                                                                                                <button className='add_btn' style={{ backgroundColor: '#e3b912', color: '#fff', width: '100px', marginRight: '10px', fontSize: "10px" }}>Reschedule</button>
                                                                                            </Link>
                                                                                            <button className='add_btn' style={{ width: '100px', padding: '0px 15px', fontSize: "10px" }} onClick={() => handleDeleteAudit()}>Delete</button>
                                                                                        </div>
                                                                                    </div> :
                                                                                    null}
                    </>

                    : null}

            </div>

            <div className="department-box">
                <nav>
                    {departments.map((item) =>
                        <>
                            <button className='abc1 me-1'
                                style={{ background: departmentsVal == item.name ? '#fff' : 'transparent', color: departmentsVal == item.name ? 'black' : '#fff' }}
                                onClick={() => { handleClick(item) }} >{item.name} <br />
                                {departmentsVal == item.name ? <div style={{ backgroundColor: '#e3b912', width: 'auto', marginTop: '6px', height: '4px' }}></div> : null}</button>
                        </>
                    )}
                </nav>
            </div>
            {itemData !== '' ?
                <div className='question-box'>
                    <div>
                        {auditDetails && auditDetails !== '' && auditDetails.audit_status !== 'Draft' && auditDetails.audit_status !== 'Pending' && auditDetails.audit_status !== 'Scheduled' ?
                            <div className="LowAndAllBox">
                                {rollId == '7' ?
                                    <button className={toogle == "Low" ? "togglebtnselect" : "togglebtn"} style={{ marginTop: '10px' }} onClick={() => handleToogle("Low")} >Observations<br /></button>
                                    :
                                    <div> <button className={toogle == "All" ? "togglebtnselect" : "togglebtn"} style={{ marginTop: '10px' }} onClick={() => handleToogle("All")} >All <br /></button>
                                        <button className={toogle == "Low" ? "togglebtnselect" : "togglebtn"} style={{ marginTop: '10px' }} onClick={() => handleToogle("Low")} >Observations<br /></button></div>

                                }


                            </div>
                            : null
                        }

                        <div className='question-text'>
                            {queData && queData && queData.length > 0 ?
                                (auditDetails && auditDetails !== '' && auditDetails.audit_status == 'Draft') || (auditDetails && auditDetails !== '' && auditDetails.audit_status == 'Pending') || (auditDetails && auditDetails !== '' && auditDetails.audit_status == 'Scheduled') ?
                                    <div style={{ marginTop: '25px' }}>
                                        {queData.map((item, index) =>
                                            <div>
                                                {auditDetails.audit_status == 'Draft' ? <span style={{ float: 'right', marginTop: '-5px' }}><BsTrash style={{ marginLeft: '15px', color: '#d63031', cursor: 'pointer', fontSize: '20px' }} onClick={() => handleDelete(item)} /></span> : null}
                                                <span className='badge' style={{ color: 'white', background: criticality_obj[item.criticality], fontSize: 'x-small', float: 'right' }}>{item.criticality}</span>
                                                <p className='mb-2'> <b>Question No. {index + 1} :</b><br /> {item.question} {item.imagePath ? <img src={item.imagePath} onClick={() => handleModel(item.imagePath)} style={{ width: '40px', height: '30px', cursor: 'pointer' }} /> : ''}</p>
                                                <p className='mb-2' style={{ display: 'flex', alignItems: 'center' }}> <b style={{ position: 'relative', top: '4px' }}>Answer : </b>{item.answer ?
                                                    item.Q_Type == 'single' ?
                                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                                                            <FormControl disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true} style={{ marginLeft: '10px', marginTop: '-13px' }}><p style={{ display: 'none' }}>{item.answer}</p>
                                                                <RadioGroup
                                                                    style={{ display: 'block', fontFamily: 'Poppins' }}
                                                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                                                    name="controlled-radio-buttons-group"
                                                                    value={item.answer}
                                                                    disabled
                                                                    onChange={(e) => handleChange(item.id, e.target.value)}>
                                                                    {item.options.map((ele) =>
                                                                        <FormControlLabel value={ele.value} control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#e3b912' } }}
                                                                        />} label={<p className='answer-text pt-3'>{ele.label}</p>} />
                                                                    )}
                                                                </RadioGroup>
                                                            </FormControl>
                                                            {isEditMode[item.id] ? <p>Edited</p> : null}
                                                        </div>

                                                        : item.Q_Type == 'multiple' ?

                                                            <FormControl style={{ marginLeft: '10px', marginTop: '7px' }} >
                                                                <FormGroup
                                                                    style={{ display: 'block' }}
                                                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                                                    name="controlled-radio-buttons-group"
                                                                    disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true}
                                                                >
                                                                    {item.options.map((ele) => (
                                                                        <FormControlLabel
                                                                            value={ele.value}
                                                                            disabled
                                                                            checked={
                                                                                (item.answer).includes(',')
                                                                                    ? ((item.answer).split(',')).find((el) => el === ele.value)
                                                                                        ? true
                                                                                        : false
                                                                                    : item.answer == ele.value
                                                                                        ? true
                                                                                        : false

                                                                            }
                                                                            control={
                                                                                <Checkbox
                                                                                    sx={{ '&.Mui-checked': { color: '#e3b912' } }}
                                                                                    onChange={(event) => handleChangeCheck(item.id, event.target.value)}
                                                                                    value={ele.value}
                                                                                    disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true}
                                                                                />
                                                                            }
                                                                            label={<p className='answer-text pt-3'>{ele.label}</p>}
                                                                        />
                                                                    ))}
                                                                </FormGroup>
                                                            </FormControl>
                                                            : item.Q_Type == 'text' || item.Q_Type == 'textArea' ?
                                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                                                                    <input className='form-control' type='text' disabled onChange={(e) => handleChange(item.id, e.target.value)} value={item.answer} style={{ marginLeft: '10px', marginTop: '9px', width: 'auto', fontFamily: 'Poppins', fontSize: '12px' }} />
                                                                    {isEditMode[item.id] ? <p style={{ position: 'absolute', left: '200px', top: '10px' }}>Edited</p> : null}
                                                                </div>
                                                                :
                                                                item.Q_Type == 'rating' ?
                                                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                                                                        <Rating style={{ marginLeft: '10px', marginTop: '7px' }}
                                                                            name="Rating"
                                                                            readOnly={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true}
                                                                            value={isRating ? isRating : item.answer}
                                                                            max={item.Max_Rating}
                                                                            onChange={(event, newValue) => handleChangeRating(item.id, newValue)}
                                                                        />
                                                                        {isEditMode[item.id] ? <p style={{ position: 'absolute', left: '170px', top: '10px' }}>Edited</p> : null}
                                                                    </div>
                                                                    : item.Q_Type == 'quantity' ?
                                                                        <div style={{ display: 'flex', alignItems: 'center', }}>
                                                                            <input className='form-control' type='number' disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true} onChange={(e) => handleChange(item.id, e.target.value)} value={item.answer} style={{ marginLeft: '10px', marginTop: '9px', width: 'auto', fontFamily: 'Poppins', fontSize: '12px' }} />
                                                                            {isEditMode[item.id] ? <p style={{ textAlign: 'right', margin: '15px' }}>Edited</p> : null}
                                                                        </div>
                                                                        : null

                                                    :
                                                    item.Q_Type == 'single' ?
                                                        <FormControl style={{ marginLeft: '10px', marginTop: '7px' }} >
                                                            <RadioGroup
                                                                style={{ display: 'block' }}
                                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                                name="controlled-radio-buttons-group"
                                                            >
                                                                {item.Opt1 != '' ? <FormControlLabel value={item.Opt1} control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#e3b912' } }} />} label={<p className='answer-text pt-3'>{item.Opt1}</p>} /> : null}
                                                                {item.Opt2 != '' ? <FormControlLabel value={item.Opt2} control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#e3b912' } }} />} label={<p className='answer-text pt-3'>{item.Opt2}</p>} /> : null}
                                                                {item.Opt3 != '' ? <FormControlLabel value={item.Opt3} control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#e3b912' } }} />} label={<p className='answer-text pt-3'>{item.Opt3}</p>} /> : null}
                                                                {item.Opt4 != '' ? <FormControlLabel value={item.Opt4} control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#e3b912' } }} />} label={<p className='answer-text pt-3'>{item.Opt4}</p>} /> : null}
                                                                {item.Opt5 != '' ? <FormControlLabel value={item.Opt5} control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#e3b912' } }} />} label={<p className='answer-text pt-3'>{item.Opt5}</p>} /> : null}
                                                                {item.Opt6 != '' ? <FormControlLabel value={item.Opt6} control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#e3b912' } }} />} label={<p className='answer-text pt-3'>{item.Opt6}</p>} /> : null}
                                                            </RadioGroup>
                                                        </FormControl>
                                                        : item.Q_Type == 'multiple' ?
                                                            <FormControl style={{ marginLeft: '10px', marginTop: '-13px' }}>
                                                                <FormGroup
                                                                    style={{ display: 'block' }}
                                                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                                                    name="controlled-radio-buttons-group"

                                                                >
                                                                    {item.Opt1 != '' ? <FormControlLabel value={item.Opt1} control={<Checkbox size='small' sx={{ '&.Mui-checked': { color: '#e3b912' } }} disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true} />} label={<p className='answer-text pt-3'>{item.Opt1}</p>} /> : null}
                                                                    {item.Opt2 != '' ? <FormControlLabel value={item.Opt2} control={<Checkbox size='small' sx={{ '&.Mui-checked': { color: '#e3b912' } }} disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true} />} label={<p className='answer-text pt-3'>{item.Opt2}</p>} /> : null}
                                                                    {item.Opt3 != '' ? <FormControlLabel value={item.Opt3} control={<Checkbox size='small' sx={{ '&.Mui-checked': { color: '#e3b912' } }} disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true} />} label={<p className='answer-text pt-3'>{item.Opt3}</p>} /> : null}
                                                                    {item.Opt4 != '' ? <FormControlLabel value={item.Opt4} control={<Checkbox size='small' sx={{ '&.Mui-checked': { color: '#e3b912' } }} disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true} />} label={<p className='answer-text pt-3'>{item.Opt4}</p>} /> : null}
                                                                    {item.Opt5 != '' ? <FormControlLabel value={item.Opt5} control={<Checkbox size='small' sx={{ '&.Mui-checked': { color: '#e3b912' } }} disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true} />} label={<p className='answer-text pt-3'>{item.Opt5}</p>} /> : null}
                                                                    {item.Opt6 != '' ? <FormControlLabel value={item.Opt6} control={<Checkbox size='small' sx={{ '&.Mui-checked': { color: '#e3b912' } }} disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true} />} label={<p className='answer-text pt-3'>{item.Opt6}</p>} /> : null}
                                                                </FormGroup>
                                                            </FormControl>
                                                            :
                                                            item.Q_Type == 'rating' ?
                                                                <div style={{ marginLeft: '10px', marginTop: '7px' }}>
                                                                    <Rating name="Rating" value={item.answer} max={item.Max_Rating} /></div>
                                                                : item.Q_Type == 'text' || item.Q_Type == 'textArea' ?
                                                                    <input className='form-control' type='text' disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true} onChange={(e) => handleChange(item.id, e.target.value)} value={item.answer} style={{ marginLeft: '10px', marginTop: '9px', width: 'auto', fontFamily: 'Poppins', fontSize: '12px' }} />
                                                                    : item.Q_Type == 'quantity' ?

                                                                        <input className='form-control' type='text' disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true} onChange={(e) => handleChange(item.id, e.target.value)} value={item.answer} style={{ marginLeft: '10px', marginTop: '9px', width: 'auto', fontFamily: 'Poppins', fontSize: '12px' }} />


                                                                        : null

                                                }</p>
                                                {item.FILE_PATH ? <p className='mb-2' style={{ display: 'flex', alignItems: 'center' }}> <b style={{ position: 'relative', top: '4px' }}>Attachment : </b>
                                                    <img src={item.FILE_PATH} onClick={() => handleModel(item)} style={{ width: '40px', height: '30px', cursor: 'pointer' }} />
                                                </p> : ''}

                                                <p className='devider' />
                                            </div>
                                        )}
                                    </div>
                                    :
                                    toogle == "Low" ?
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                                {arrayPos != 0 ? <button style={{ backgroundColor: '#e3b912', color: '#fff', border: 'none', borderRadius: '10px', width: '80px' }} onClick={handlePrev}><FaAngleDoubleLeft style={{ color: '#fff' }} /></button> : null}
                                                {arrayPos != queData.length - 1 ? <button style={{ backgroundColor: '#e3b912', color: '#fff', border: 'none', borderRadius: '10px', width: '80px' }} onClick={handleNext} ><FaAngleDoubleRight style={{ color: '#fff' }} /></button> : null}
                                            </div>
                                            <span className='badge' style={{ color: 'white', background: criticality_obj[queData[arrayPos].criticality], fontSize: 'x-small', float: 'right' }}>{queData[arrayPos].criticality}</span>
                                            {toogle == "Low" && queData[arrayPos].escalations_status && queData[arrayPos].escalations_status != null && queData[arrayPos].escalations_status != undefined && queData[arrayPos].escalations_status != '' ?
                                                <span className='badge' style={{ color: 'white', background: (queData[arrayPos].escalations_status.includes("Accept") ? "#89fe02" : 'red'), fontSize: 'x-small', float: 'right' }}>{queData[arrayPos].escalations_status}</span>
                                                : null}
                                                {rollId == "7"? <p className='mb-2'> <b>Question No. {arrayPos + 1} :</b><br /> {queData[arrayPos].question} {queData[arrayPos].imagePath ? <img src={queData[arrayPos].imagePath} onClick={() => handleModel(queData[arrayPos].imagePath)} style={{ width: '40px', height: '30px', cursor: 'pointer' }} /> : ''}</p>: null}
                                                    <p className='mb-2' style={{ display: 'flex', }}> <b style={{ position: 'relative', top: '4px' }}>Answer :</b>{queData[arrayPos].answer ?
                                                        queData[arrayPos].Q_Type == 'single' ?
                                                            <div style={{ width: '90%' }}>
                                                                <div style={{ position: 'relative' }}>
                                                                    <FormControl disabled={(role == "6" && auditDetails.audit_status == 'Sent to PMO') || (role == "5" && auditDetails.audit_status == 'Sent Back to TL' && toogle == "Low" && queData[arrayPos].escalations_status == "TL_Accept") || (role == "8" && auditDetails.audit_status == 'Sent to CAT' && toogle == "Low" && queData[arrayPos].escalations_status != "CAT_Acted") ? false : true} style={{ marginLeft: '10px', marginTop: '-13px' }}><p style={{ display: 'none' }}>{queData[arrayPos].answer}</p>

                                                                        <RadioGroup
                                                                            style={{ display: 'block', fontFamily: 'Poppins', marginTop: '5px', }}
                                                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                                                            name="controlled-radio-buttons-group"
                                                                            value={queData[arrayPos].answer}
                                                                            onChange={(e) => handleChange(queData[arrayPos].id, e.target.value)}>
                                                                            {queData[arrayPos].options.map((ele) =>
                                                                                <FormControlLabel value={ele.value} control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#e3b912' } }}
                                                                                />} label={<p className='answer-text pt-3'>{ele.label}</p>} />
                                                                            )}
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                    {/* {auditDetails.audit_status == 'Sent to CM' ? <div style={{position:' absolute', right: 0, bottom: 10,}}><button className='agreBtn' onClick={()=>{setIsCMAccrodian(prevState => ({ ...prevState, [queData[arrayPos].id]: false })); console.log("agree is working")}}>Agree</button><button className='agreBtn' onClick={()=>{setIsCMAccrodian(prevState => ({ ...prevState, [queData[arrayPos].id]: true })); console.log("disagree is working")}}>Disagree</button></div> : null} */}
                                                                </div>
                                                                {auditDetails.audit_status != 'Sent to CAT' && rollId != 8 && isCMAccrodian[queData[arrayPos].id] ? <Accordion style={{ backgroundColor: '#fff', width: '100%' }}>
                                                                    <AccordionSummary
                                                                        expandIcon={<FaArrowDown />}
                                                                        aria-controls="panel1a-content"
                                                                        id="panel1a-header"
                                                                    >
                                                                        <Typography>Enter the Reason</Typography>
                                                                    </AccordionSummary>
                                                                    <AccordionDetails style={{ backgroundColor: '#fff', margin: "0px 10px 10px 10px", borderRadius: '5px' }}>

                                                                        <div style={{ display: 'flex' }}>
                                                                            <input type='text' style={{ width: '100%' }} onChange={(e) => setCMObservation(e.target.value)} />
                                                                            <button style={{ backgroundColor: '#e3b912', color: '#fff', borderColor: '#fff', padding: '8px' }} onClick={() => { handleCMObservation(queData[arrayPos]) }} >Submit</button>
                                                                        </div>
                                                                    </AccordionDetails>
                                                                </Accordion> : null}
                                                                {auditDetails.audit_status != 'Sent to CAT' && rollId != 8 && isEditMode[queData[arrayPos].id] ?
                                                                    <div style={{ display: 'flex' }}>
                                                                        <TextField variant="outlined" size="small" name="Observation" label="Comments" fullWidth style={{ marginRight: "20px", backgroundColor: '#fff', color: '#000' }} multiline onChange={async (e) => { await setEditObservation(e.target.value); await setedittexthelp('') }} helperText={edittexthelp} ></TextField>
                                                                        <Button type="submit" size="small" style={{ width: '100px', height: '39px', cursor: 'pointer', zIndex: '100', backgroundColor: '#e3b912', borderColor: '#e3b912' }} onClick={() => { handleEditObservation(queData[arrayPos]) }}>Submit</Button>
                                                                    </div> : null}


                                                            </div>

                                                            : queData[arrayPos].Q_Type == 'multiple' ?

                                                                <FormControl style={{ marginLeft: '10px', marginTop: '7px' }} >
                                                                    <FormGroup
                                                                        style={{ display: 'block' }}
                                                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                                                        name="controlled-radio-buttons-group"
                                                                        disabled={(role == "6" && auditDetails.audit_status == 'Sent to PMO') || (role == "5" && auditDetails.audit_status == 'Sent Back to TL' && toogle == "Low" && queData[arrayPos].escalations_status == "TL_Accept") || (role == "8" && auditDetails.audit_status == 'Sent to CAT' && toogle == "Low") ? false : true}
                                                                    >
                                                                        {queData[arrayPos].options.map((ele) => (
                                                                            <FormControlLabel
                                                                                value={ele.value}
                                                                                checked={
                                                                                    (queData[arrayPos].answer).includes(',')
                                                                                        ? ((queData[arrayPos].answer).split(',')).find((el) => el === ele.value)
                                                                                            ? true
                                                                                            : false
                                                                                        : queData[arrayPos].answer == ele.value
                                                                                            ? true
                                                                                            : false

                                                                                }
                                                                                control={
                                                                                    <Checkbox
                                                                                        sx={{ '&.Mui-checked': { color: '#e3b912' } }}
                                                                                        onChange={(event) => handleChangeCheck(queData[arrayPos].id, event.target.value)}
                                                                                        value={ele.value}
                                                                                        disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true}
                                                                                    />
                                                                                }
                                                                                label={<p className='answer-text pt-3'>{ele.label}</p>}
                                                                            />
                                                                        ))}
                                                                    </FormGroup>
                                                                </FormControl>
                                                                : queData[arrayPos].Q_Type == 'text' || queData[arrayPos].Q_Type == 'textArea' ?
                                                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                                                                        <input className='form-control' type='text' disabled={(role == "6" && auditDetails.audit_status == 'Sent to PMO') || (role == "5" && auditDetails.audit_status == 'Sent Back to TL' && toogle == "Low" && queData[arrayPos].escalations_status == "TL_Accept") || (role == "8" && auditDetails.audit_status == 'Sent to CAT' && toogle == "Low") ? false : true} onChange={(e) => handleChange(queData[arrayPos].id, e.target.value)} value={queData[arrayPos].answer} style={{ marginLeft: '10px', marginTop: '9px', width: 'auto', fontFamily: 'Poppins', fontSize: '12px' }} />
                                                                        {isEditMode[queData[arrayPos].id] ? <p style={{ position: 'absolute', left: '200px', top: '10px' }}>Edited</p> : null}
                                                                    </div>
                                                                    :
                                                                    queData[arrayPos].Q_Type == 'rating' ?
                                                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                                                                            <Rating style={{ marginLeft: '10px', marginTop: '7px' }}
                                                                                name="Rating"
                                                                                readOnly={(role == "6" && auditDetails.audit_status == 'Sent to PMO') || (role == "5" && auditDetails.audit_status == 'Sent Back to TL' && toogle == "Low" && queData[arrayPos].escalations_status == "TL_Accept") || (role == "8" && auditDetails.audit_status == 'Sent to CAT' && toogle == "Low") ? false : true}
                                                                                value={isRating ? isRating : queData[arrayPos].answer}
                                                                                max={queData[arrayPos].Max_Rating}
                                                                                onChange={(event, newValue) => handleChangeRating(queData[arrayPos].id, newValue)}
                                                                            />
                                                                            {isEditMode[queData[arrayPos].id] ? <p style={{ position: 'absolute', left: '170px', top: '10px' }}>Edited</p> : null}
                                                                        </div>
                                                                        : queData[arrayPos].Q_Type == 'quantity' ?
                                                                            <div style={{ display: 'flex', alignItems: 'center', }}>
                                                                                <input className='form-control' type='number' disabled={(role == "6" && auditDetails.audit_status == 'Sent to PMO') || (role == "5" && auditDetails.audit_status == 'Sent Back to TL' && toogle == "Low" && queData[arrayPos].escalations_status == "TL_Accept") || (role == "8" && auditDetails.audit_status == 'Sent to CAT' && toogle == "Low") ? false : true} onChange={(e) => handleChange(queData[arrayPos].id, e.target.value)} value={queData[arrayPos].answer} style={{ marginLeft: '10px', marginTop: '9px', width: 'auto', fontFamily: 'Poppins', fontSize: '12px' }} />
                                                                                {isEditMode[queData[arrayPos].id] ? <p style={{ textAlign: 'right', margin: '15px' }}>Edited</p> : null}
                                                                            </div>
                                                                            : null

                                                        :
                                                        queData[arrayPos].Q_Type == 'single' ?
                                                            <FormControl style={{ marginLeft: '10px', marginTop: '7px' }} >
                                                                <RadioGroup
                                                                    style={{ display: 'block' }}
                                                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                                                    name="controlled-radio-buttons-group"
                                                                >
                                                                    {queData[arrayPos].Opt1 != '' ? <FormControlLabel value={queData[arrayPos].Opt1} control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#e3b912' } }} />} label={<p className='answer-text pt-3'>{queData[arrayPos].Opt1}</p>} /> : null}
                                                                    {queData[arrayPos].Opt2 != '' ? <FormControlLabel value={queData[arrayPos].Opt2} control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#e3b912' } }} />} label={<p className='answer-text pt-3'>{queData[arrayPos].Opt2}</p>} /> : null}
                                                                    {queData[arrayPos].Opt3 != '' ? <FormControlLabel value={queData[arrayPos].Opt3} control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#e3b912' } }} />} label={<p className='answer-text pt-3'>{queData[arrayPos].Opt3}</p>} /> : null}
                                                                    {queData[arrayPos].Opt4 != '' ? <FormControlLabel value={queData[arrayPos].Opt4} control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#e3b912' } }} />} label={<p className='answer-text pt-3'>{queData[arrayPos].Opt4}</p>} /> : null}
                                                                    {queData[arrayPos].Opt5 != '' ? <FormControlLabel value={queData[arrayPos].Opt5} control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#e3b912' } }} />} label={<p className='answer-text pt-3'>{queData[arrayPos].Opt5}</p>} /> : null}
                                                                    {queData[arrayPos].Opt6 != '' ? <FormControlLabel value={queData[arrayPos].Opt6} control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#e3b912' } }} />} label={<p className='answer-text pt-3'>{queData[arrayPos].Opt6}</p>} /> : null}
                                                                </RadioGroup>
                                                            </FormControl>
                                                            : queData[arrayPos].Q_Type == 'multiple' ?
                                                                <FormControl style={{ marginLeft: '10px', marginTop: '-13px' }}>
                                                                    <FormGroup
                                                                        style={{ display: 'block' }}
                                                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                                                        name="controlled-radio-buttons-group"

                                                                    >
                                                                        {queData[arrayPos].Opt1 != '' ? <FormControlLabel value={queData[arrayPos].Opt1} control={<Checkbox size='small' sx={{ '&.Mui-checked': { color: '#e3b912' } }} disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true} />} label={<p className='answer-text pt-3'>{queData[arrayPos].Opt1}</p>} /> : null}
                                                                        {queData[arrayPos].Opt2 != '' ? <FormControlLabel value={queData[arrayPos].Opt2} control={<Checkbox size='small' sx={{ '&.Mui-checked': { color: '#e3b912' } }} disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true} />} label={<p className='answer-text pt-3'>{queData[arrayPos].Opt2}</p>} /> : null}
                                                                        {queData[arrayPos].Opt3 != '' ? <FormControlLabel value={queData[arrayPos].Opt3} control={<Checkbox size='small' sx={{ '&.Mui-checked': { color: '#e3b912' } }} disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true} />} label={<p className='answer-text pt-3'>{queData[arrayPos].Opt3}</p>} /> : null}
                                                                        {queData[arrayPos].Opt4 != '' ? <FormControlLabel value={queData[arrayPos].Opt4} control={<Checkbox size='small' sx={{ '&.Mui-checked': { color: '#e3b912' } }} disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true} />} label={<p className='answer-text pt-3'>{queData[arrayPos].Opt4}</p>} /> : null}
                                                                        {queData[arrayPos].Opt5 != '' ? <FormControlLabel value={queData[arrayPos].Opt5} control={<Checkbox size='small' sx={{ '&.Mui-checked': { color: '#e3b912' } }} disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true} />} label={<p className='answer-text pt-3'>{queData[arrayPos].Opt5}</p>} /> : null}
                                                                        {queData[arrayPos].Opt6 != '' ? <FormControlLabel value={queData[arrayPos].Opt6} control={<Checkbox size='small' sx={{ '&.Mui-checked': { color: '#e3b912' } }} disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true} />} label={<p className='answer-text pt-3'>{queData[arrayPos].Opt6}</p>} /> : null}
                                                                    </FormGroup>
                                                                </FormControl>
                                                                :
                                                                queData[arrayPos].Q_Type == 'rating' ?
                                                                    <div style={{ marginLeft: '10px', marginTop: '7px' }}>
                                                                        <Rating name="Rating" value={queData[arrayPos].answer} max={queData[arrayPos].Max_Rating} /></div>
                                                                    : queData[arrayPos].Q_Type == 'text' || queData[arrayPos].Q_Type == 'textArea' ?
                                                                        <input className='form-control' type='text' disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true} onChange={(e) => handleChange(queData[arrayPos].id, e.target.value)} value={queData[arrayPos].answer} style={{ marginLeft: '10px', marginTop: '9px', width: 'auto', fontFamily: 'Poppins', fontSize: '12px' }} />
                                                                        : queData[arrayPos].Q_Type == 'quantity' ?

                                                                            <input className='form-control' type='text' disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true} onChange={(e) => handleChange(queData[arrayPos].id, e.target.value)} value={queData[arrayPos].answer} style={{ marginLeft: '10px', marginTop: '9px', width: 'auto', fontFamily: 'Poppins', fontSize: '12px' }} />


                                                                            : null

                                                    }
                                                    </p>
                                            <p className='mb-2'>
                                                <b>Observation:</b>
                                                <p>{queData[arrayPos].more_details}</p>
                                            </p>

                                            {auditDetails.audit_status == 'Forwarded to CM' && rollId == 7 ?
                                                queData[arrayPos].FILE_PATH ? <p className='mb-2' style={{ alignItems: 'center' }}>

                                                    {/* <b style={{ position: 'relative', top: '4px' }}>Attachment : </b> */}
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <div style={{ width: '300px', height: '200px', top: '135px', left: '20px' }}>
                                                            <img src={queData[arrayPos].FILE_PATH} onClick={() => handleModel(queData[arrayPos])} style={{ width: '300px', height: '200px', cursor: 'pointer' }} />
                                                            {rollId == "6" ?
                                                                <div style={{ display: 'flex', justifyContent: 'space-around', width: '35%', marginTop: '10px' }}>
                                                                    <div style={{ width: '100px', height: '25px', textAlign: 'center', backgroundColor: '#e3b912', borderRadius: '7px', position: 'absolute', top: '270px', left: '10px' }}>
                                                                        <a href={queData[arrayPos].FILE_PATH} download="download.png" style={{ textDecoration: 'none', marginTop: '10px', color: '#fff', }}>
                                                                            Download &nbsp; <FaDownload style={{ fontSize: '15px', color: '#fff' }} />
                                                                        </a>
                                                                    </div>
                                                                    {/* <h4 style={{position:'absolute',top:'380px'}}>Hello</h4> */}
                                                                    <div style={{ width: '100px', height: '25px', textAlign: 'center', backgroundColor: '#e3b912', borderRadius: '7px', cursor: 'pointer', position: 'absolute', top: '270px', left: '290px' }}
                                                                        onClick={() => {
                                                                            hiddenFileInput.current.click();
                                                                        }}>
                                                                        <span style={{ color: '#fff' }}>Upload</span> &nbsp; &nbsp;
                                                                        <input type="file" accept="image/*" style={{ display: 'none' }} ref={hiddenFileInput} onChange={handleFileSelect} />
                                                                        <FaUpload
                                                                            style={{ fontSize: '15px', color: '#fff', cursor: 'pointer' }}
                                                                        />

                                                                    </div>
                                                                </div> : null}

                                                        </div>
                                                        <div style={{ width: '300px', height: '200px', top: '135px', right: '20px' }}>
                                                            {handleRemediation(queData[arrayPos])}
                                                            {auditDetails.audit_status == 'Forwarded to CM' && rollId == 7 && toogle == "Low" ?
                                                                <div >
                                                                    <div style={{ width: '100px', height: '25px', textAlign: 'center', backgroundColor: '#e3b912', borderRadius: '7px', cursor: 'pointer', position: 'absolute', top: '270px', left: '290px', zIndex: '99' }}
                                                                        onClick={() => {
                                                                            hiddenFileInput.current.click();
                                                                        }}>
                                                                        <span style={{ color: '#fff' }}>Upload</span> &nbsp; &nbsp;
                                                                        <input type='file' accept='image/*' style={{ display: 'none' }} ref={hiddenFileInput} onChange={handleFileRemediation} />
                                                                        <FaUpload
                                                                            style={{ fontSize: '15px', color: '#fff', cursor: 'pointer' }}

                                                                        />
                                                                    </div>
                                                                </div>  
                                                                : null}
                                                        </div>
                                                    </div>
                                                </p> : ''
                                                :
                                                queData[arrayPos].FILE_PATH ? <p className='mb-2' style={{ alignItems: 'center' }}>

                                                    {/* <b style={{ position: 'relative', top: '4px' }}>Attachment : </b> */}
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <div style={{ width: '400px', height: '300px', top: '135px', left: '20px' }}>
                                                            <img src={queData[arrayPos].FILE_PATH} onClick={() => handleModel(queData[arrayPos])} style={{ width: '400px', height: '300px', cursor: 'pointer' }} />
                                                            {rollId == "6" && auditDetails.audit_status == 'Sent to PMO' ?
                                                                <div style={{ display: 'flex', justifyContent: 'space-around', width: '35%', marginTop: '10px' }}>
                                                                    <div style={{ width: '40px', height: '20px', textAlign: 'center', backgroundColor: '#e3b912', borderRadius: '7px', position: 'absolute', bottom: '15px', left: '30px' }}>
                                                                        <a href={queData[arrayPos].FILE_PATH} download="download.png" style={{ textDecoration: 'none', marginTop: '10px', color: '#fff', }}>
                                                                            <FaDownload style={{ fontSize: '15px', color: '#fff' }} />
                                                                        </a>
                                                                    </div>
                                                                    {/* <h4 style={{position:'absolute',top:'380px'}}>Hello</h4> */}
                                                                    <div style={{ width: '40px', height: '20px', textAlign: 'center', backgroundColor: '#e3b912', borderRadius: '7px', cursor: 'pointer', position: 'absolute', bottom: '15px', left: '360px' }}
                                                                        onClick={() => {
                                                                            hiddenFileInput.current.click();
                                                                        }}>
                                                                        <span style={{ color: '#fff' }}></span>
                                                                        <input type="file" accept="image/*" style={{ display: 'none' }} ref={hiddenFileInput} onChange={handleFileSelect} />
                                                                        <FaUpload
                                                                            style={{ fontSize: '15px', color: '#fff', cursor: 'pointer' }}
                                                                        />

                                                                    </div>
                                                                </div> : null}

                                                        </div>
                                                        <div style={{ width: '400px', height: '300px', top: '135px', right: '20px' }}>
                                                            {handleRemediation(queData[arrayPos])}
                                                            {/* {auditDetails.audit_status == 'Forwarded to CM' && rollId == 7 && toogle == "Low" ?
                                                                <div >
                                                                    <div style={{ width: '100px', height: '25px', textAlign: 'center', backgroundColor: '#e3b912', borderRadius: '7px', cursor: 'pointer', position: 'absolute', top: '270px', left: '290px', zIndex: '99' }}
                                                                        onClick={() => {
                                                                            hiddenFileInput.current.click();
                                                                        }}>
                                                                        <span style={{ color: '#fff' }}>Upload</span> &nbsp; &nbsp;
                                                                        <input type='file' accept='image/*' style={{ display: 'none' }} ref={hiddenFileInput} onChange={handleFileRemediation} />
                                                                        <FaUpload
                                                                            style={{ fontSize: '15px', color: '#fff', cursor: 'pointer' }}

                                                                        />
                                                                    </div>
                                                                </div>  
                                                                : null} */}
                                                        </div>
                                                    </div>
                                                </p> : ''}




                                            {toogle == "Low" ?
                                                queObservations && queObservations.length > 0 ?

                                                    <div style={{ borderRadius: '5px', borderColor: 'lightgrey' }}>
                                                        {auditDetails.audit_status == 'Sent to TL' && rollId == 5 ? <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <TextField size="small" name="Observation" placeholder={`Comment as ${username}`} fullWidth style={{ marginRight: "20px", backgroundColor: '#fff', borderRadius: '5px' }} multiline onChange={(e) => setObservation(e.target.value)}></TextField>
                                                            {/* <Button type="submit" size="small" style={{ backgroundColor: '#e3b912', borderColor: '#e3b912' }} onClick={() => handleSend(queData[arrayPos])} >Send</Button> */}
                                                            <div style={{ backgroundColor: '#e3b912', borderColor: '#e3b912', borderRadius: '50%', width: '40px', height: '40px' }}
                                                                onClick={() => handleSend(queData[arrayPos])}
                                                            >
                                                                <FaPaperPlane style={{ color: '#fff', fontSize: '20px', marginTop: '10px', marginLeft: '5px' }} />
                                                            </div>
                                                        </div>
                                                            : auditDetails.audit_status == 'Sent to CM' && rollId == 7 && (queData[arrayPos].escalations_status != "CM_Reject" && queData[arrayPos].escalations_status != "CM_Accept" && (queData[arrayPos].escalations_status == "" || queData[arrayPos].escalations_status == null)) ?
                                                            <div>
                                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                    <TextField variant="outlined" name="Observation" placeholder={`Comment as ${username}`} size="small" fullWidth style={{ marginRight: "15px", backgroundColor: '#fff', borderRadius: '5px' }} multiline onChange={async (e) => { await setObservation(e.target.value); setObserHelpertext('') }} helperText={obserHelpertext} ></TextField>
                                                                    <Button type="submit" size="small" style={{ width: '100px', height: '38px', backgroundColor: '#e3b912', borderColor: '#e3b912', marginRight: "15px" }} onClick={() => handleSend(queData[arrayPos], "CM_Accept")} >Accept</Button>
                                                                    <Button type="submit" size="small" style={{ width: '100px', height: '38px', backgroundColor: '#e3b912', borderColor: '#e3b912' }} onClick={() => handleSend(queData[arrayPos], "CM_Reject")} >Reject</Button>
                                                                </div>
                                                            </div>
                                                                :
                                                                auditDetails.audit_status == 'Sent Back to TL' && rollId == 5 ?
                                                                    queData[arrayPos].escalations_status === "TL_Reject" || queData[arrayPos].escalations_status === "TL_Accept" || queData[arrayPos].escalations_status == "CM_Accept" ?
                                                                        null
                                                                        : <div>
                                                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                                <TextField variant="outlined" name="Observation" placeholder={`Comment as ${username}`} size="small" fullWidth style={{ marginRight: "15px", backgroundColor: '#fff', borderRadius: '5px' }} multiline onChange={async (e) => { await setObservation(e.target.value); setObserHelpertext('') }} helperText={obserHelpertext} ></TextField>
                                                                                <Button type="submit" size="small" style={{ width: '100px', height: '38px', backgroundColor: '#e3b912', borderColor: '#e3b912', marginRight: "15px" }} onClick={() => handleSend(queData[arrayPos], "TL_Accept")} >Accept</Button>
                                                                                <Button type="submit" size="small" style={{ width: '100px', height: '38px', backgroundColor: '#e3b912', borderColor: '#e3b912' }} onClick={() => handleSend(queData[arrayPos], "TL_Reject")} >Esclate</Button>
                                                                            </div>
                                                                        </div>
                                                                    // : auditDetails.audit_status == 'Forwarded to CM' && rollId == 7 ?
                                                                    //     <div style={{ width: '100%', height: '100px', border: '1px solid black' }}>
                                                                    //         <div style={{ padding: '10px 15px', display: 'flex', justifyContent: 'space-between' }}>
                                                                    //             <h5>Cinema Manager Remarks</h5>
                                                                    //             <label className='radio' style={{ marginRight: '30px' }} ><input type="radio" />&nbsp;&nbsp;Open </label>
                                                                    //             <label className='radio' style={{ marginRight: '30px' }}><input type="radio" />&nbsp;&nbsp;onHold </label>
                                                                    //             <label className='radio' style={{ marginRight: '30px' }}><input type="radio" />&nbsp;&nbsp;Closed </label>
                                                                    //         </div>
                                                                    //         <div style={{ padding: '5px 15px', display: 'flex', justifyContent: 'space-between' }}>
                                                                    //             <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                                    //                 <label>
                                                                    //                     Comment &nbsp;<input type="text" />
                                                                    //                 </label>
                                                                    //                 <button style={{ marginLeft: '30px' }}>Uplaod</button>
                                                                    //             </div>
                                                                    //             <button>Submit</button>
                                                                    //         </div>

                                                                    //     </div>
                                                                        :auditDetails.audit_status == 'Sent to CAT' && rollId == 8 && (queData[arrayPos].escalations_status === "TL_Reject" || queData[arrayPos].escalations_status === "TL_Accept" || queData[arrayPos].escalations_status == "CM_Accept") && queData[arrayPos].escalations_status != "CAT_Acted" ? <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                        <TextField size="small" name="Observation" placeholder={`Comment as ${username}`} fullWidth style={{ marginRight: "20px", backgroundColor: '#fff', borderRadius: '5px' }} multiline onChange={(e) => {setObservation(e.target.value); setObserHelpertext('');}} helperText={obserHelpertext}></TextField>
                                                                        {/* <Button type="submit" size="small" style={{ backgroundColor: '#e3b912', borderColor: '#e3b912' }} onClick={() => handleSend(queData[arrayPos])} >Send</Button> */}
                                                                        <div style={{ backgroundColor: '#e3b912', borderColor: '#e3b912', borderRadius: '50%', width: '40px', height: '40px' }}
                                                                            onClick={() => handleSend(queData[arrayPos], 'CAT_Acted')}
                                                                        >
                                                                            <FaPaperPlane style={{ color: '#fff', cursor: 'pointer', fontSize: '20px', marginTop: '10px', marginLeft: '5px', zIndex: '111' }} />
                                                                        </div>
                                                                    </div> : null}
                                                    </div>

                                                    : null
                                                : null
                                            }

                                            <div
                                                style={{ width: '40px', height: '40px', zIndex: '11', position: 'fixed', marginLeft: '70%', bottom: '50px', backgroundColor: 'lightgray', borderRadius: '50%', boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)', cursor: 'pointer' }}
                                                onClick={() => handleObservation()}
                                            >
                                                <div>
                                                    <FaComments style={{ color: '#e3b912', fontSize: '20px', marginTop: '10px', marginLeft: '10px' }} onClick={() => { handleObservation(queData[arrayPos]) }} />
                                                </div>
                                            </div>

                                            {/* <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '40px', marginRight: '40px' }}>
                                                <button style={{ backgroundColor: '#e3b912', color: '#fff', border: 'none', borderRadius: '10px', width: '80px', marginTop: '20px' }} onClick={handlePrev}>Previous</button>
                                                <button style={{ backgroundColor: '#e3b912', color: '#fff', border: 'none', borderRadius: '10px', width: '80px', marginTop: '20px' }} onClick={handleNext} >Next</button>
                                            </div> */}
                                        </div>
                                        :
                                        <div>
                                            {rollId != '7' ?
                                                <div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                                        {arrayPos != 0 ? <button style={{ backgroundColor: '#e3b912', color: '#fff', border: 'none', borderRadius: '10px', width: '80px' }} onClick={handlePrev}><FaAngleDoubleLeft style={{ color: '#fff' }} /></button> : null}
                                                        {arrayPos != queData.length - 1 ? <button style={{ backgroundColor: '#e3b912', color: '#fff', border: 'none', borderRadius: '10px', width: '80px' }} onClick={handleNext} ><FaAngleDoubleRight style={{ color: '#fff' }} /></button> : null}
                                                    </div>
                                                    <span className='badge' style={{ color: 'white', background: criticality_obj[queData[arrayPos].criticality], fontSize: 'x-small', float: 'right' }}>{queData[arrayPos].criticality}</span>
                                                    <p className='mb-2'> <b>Question No. {arrayPos + 1} :</b><br /> {queData[arrayPos].question} {queData[arrayPos].imagePath ? <img src={queData[arrayPos].imagePath} onClick={() => handleModel(queData[arrayPos].imagePath)} style={{ width: '40px', height: '30px', cursor: 'pointer' }} /> : ''}</p>
                                                    <p className='mb-2' style={{ display: 'flex', }}> <b style={{ position: 'relative', top: '4px' }}>Answer :</b>{queData[arrayPos].answer ?
                                                        queData[arrayPos].Q_Type == 'single' ?
                                                            <div style={{ width: '90%' }}>
                                                                <div style={{ position: 'relative' }}>
                                                                    <FormControl disabled={(role == "6" && auditDetails.audit_status == 'Sent to PMO') || (role == "5" && auditDetails.audit_status == 'Sent Back to TL' && toogle == "Low" && queData[arrayPos].escalations_status == "TL_Accept") || (role == "8" && auditDetails.audit_status == 'Sent to CAT' && toogle == "Low") ? false : true} style={{ marginLeft: '10px', marginTop: '-13px' }}><p style={{ display: 'none' }}>{queData[arrayPos].answer}</p>

                                                                        <RadioGroup
                                                                            style={{ display: 'block', fontFamily: 'Poppins', marginTop: '5px', }}
                                                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                                                            name="controlled-radio-buttons-group"
                                                                            value={queData[arrayPos].answer}
                                                                            onChange={(e) => handleChange(queData[arrayPos].id, e.target.value)}>
                                                                            {queData[arrayPos].options.map((ele) =>
                                                                                <FormControlLabel value={ele.value} control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#e3b912' } }}
                                                                                />} label={<p className='answer-text pt-3'>{ele.label}</p>} />
                                                                            )}
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                    {/* {auditDetails.audit_status == 'Sent to CM' ? <div style={{position:' absolute', right: 0, bottom: 10,}}><button className='agreBtn' onClick={()=>{setIsCMAccrodian(prevState => ({ ...prevState, [queData[arrayPos].id]: false })); console.log("agree is working")}}>Agree</button><button className='agreBtn' onClick={()=>{setIsCMAccrodian(prevState => ({ ...prevState, [queData[arrayPos].id]: true })); console.log("disagree is working")}}>Disagree</button></div> : null} */}
                                                                </div>
                                                                {isCMAccrodian[queData[arrayPos].id] ? <Accordion style={{ backgroundColor: '#fff', width: '100%' }}>
                                                                    <AccordionSummary
                                                                        expandIcon={<FaArrowDown />}
                                                                        aria-controls="panel1a-content"
                                                                        id="panel1a-header"
                                                                    >
                                                                        <Typography>Enter the Reason</Typography>
                                                                    </AccordionSummary>
                                                                    <AccordionDetails style={{ backgroundColor: '#fff', margin: "0px 10px 10px 10px", borderRadius: '5px' }}>

                                                                        <div style={{ display: 'flex' }}>
                                                                            <input type='text' style={{ width: '100%' }} onChange={(e) => setCMObservation(e.target.value)} />
                                                                            <button style={{ backgroundColor: '#e3b912', color: '#fff', borderColor: '#fff', padding: '8px' }} onClick={() => { handleCMObservation(queData[arrayPos]) }} >Submit</button>
                                                                        </div>
                                                                    </AccordionDetails>
                                                                </Accordion> : null}
                                                                {isEditMode[queData[arrayPos].id] ?
                                                                    <div style={{ display: 'flex' }}>
                                                                        <TextField variant="outlined" size="small" name="Observation" label="Comments" fullWidth style={{ marginRight: "20px", backgroundColor: '#fff', color: '#000' }} multiline onChange={async (e) => { await setEditObservation(e.target.value); await setedittexthelp('') }} helperText={edittexthelp} ></TextField>
                                                                        <Button type="submit" size="small" style={{ width: '100px', height: '39px', cursor: 'pointer', zIndex: '100', backgroundColor: '#000', borderColor: '#e3b912' }} onClick={() => { handleEditObservation(queData[arrayPos]) }}>Submit</Button>
                                                                    </div> : null}


                                                            </div>

                                                            : queData[arrayPos].Q_Type == 'multiple' ?

                                                                <FormControl style={{ marginLeft: '10px', marginTop: '7px' }} >
                                                                    <FormGroup
                                                                        style={{ display: 'block' }}
                                                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                                                        name="controlled-radio-buttons-group"
                                                                        disabled={(role == "6" && auditDetails.audit_status == 'Sent to PMO') || (role == "5" && auditDetails.audit_status == 'Sent Back to TL' && toogle == "Low" && queData[arrayPos].escalations_status == "TL_Accept") || (role == "8" && auditDetails.audit_status == 'Sent to CAT' && toogle == "Low") ? false : true}
                                                                    >
                                                                        {queData[arrayPos].options.map((ele) => (
                                                                            <FormControlLabel
                                                                                value={ele.value}
                                                                                checked={
                                                                                    (queData[arrayPos].answer).includes(',')
                                                                                        ? ((queData[arrayPos].answer).split(',')).find((el) => el === ele.value)
                                                                                            ? true
                                                                                            : false
                                                                                        : queData[arrayPos].answer == ele.value
                                                                                            ? true
                                                                                            : false

                                                                                }
                                                                                control={
                                                                                    <Checkbox
                                                                                        sx={{ '&.Mui-checked': { color: '#e3b912' } }}
                                                                                        onChange={(event) => handleChangeCheck(queData[arrayPos].id, event.target.value)}
                                                                                        value={ele.value}
                                                                                        disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true}
                                                                                    />
                                                                                }
                                                                                label={<p className='answer-text pt-3'>{ele.label}</p>}
                                                                            />
                                                                        ))}
                                                                    </FormGroup>
                                                                </FormControl>
                                                                : queData[arrayPos].Q_Type == 'text' || queData[arrayPos].Q_Type == 'textArea' ?
                                                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                                                                        <input className='form-control' type='text' disabled={(role == "6" && auditDetails.audit_status == 'Sent to PMO') || (role == "5" && auditDetails.audit_status == 'Sent Back to TL' && toogle == "Low" && queData[arrayPos].escalations_status == "TL_Accept") || (role == "8" && auditDetails.audit_status == 'Sent to CAT' && toogle == "Low") ? false : true} onChange={(e) => handleChange(queData[arrayPos].id, e.target.value)} value={queData[arrayPos].answer} style={{ marginLeft: '10px', marginTop: '9px', width: 'auto', fontFamily: 'Poppins', fontSize: '12px' }} />
                                                                        {isEditMode[queData[arrayPos].id] ? <p style={{ position: 'absolute', left: '200px', top: '10px' }}>Edited</p> : null}
                                                                    </div>
                                                                    :
                                                                    queData[arrayPos].Q_Type == 'rating' ?
                                                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                                                                            <Rating style={{ marginLeft: '10px', marginTop: '7px' }}
                                                                                name="Rating"
                                                                                readOnly={(role == "6" && auditDetails.audit_status == 'Sent to PMO') || (role == "5" && auditDetails.audit_status == 'Sent Back to TL' && toogle == "Low" && queData[arrayPos].escalations_status == "TL_Accept") || (role == "8" && auditDetails.audit_status == 'Sent to CAT' && toogle == "Low") ? false : true}
                                                                                value={isRating ? isRating : queData[arrayPos].answer}
                                                                                max={queData[arrayPos].Max_Rating}
                                                                                onChange={(event, newValue) => handleChangeRating(queData[arrayPos].id, newValue)}
                                                                            />
                                                                            {isEditMode[queData[arrayPos].id] ? <p style={{ position: 'absolute', left: '170px', top: '10px' }}>Edited</p> : null}
                                                                        </div>
                                                                        : queData[arrayPos].Q_Type == 'quantity' ?
                                                                            <div style={{ display: 'flex', alignItems: 'center', }}>
                                                                                <input className='form-control' type='number' disabled={(role == "6" && auditDetails.audit_status == 'Sent to PMO') || (role == "5" && auditDetails.audit_status == 'Sent Back to TL' && toogle == "Low" && queData[arrayPos].escalations_status == "TL_Accept") || (role == "8" && auditDetails.audit_status == 'Sent to CAT' && toogle == "Low") ? false : true} onChange={(e) => handleChange(queData[arrayPos].id, e.target.value)} value={queData[arrayPos].answer} style={{ marginLeft: '10px', marginTop: '9px', width: 'auto', fontFamily: 'Poppins', fontSize: '12px' }} />
                                                                                {isEditMode[queData[arrayPos].id] ? <p style={{ textAlign: 'right', margin: '15px' }}>Edited</p> : null}
                                                                            </div>
                                                                            : null

                                                        :
                                                        queData[arrayPos].Q_Type == 'single' ?
                                                            <FormControl style={{ marginLeft: '10px', marginTop: '7px' }} >
                                                                <RadioGroup
                                                                    style={{ display: 'block' }}
                                                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                                                    name="controlled-radio-buttons-group"
                                                                >
                                                                    {queData[arrayPos].Opt1 != '' ? <FormControlLabel value={queData[arrayPos].Opt1} control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#e3b912' } }} />} label={<p className='answer-text pt-3'>{queData[arrayPos].Opt1}</p>} /> : null}
                                                                    {queData[arrayPos].Opt2 != '' ? <FormControlLabel value={queData[arrayPos].Opt2} control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#e3b912' } }} />} label={<p className='answer-text pt-3'>{queData[arrayPos].Opt2}</p>} /> : null}
                                                                    {queData[arrayPos].Opt3 != '' ? <FormControlLabel value={queData[arrayPos].Opt3} control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#e3b912' } }} />} label={<p className='answer-text pt-3'>{queData[arrayPos].Opt3}</p>} /> : null}
                                                                    {queData[arrayPos].Opt4 != '' ? <FormControlLabel value={queData[arrayPos].Opt4} control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#e3b912' } }} />} label={<p className='answer-text pt-3'>{queData[arrayPos].Opt4}</p>} /> : null}
                                                                    {queData[arrayPos].Opt5 != '' ? <FormControlLabel value={queData[arrayPos].Opt5} control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#e3b912' } }} />} label={<p className='answer-text pt-3'>{queData[arrayPos].Opt5}</p>} /> : null}
                                                                    {queData[arrayPos].Opt6 != '' ? <FormControlLabel value={queData[arrayPos].Opt6} control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#e3b912' } }} />} label={<p className='answer-text pt-3'>{queData[arrayPos].Opt6}</p>} /> : null}
                                                                </RadioGroup>
                                                            </FormControl>
                                                            : queData[arrayPos].Q_Type == 'multiple' ?
                                                                <FormControl style={{ marginLeft: '10px', marginTop: '-13px' }}>
                                                                    <FormGroup
                                                                        style={{ display: 'block' }}
                                                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                                                        name="controlled-radio-buttons-group"

                                                                    >
                                                                        {queData[arrayPos].Opt1 != '' ? <FormControlLabel value={queData[arrayPos].Opt1} control={<Checkbox size='small' sx={{ '&.Mui-checked': { color: '#e3b912' } }} disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true} />} label={<p className='answer-text pt-3'>{queData[arrayPos].Opt1}</p>} /> : null}
                                                                        {queData[arrayPos].Opt2 != '' ? <FormControlLabel value={queData[arrayPos].Opt2} control={<Checkbox size='small' sx={{ '&.Mui-checked': { color: '#e3b912' } }} disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true} />} label={<p className='answer-text pt-3'>{queData[arrayPos].Opt2}</p>} /> : null}
                                                                        {queData[arrayPos].Opt3 != '' ? <FormControlLabel value={queData[arrayPos].Opt3} control={<Checkbox size='small' sx={{ '&.Mui-checked': { color: '#e3b912' } }} disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true} />} label={<p className='answer-text pt-3'>{queData[arrayPos].Opt3}</p>} /> : null}
                                                                        {queData[arrayPos].Opt4 != '' ? <FormControlLabel value={queData[arrayPos].Opt4} control={<Checkbox size='small' sx={{ '&.Mui-checked': { color: '#e3b912' } }} disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true} />} label={<p className='answer-text pt-3'>{queData[arrayPos].Opt4}</p>} /> : null}
                                                                        {queData[arrayPos].Opt5 != '' ? <FormControlLabel value={queData[arrayPos].Opt5} control={<Checkbox size='small' sx={{ '&.Mui-checked': { color: '#e3b912' } }} disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true} />} label={<p className='answer-text pt-3'>{queData[arrayPos].Opt5}</p>} /> : null}
                                                                        {queData[arrayPos].Opt6 != '' ? <FormControlLabel value={queData[arrayPos].Opt6} control={<Checkbox size='small' sx={{ '&.Mui-checked': { color: '#e3b912' } }} disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true} />} label={<p className='answer-text pt-3'>{queData[arrayPos].Opt6}</p>} /> : null}
                                                                    </FormGroup>
                                                                </FormControl>
                                                                :
                                                                queData[arrayPos].Q_Type == 'rating' ?
                                                                    <div style={{ marginLeft: '10px', marginTop: '7px' }}>
                                                                        <Rating name="Rating" value={queData[arrayPos].answer} max={queData[arrayPos].Max_Rating} /></div>
                                                                    : queData[arrayPos].Q_Type == 'text' || queData[arrayPos].Q_Type == 'textArea' ?
                                                                        <input className='form-control' type='text' disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true} onChange={(e) => handleChange(queData[arrayPos].id, e.target.value)} value={queData[arrayPos].answer} style={{ marginLeft: '10px', marginTop: '9px', width: 'auto', fontFamily: 'Poppins', fontSize: '12px' }} />
                                                                        : queData[arrayPos].Q_Type == 'quantity' ?

                                                                            <input className='form-control' type='text' disabled={role == "6" && auditDetails.audit_status == 'Sent to PMO' ? false : true} onChange={(e) => handleChange(queData[arrayPos].id, e.target.value)} value={queData[arrayPos].answer} style={{ marginLeft: '10px', marginTop: '9px', width: 'auto', fontFamily: 'Poppins', fontSize: '12px' }} />


                                                                            : null

                                                    }
                                                    </p>

                                                    {queData[arrayPos].FILE_PATH ? <p className='mb-2' style={{ alignItems: 'center' }}>

                                                        {/* <b style={{ position: 'relative', top: '4px' }}>Attachment : </b> */}
                                                        <div style={{ position: 'relative' }}>
                                                            <img src={queData[arrayPos].FILE_PATH} onClick={() => handleModel(queData[arrayPos])} style={{ width: '400px', height: '300px', cursor: 'pointer' }} />
                                                            {rollId == "6" && auditDetails.audit_status == 'Sent to PMO' ?
                                                                <div style={{ display: 'flex', justifyContent: 'space-around', width: '35%', marginTop: '10px' }}>
                                                                    <div style={{ width: '40px', height: '20px', textAlign: 'center', backgroundColor: '#e3b912', borderRadius: '7px', position: 'absolute', top: '270px', left: '10px' }}>
                                                                        <a href={queData[arrayPos].FILE_PATH} download="download.png" style={{ textDecoration: 'none', marginTop: '10px', color: '#fff', }}><FaDownload style={{ fontSize: '15px', color: '#fff' }} />
                                                                        </a>
                                                                    </div>
                                                                    {/* <h4 style={{position:'absolute',top:'380px'}}>Hello</h4> */}
                                                                    <div style={{ width: '40px', height: '20px', textAlign: 'center', backgroundColor: '#e3b912', borderRadius: '7px', cursor: 'pointer', position: 'absolute', top: '270px', left: '350px' }}
                                                                        onClick={() => {
                                                                            hiddenFileInput.current.click();
                                                                        }}>
                                                                        <span style={{ color: '#fff' }}></span>
                                                                        <input type="file" accept="image/*" style={{ display: 'none' }} ref={hiddenFileInput} onChange={handleFileSelect} />
                                                                        <FaUpload
                                                                            style={{ fontSize: '15px', color: '#fff', cursor: 'pointer' }}
                                                                        />

                                                                    </div>
                                                                </div> : null}

                                                        </div>

                                                        <div style={{ width: '400px', height: '300px', position: 'absolute', top: '135px', right: '20px' }}>
                                                            {handleRemediation(queData[arrayPos])}
                                                        </div>

                                                    </p> : ''}

                                                    {toogle == "All" ?
                                                        queObservations && queObservations.length > 0 ?

                                                            <div style={{ borderRadius: '5px', borderColor: 'lightgrey' }}>
                                                                <Observaition />
                                                            </div>

                                                            : null
                                                        : null
                                                    }

                                                    {/* <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '40px', marginRight: '40px' }}>
                                                <button style={{ backgroundColor: '#e3b912', color: '#fff', border: 'none', borderRadius: '10px', width: '80px', marginTop: '20px' }} onClick={handlePrev}>Previous</button>
                                                <button style={{ backgroundColor: '#e3b912', color: '#fff', border: 'none', borderRadius: '10px', width: '80px', marginTop: '20px' }} onClick={handleNext} >Next</button>
                                            </div> */}
                                                </div>
                                                : null}</div>



                                : <div style={{ padding: '10px 20px', marginBottom: '10px', fontSize: '13px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>No Data</div>
                            }

                        </div>
                    </div>
                </div>

                : null}
            <Modal isOpen={isModalOpen} onRequestClose={() => { setIsModalOpen(false); setImage(); setquesId(); }} style={customStyles}>
                <img src={image} style={{ width: '100%', height: '100%' }} />
            </Modal>
            <Modal isOpen={chatModel} onRequestClose={() => { setChatModel(false); }} style={customStyles2}>
                <Card style={{ height: '517px' }}>
                    <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h4>Observations</h4>
                        <FaTimes onClick={() => setChatModel(false)} style={{ float: 'right', cursor: 'pointer', marginLeft: 'auto', marginTop: '10px' }} />
                    </Card.Header>
                    <Card.Body style={{ width: "100%", height: '480', overflowY: 'auto', padding: '0px' }}>
                        {chatModelData.map((item, index) =>
                            <div key={index} style={{ padding: "6px 16px", borderRadius: "5px", backgroundColor: "#fff", marginBottom: '5PX' }}>
                                <div style={{ fontFamily: 'poppins', fontSize: '14px', fontWeight: 'bold', color: '#000', display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex' }}><p style={{ color: 'grey' }}>{item.username} </p> &nbsp; <p style={{ color: 'grey' }}>({item.rolename})</p></div>
                                    <div style={{ fontFamily: 'poppins', fontSize: '13px', color: '#898686' }}>{formatDate(new Date(item.created))}</div>
                                </div>
                                <div style={{ fontFamily: 'poppins', fontSize: '13px', color: '#000' }}>{item.comments}</div>
                            </div>)}
                    </Card.Body>
                </Card>
            </Modal>
        </div >
    )
}
export default DeptQuestion