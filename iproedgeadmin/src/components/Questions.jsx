import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import { FaFilter, FaTimes, FaPaperclip, FaEye, FaTrashAlt, FaEdit } from "react-icons/fa";
import axios from 'axios'
import Swal from 'sweetalert2';
import { Button, FileInput, Form, Table } from "react-bootstrap";
import { BsPencil, BsTrash } from 'react-icons/bs';
import {
  FormControl,
  FormControlLabel,
  Paper,
  RadioGroup,
  InputLabel,
  FormLabel,
  MenuItem,
  Select,
  Radio,
  TextField,
  FormHelperText
} from "@mui/material";
import ENV from '../ENV';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const customStyles = {
  content: {
    top: '5%',
    left: '20%',
    right: '20%',
    bottom: '15%',
  },
  overlay: {
    backgroundColor: 'rgb(34 41 47 / 95%)',
    zIndex: '11',
    opacity: '1',
    backdropFilter: 'blur(10px)'
  }
};


const Question = () => {
  const [openBackDrop, setOpenBackDrop] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [departments, setDepartments] = useState([]);
  const [questionArr, setQuestionArr] = useState([]);
  const [departmentsVal, setDepartmentsVal] = useState([]);
  const [mandatory, setMandatory] = useState();
  const [attachment, setAttachment] = useState();
  const [criticality, setCriticality] = useState();
  const [auditVal, setAuditVal] = useState();
  const [score, setScore] = useState(0);
  const [maxRating, setMaxRating] = useState();
  const [question, setQuestion] = useState();
  const [questionHint, setQuestionHint] = useState();
  const [questionType, setQuestionType] = useState();
  const [displayOrder, setDisplayOrder] = useState();
  const [option1, setOption1] = useState();
  const [option2, setOption2] = useState();
  const [option3, setOption3] = useState();
  const [option4, setOption4] = useState();
  const [option5, setOption5] = useState();
  const [option6, setOption6] = useState();
  const [error, setError] = useState();
  const [refresh, setRefresh] = useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [deptval, setDeptVal] = useState();
  const [updateQues, setUpdateQues] = useState({})
  const [file, setFile]= useState(null)

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
      final()
  }, [refresh, deptval]);

  const final = async()=>{
    await axios
    .post(`${ENV.API_END_POINT}Question/Get_questions`,{deptId: deptval})
    .then((res) => {
      setQuestionArr(res.data)
      setOpenBackDrop()
    })
    .catch((error) => { });
    await axios
      .get(`${ENV.API_END_POINT}departments/Get_departments`)
      .then((res) => {
        setDepartments(res.data)
      })
      .catch((error) => { });
  }

  const handleSubmit = async () => {
    if(file){
      const formData = new FormData();
      formData.append('excelFile', file);

      await axios.post(
          'http://localhost:8698/Question/Bulk_Question_Create',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } },
        )
        setRefresh(true)
          window.location.reload()
    }else{

      
          let err = {}
      
          err.ques = question != "" && question != null ? "": "Mandatory Field"
          err.hint = questionHint != "" && questionHint != null ? "": "Mandatory Field"
          err.type = questionType != "" && questionType != null? "": "Mandatory Field"
          err.criticality = criticality != "" && criticality != null? "": "Mandatory Field"
          err.mandatory = mandatory != "" && mandatory != null ? "": "Mandatory Field"
          err.departments = departmentsVal != "" && departmentsVal != null? "": "Mandatory Field"
          err.audittype = auditVal != "" && auditVal != null != ""? "": "Mandatory Field"
          err.score = score != "" && score != null ? "": "Mandatory Field"
          err.attachment = attachment != "" && attachment != null? "": "Mandatory Field"
            if((questionType != "" && questionType != null) && (questionType ==questionType == 'single' || questionType == 'multiple')){
              err.option1 = option1 != "" && option1 != null ? "": "Mandatory*"      
              err.option2 = option2 != "" && option2 != null ? "": "Mandatory*"
              err.option3 = option3 != "" && option3 != null ? "": "Mandatory*"
              err.option4 = option4 != "" && option4 != null ? "": "Mandatory*"
              err.option5 = option5 != "" && option5 != null ? "": "Mandatory*"
              err.option6 = option6 != "" && option6 != null ? "": "Mandatory*"  
            }
            if((questionType != "" && questionType != null) && (questionType == 'rating')){
               err.maxrating = maxRating != "" && maxRating != null ? "": "Mandatory*"  
            }
      
      
          setError(err)
      
          if (Object.keys(err).length) {
            const isEmpty = Object.values(err).every((x) => x === "");
            console.log(isEmpty, "rcc");
            if (isEmpty === true) {
              const formData = new FormData();
      
              console.log(selectedFile, "sdkjbsdkj")
      
              formData.append("image", selectedFile);
          
              postdata.question = question
              postdata.question_hint = questionHint
              postdata.Q_Type = questionType
              postdata.is_mandatory = mandatory
              postdata.criticality = criticality
              postdata.department_id = departmentsVal.join(',')
              postdata.audit_type = auditVal
              postdata.score = score
              postdata.Is_Attachment_Req = attachment
              if (questionType == 'rating') {
                postdata.Max_Rating = maxRating;
              }
              if (questionType == 'single' || questionType == 'multiple') {
                postdata.Opt1 = option1
                postdata.Opt2 = option2
                postdata.Opt3 = option3
                postdata.Opt4 = option4
                postdata.Opt5 = option5
                postdata.Opt6 = option6
              }
          
              postdata.location_id = 1
              postdata.status = "ACTIVE"
          
              Object.entries(postdata).forEach(([key, value]) => {
                formData.append(`postData[${key}]`, value);
              });
          
              await axios
                .post(`${ENV.API_END_POINT}Question/Create_Question`, formData, { headers: { "Content-Type": "multipart/form-data" } })
                .then( (res) => {
                  setRefresh(true)
                  final()
                  Toast.fire({ icon: 'success', title: `Question Added Successfully` })
                  setIsModalOpen(false)
                })
                .catch((error) => { });
            }
            
          }
    }
    
  }

  const handleEdit = async () => {

    let err = {}

    err.editques = updateQues.question != "" && updateQues.question != null ? "": "Mandatory Field"
    err.edithint = updateQues.question_hint != "" && updateQues.question_hint != null ? "": "Mandatory Field"
    err.edittype = updateQues.Q_Type != "" && updateQues.Q_Type != null? "": "Mandatory Field"
    err.editcriticality = updateQues.criticality != "" && updateQues.criticality != null? "": "Mandatory Field"
    err.editmandatory = updateQues.is_mandatory != "" && updateQues.is_mandatory != null ? "": "Mandatory Field"
    err.editdepartments = updateQues.department_id != "" && updateQues.department_id != null? "": "Mandatory Field"
    err.editaudittype = updateQues.audit_type != "" && updateQues.audit_type != null != ""? "": "Mandatory Field"
    err.editscore = updateQues.score != "" && updateQues.score != null ? "": "Mandatory Field"
    err.editattachment = updateQues.Is_Attachment_Req != "" && updateQues.Is_Attachment_Req != null? "": "Mandatory Field"
      if((updateQues.Q_Type != "" && updateQues.Q_Type != null) && (updateQues.Q_Type ==updateQues.Q_Type == 'single' || updateQues.Q_Type == 'multiple')){
        err.editoption1 = option1 != "" && option1 != null ? "": "Mandatory*"      
        err.editoption2 = option2 != "" && option2 != null ? "": "Mandatory*"
        err.editoption3 = option3 != "" && option3 != null ? "": "Mandatory*"
        err.editoption4 = option4 != "" && option4 != null ? "": "Mandatory*"
        err.editoption5 = option5 != "" && option5 != null ? "": "Mandatory*"
        err.editoption6 = option6 != "" && option6 != null ? "": "Mandatory*"  
      }
      if((updateQues.Q_Type != "" && updateQues.Q_Type != null) && (updateQues.Q_Type == 'rating')){
         err.editmaxrating = maxRating != "" && maxRating != null ? "": "Mandatory*"  
      }


    setError(err)

    if (Object.keys(err).length) {
      const isEmpty = Object.values(err).every((x) => x === "");
      console.log(isEmpty, "rcc");
      if (isEmpty === true) {
        const formData = new FormData();

        formData.append("image", selectedFile);
    
        postdata.id = updateQues.id
        postdata.question = updateQues.question
        postdata.question_hint = updateQues.question_hint
        postdata.Q_Type = updateQues.Q_Type
        postdata.is_mandatory = updateQues.is_mandatory
        postdata.criticality = updateQues.criticality
        postdata.department_id = updateQues.department_id.join(',')
        postdata.audit_type = updateQues.audit_type
        postdata.score = updateQues.score
        postdata.Is_Attachment_Req = updateQues.Is_Attachment_Req
        if (updateQues.Q_Type == 'rating') {
          postdata.Max_Rating = updateQues.Max_Rating;
        }
        if (updateQues.Q_Type == 'single' || updateQues.Q_Type == 'multiple') {
          postdata.Opt1 = updateQues.Opt1
          postdata.Opt2 = updateQues.Opt2
          postdata.Opt3 = updateQues.Opt3
          postdata.Opt4 = updateQues.Opt4
          postdata.Opt5 = updateQues.Opt5
          postdata.Opt6 = updateQues.Opt6
        }
    
        postdata.location_id = 1
        postdata.status = "ACTIVE"
    
        Object.entries(postdata).forEach(([key, value]) => {
          formData.append(`postData[${key}]`, value);
        });
    
        await axios
          .post(`${ENV.API_END_POINT}Question/Upadate_Question`, formData, { headers: { "Content-Type": "multipart/form-data" } })
          .then( (res) => {
            final()
            Toast.fire({ icon: 'success', title: `Updated Successfully` })
            setIsEditModalOpen(false);
            setRefresh(true)
          })
          .catch((error) => { });
      }
      
    }
    
  }

  const handleDepartment = async (e) => {
    let arr4 = [...departmentsVal];
    if (arr4.find(elem => elem == e.name)) {
      arr4 = arr4.filter(elem => elem != e.name)
    } else {
      arr4.push(e.name)
    }
    await setDepartmentsVal(arr4)
    return false
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleSelectChange = async (event) => {
      setDeptVal(event.target.value)
  };


  const handlePencil = async (item) => {
    setUpdateQues({
      id: item.id,
      audit_type: item.audit_type,
      score: item.score,
      question: item.question,
      department_id: item.department_id.split(","),
      question_hint: item.question_hint,
      Is_Attachment_Req: item.Is_Attachment_Req,
      is_mandatory: item.is_mandatory,
      criticality: item.criticality,
      Q_Type: item.Q_Type,
      Max_Rating: item.Max_Rating,
      Opt1: item.Opt1,
      Opt2: item.Opt2,
      Opt3: item.Opt3,
      Opt4: item.Opt4,
      Opt5: item.Opt5,
      Opt6: item.Opt6,
    });
    setIsEditModalOpen(true);
};

  const handleDelete = async (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e3b912',
      cancelButtonColor: '#A0A0A0',
      confirmButtonText: 'Yes'
    }).then(async (result) => {
      if (result.value) {
       await axios.get(`${ENV.API_END_POINT}Question/Remove_ques/${item.id}`).then( (res) => {
         final()
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
            <h4 style={{ marginTop: '10px', marginLeft: '6px', color: 'white' }}>Question Master</h4>

          </div>
          <div className="col-md-3 mb-2 mt-2">
            <Form.Select className="form-control" onChange={(e) => { handleSelectChange(e) }} >
              <option value={""}>All</option>
              {
                departments && departments ? departments.map((data, index) => {
                  return (
                    <option key={index} value={data.id} >{data.name}</option>
                  )
                }) : null
              }
            </Form.Select>
          </div>
          <div className='col'>
            <button className='add_btn' style={{padding:'0px 30px'}} onClick={() => setIsModalOpen(true)}>Add Question</button>
          </div>
        </div>
        <div style={{ height: '520px', overflowY: 'scroll', background: '#000' }}>
          <Table style={{ backgroundColor: '#4b4b4b',color:'#fff', fontSize: '12px', }}>
            <thead style={{ backgroundColor: '#353535',height:'50px',verticalAlign:'middle', color: '#fff', position: 'sticky', top: -1, zIndex: 1, }}>
              <tr>
                <th style={{ width: '50%',fontWeight:'400' }}>Question</th>
                <th style={{fontWeight:'400' }}>Departments</th>
                <th style={{fontWeight:'400' }}>Mandatory</th>
                <th style={{fontWeight:'400' }}>Attachment</th>
                <th style={{fontWeight:'400' }}>Score</th>
                <th style={{fontWeight:'400' }}>Image</th>
                <th style={{ width: '80px',fontWeight:'400' }}>Action</th>
              </tr>
            </thead >
            <tbody style={{ maxHeight: '350px', overflowY: 'auto',fontSize:'11px' }}>
              {questionArr && questionArr.length>0 ? questionArr.map((item, key) => (
                <tr key={item.display_order}>
                  <td style={{ verticalAlign: 'middle' }}>{item.question}</td>
                  <td style={{ verticalAlign: 'middle' }}>{item.departmentNames}</td>
                  <td style={{ verticalAlign: 'middle' }}>{item.is_mandatory == 'yes' ? <span className='badge' style={{ color: '#fff' }}>Yes</span> : <span className='badge' style={{ color: '#fff' }}>No</span>}</td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{item.Is_Attachment_Req == 'Yes' ? <span className='badge' style={{ color: '#fff' }}>Yes</span> : <span className='badge' style={{ color: '#fff' }}>No</span>}</td>
                  {/* <td style={{ textAlign: 'left' }}>{(item.audit_type).charAt(0).toUpperCase() + (item.audit_type).slice(1)}</td> */}
                  <td style={{ verticalAlign: 'middle' }}>{item.score}</td>
                  {/* <td style={{ textAlign: 'right' }}>{item.display_order}</td> */}
                  <td>{item.imagePath ? <img src={item.imagePath} style={{ width: '40px', height: '30px' }} /> : ''}</td>
                  <td  style={{ verticalAlign: 'middle' }}>
                    {<BsPencil className="action_btn" style={{ cursor: 'pointer', marginRight: '8px', }} onClick={() => handlePencil(item)} />}
                    {<BsTrash className="action_btn" style={{ marginRight: '10px', cursor: 'pointer', marginRight: '8px', }} onClick={() => handleDelete(item)} />}
                  </td>
                </tr>
              )) : 
                <p style={{marginLeft: 30,}}>No data</p>
                }
            </tbody>
          </Table>
        </div>
      </div>
      <Modal isOpen={isModalOpen} style={customStyles}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: '20px', textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'row' }}>
            <h4> Add Question</h4>
            <FaTimes onClick={() => setIsModalOpen(false)} style={{ float: 'right', cursor: 'pointer', marginLeft: 'auto' }} />
          </div>
          <Form
            style={{ width: '93%' }}
            onSubmit={(event) => {
              event.preventDefault()
              handleSubmit(event)
            }}
          >
            <div className='row mb-2'>
              <FormControl variant="outlined">
                <TextField
                  variant="outlined"
                  name="Question"
                  label="Question Title"
                  value={question}
                  onChange={async (e) => {
                    await setQuestion(e.target.value)
                    if (e.target.value.length > 0) {
                      error.ques = "";
              
                      await setError({ ...error });
                    } else {
                      error.ques = "Mandatory Field";
                      await setError({ ...error });
                    }
                  }}
                  
                  fullWidth
                  style={{ width: '95.5%', marginLeft: '12px' }}
                />
                <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.ques? error.ques : ''}</FormHelperText>
              </FormControl>
            </div>
            <div className='row mb-2'>
              <div className='col-md-6 col-xl-6' style={{ paddingRight: '0px' }}>
                <FormControl variant="outlined">
                  <TextField
                    variant="outlined"
                    name="Question"
                    label="Question Hint"
                    value={questionHint}
                    onChange={async (e) => {
                      await setQuestionHint(e.target.value)
                      if (e.target.value.length > 0) {
                        error.hint = "";
                
                        await setError({ ...error });
                      } else {
                        error.hint = "Mandatory Field";
                        await setError({ ...error });
                      }
                    }}
                    
                    multiline
                    style={{ width: '399px' }}
                  />
                  <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.hint? error.hint : ''}</FormHelperText>
                </FormControl>
              </div>
              <div className='col-md-6 col-xl-6' style={{ paddingLeft: '0px' }}>
                <FormControl variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label">Question Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={questionType}
                    name="Question_Type"
                    label="Question Type"
                    onChange={async(e) => {
                      await setQuestionType(e.target.value)
                      if (e.target.value.length > 0) {
                        error.type = "";
                
                        await setError({ ...error });
                      } else {
                        error.type = "Mandatory Field";
                        await setError({ ...error });
                      }
                    }}
                    
                    fullWidth
                    style={{ width: '399px' }}
                  >
                    <MenuItem value="single" >Single</MenuItem>
                    {/* <MenuItem value="multiple">Multiple</MenuItem> */}
                    <MenuItem value="text">Text</MenuItem>
                    {/* <MenuItem value="textArea">TextArea</MenuItem>
                    <MenuItem value="rating">Rating</MenuItem> */}
                  </Select>
                  <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.type? error.type : ''}</FormHelperText>
                </FormControl>
              </div>
            </div>
            <div className='row mt-2'>
              <div className='col-md-6 col-xl-6' style={{ paddingRight: '0px' }}>
                <FormControl variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label">Criticality</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={criticality}
                    name="Criticality"
                    label="Criticality"
                    onChange={async(e) => {
                      await setCriticality(e.target.value)
                      if (e.target.value.length > 0) {
                        error.criticality = "";
                
                        await setError({ ...error });
                      } else {
                        error.criticality = "Mandatory Field";
                        await setError({ ...error });
                      }
                    }}
                    
                    fullWidth
                    style={{ width: '399px' }}
                  >
                    <MenuItem value='Non Critical'>Non Critical</MenuItem>
                    <MenuItem value='Essential'>Essential</MenuItem>
                    <MenuItem value='Critical'>Critical</MenuItem>
                    <MenuItem value='Super Critical'>Super Critical</MenuItem>
                    {/* <MenuItem value='Ultra Critical'>Ultra Critical</MenuItem> */}
                  </Select>
                  <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.criticality? error.criticality : ''}</FormHelperText>
                </FormControl>
              </div>
              <div className='col-md-6 col-xl-6' style={{ paddingLeft: '0px' }}>
                <FormControl style={{ marginTop: '5px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <FormLabel id="demo-radio-buttons-group-label" style={{ fontSize: '14px' }}>Mandatory: </FormLabel>
                  <RadioGroup
                    style={{ display: 'block', marginLeft: '20px' }}
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={mandatory}
                    onChange={async(e) => {
                      await setMandatory(e.target.value)
                      if (e.target.value.length > 0) {
                        error.mandatory = "";
                
                        await setError({ ...error });
                      } else {
                        error.mandatory = "Mandatory Field";
                        await setError({ ...error });
                      }
                    }}
                  >
                    <FormControlLabel value='Yes' control={<Radio />} label="Yes" />
                    <FormControlLabel value='No' control={<Radio />} label="No" />
                  </RadioGroup>
                  <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.mandatory? error.mandatory : ''}</FormHelperText>
                </FormControl>
              </div>
            </div>
            <div className='row mt-2'>
              <div className='col-md-6 col-xl-6' style={{ paddingRight: '0px' }}>
                <FormControl variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label">Departments</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={departmentsVal}
                    name="Departments"
                    label="Departments"
                    onChange={async(e) => {
                      if (e.target.value.length > 0) {
                        await setDepartmentsVal(e.target.value)
                        error.departments = "";
                        await setError({ ...error });
                      } else {
                        error.departments = "Mandatory Field";
                        await setError({ ...error });
                      }
                    }}
                    
                    fullWidth
                    multiple
                    style={{ width: '399px' }}
                  >
                    {departments.length > 0 &&
                      departments.map((ele) => {
                        return <MenuItem value={ele.id}>{ele.name}</MenuItem>;
                      })}
                  </Select>
                  <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.departments? error.departments : ''}</FormHelperText>
                </FormControl>
              </div>
              <div className='col-md-6 col-xl-6' style={{ paddingLeft: '0px' }}>
                <FormControl variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label">Audit Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={auditVal}
                    name="Audit_Type"
                    label="Audit Type"
                    onChange={async(e) => {
                      await setAuditVal(e.target.value)
                      if (e.target.value.length > 0) {
                        error.audittype = "";
                
                        await setError({ ...error });
                      } else {
                        error.audittype = "Mandatory Field";
                        await setError({ ...error });
                      }
                    }}
                    
                    fullWidth
                    style={{ width: '399px' }}
                  >
                    <MenuItem value="cinema">Cinema</MenuItem>
                    <MenuItem value="mystery">Mystery</MenuItem>
                  </Select>
                  <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.audittype? error.audittype : ''}</FormHelperText>
                </FormControl>
              </div>
            </div>
            <div className='row mt-2'>
              <div className='col-md-6 col-xl-6' style={{ paddingRight: '0px' }}>
                <FormControl variant="outlined">
                  <TextField
                    variant="outlined"
                    name="Score"
                    label="Score"
                    value={score}
                    onChange={async(e) => {
                      await setScore(e.target.value)
                      if (e.target.value.length > 0) {
                        error.score = "";
                
                        await setError({ ...error });
                      } else {
                        error.score = "Mandatory Field";
                        await setError({ ...error });
                      }
                    }}
                    
                    fullWidth
                    style={{ width: '399px' }}
                  />
                  <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.score? error.score : ''}</FormHelperText>
                </FormControl>
              </div>
              <div className='col-md-6 col-xl-6' style={{ paddingLeft: '0px' }}>
                <FormControl style={{ marginTop: '5px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <FormLabel id="demo-radio-buttons-group-label" style={{ fontSize: '14px' }}>Attachment: </FormLabel>
                  <RadioGroup
                    style={{ display: 'block', marginLeft: '20px' }}
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={attachment}
                    onChange={async(e) => {
                      await setAttachment(e.target.value)
                      if (e.target.value.length > 0) {
                        error.attachment = "";
                
                        await setError({ ...error });
                      } else {
                        error.attachment = "Mandatory Field";
                        await setError({ ...error });
                      }
                    }}
                  >
                    <FormControlLabel value='Yes' control={<Radio />} label="Yes" />
                    <FormControlLabel value='No' control={<Radio />} label="No" />
                  </RadioGroup>
                  <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.attachment? error.attachment : ''}</FormHelperText>
                </FormControl>
              </div>
            </div>
            {
              questionType == 'single' || questionType == 'multiple' ?
                <div className='row mt-2' style={{ width: '820px' }}>
                  <div className='col-md-2 col-xl-2' style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                    <FormControl variant="outlined">
                      <TextField
                        variant="outlined"
                        name="Option"
                        label="Option 1"
                        value={score}
                        disabled
                        onChange={async(e) => {
                          await setOption1(e.target.value)
                          if (e.target.value.length > 0) {
                            error.option1 = "";
                    
                            await setError({ ...error });
                          } else {
                            error.option1 = "Mandatory Field";
                            await setError({ ...error });
                          }
                        }}
                        
                        fullWidth
                        style={{ width: '95%', marginLeft: '12px' }}
                      />
                      <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.option1? error.option1 : ''}</FormHelperText>
                    </FormControl>
                  </div>
                  <div className='col-md-2 col-xl-2' style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                    <FormControl variant="outlined">
                      <TextField
                        variant="outlined"
                        name="Option"
                        label="Option 2"
                        value={'0'}
                        disabled
                        onChange={async(e) => {
                          await setOption2(e.target.value)
                          if (e.target.value.length > 0) {
                            error.option2 = "";
                    
                            await setError({ ...error });
                          } else {
                            error.option2 = "Mandatory Field";
                            await setError({ ...error });
                          }
                        }}
                        
                        fullWidth
                        style={{ width: '95%', marginLeft: '12px' }}
                      />
                      <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.option2? error.option2 : ''}</FormHelperText>
                    </FormControl>
                  </div>
                  <div className='col-md-2 col-xl-2' style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                    <FormControl variant="outlined">
                      <TextField
                        variant="outlined"
                        name="Option"
                        label="Option 3"
                        value={'NA'}
                        disabled
                        onChange={async(e) => {
                          await setOption3(e.target.value)
                          if (e.target.value.length > 0) {
                            error.option3 = "";
                    
                            await setError({ ...error });
                          } else {
                            error.option3 = "Mandatory Field";
                            await setError({ ...error });
                          }
                        }}
                        
                        fullWidth
                        style={{ width: '95%', marginLeft: '12px' }}
                      />
                      <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.option3? error.option3 : ''}</FormHelperText>
                    </FormControl>
                  </div>
                  <div className='col-md-2 col-xl-2' style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                    <FormControl variant="outlined">
                      <TextField
                        variant="outlined"
                        name="Option"
                        label="Option 4"
                        value={'NA_'}
                        disabled
                        onChange={async(e) => {
                          await setOption4(e.target.value)
                          if (e.target.value.length > 0) {
                            error.option4 = "";
                    
                            await setError({ ...error });
                          } else {
                            error.option4 = "Mandatory Field";
                            await setError({ ...error });
                          }
                        }}
                        
                        fullWidth
                        style={{ width: '95%', marginLeft: '12px' }}
                      />
                      <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.option4? error.option4 : ''}</FormHelperText>
                    </FormControl>
                  </div>
                  {/* <div className='col-md-2 col-xl-2' style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                    <FormControl variant="outlined">
                      <TextField
                        variant="outlined"
                        name="Option"
                        label="Option 5"
                        value={option5}
                        onChange={async(e) => {
                          await setOption5(e.target.value)
                          if (e.target.value.length > 0) {
                            error.option5 = "";
                    
                            await setError({ ...error });
                          } else {
                            error.option5 = "Mandatory Field";
                            await setError({ ...error });
                          }
                        }}
                        
                        fullWidth
                        style={{ width: '95%', marginLeft: '12px' }}
                      />
                      <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.option5? error.option5 : ''}</FormHelperText>
                    </FormControl>
                  </div>
                  <div className='col-md-2 col-xl-2' style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                    <FormControl variant="outlined">
                      <TextField
                        variant="outlined"
                        name="Option"
                        label="Option 6"
                        value={option6}
                        onChange={async(e) => {
                          await setOption6(e.target.value)
                          if (e.target.value.length > 0) {
                            error.option6 = "";
                    
                            await setError({ ...error });
                          } else {
                            error.option6 = "Mandatory Field";
                            await setError({ ...error });
                          }
                        }}
                        
                        fullWidth
                        style={{ width: '95%', marginLeft: '12px' }}
                      />
                      <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.option6? error.option6 : ''}</FormHelperText>
                    </FormControl>
                  </div> */}
                </div> :
                questionType == 'rating' ?
                  <div className='row mt-2'>
                    <div className='col-md-6 col-xl-6'>
                      <FormControl variant="outlined">
                        <TextField
                          variant="outlined"
                          name="Max_Raiting"
                          label="Max Raiting"
                          value={maxRating}
                          onChange={async(e) => {
                            await setMaxRating(e.target.value)
                            if (e.target.value.length > 0) {
                              error.maxrating = "";
                      
                              await setError({ ...error });
                            } else {
                              error.maxrating = "Mandatory Field";
                              await setError({ ...error });
                            }
                          }}
                          
                          fullWidth
                          style={{ width: '399px' }}
                        />
                        <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.maxrating? error.maxrating : ''}</FormHelperText>
                      </FormControl>
                    </div></div> : null
            }
            <div
                style={{
                  textAlign: "center",
                  marginTop: 20,
                  marginBottom: 2,
                  marginLeft: 10,
                  // paddingTop: 5,
                  paddingBottom: 5,
                  width: 220,
                  alignSelf: "center",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  cursor: 'pointer',
                }}
              >
                 <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Bulk Question Upload</Form.Label>
              <Form.Control type="file"
              // label={file}
              style={{width: '270px'}}
              onChange={(e) => setFile(e.target.files[0])} />
            </Form.Group>
                
                
              </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignContent: 'center' }}>
              <div
                style={{
                  textAlign: "center",
                  border: "1px solid ",
                  borderRadius: 8,
                  marginTop: 20,
                  marginBottom: 2,
                  // paddingTop: 5,
                  paddingBottom: 5,
                  width: 220,
                  alignSelf: "center",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  cursor: 'pointer',
                }}
              >
                <FaPaperclip style={{ marginLeft: 50, }} /><input type='file' name="image" className="attachment" onChange={(handleFileSelect)} />
                
              </div>
              
              {selectedFile ? <p style={{ textAlign: 'center', fontSize: '10px', color: 'red' }}>{selectedFile.name}</p> : null}
              <Button type="submit" style={{ marginTop: '7px', width: '220px', backgroundColor: '#e3b912', borderColor: '#e3b912' }}>Add Question</Button>
            </div>
          </Form>
        </div>

      </Modal>
      <Modal isOpen={isEditModalOpen} style={customStyles}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: '20px', textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'row' }}>
            <h4> Edit Question</h4>
            <FaTimes onClick={() => setIsEditModalOpen(false)} style={{ float: 'right', cursor: 'pointer', marginLeft: 'auto' }} />
          </div>
          <Form
            style={{ width: '93%' }}
            onSubmit={(event) => {
              event.preventDefault()
              handleEdit()
            }}
          >
            <div className='row mb-2'>
              <FormControl variant="outlined">
                <TextField
                  variant="outlined"
                  name="Question"
                  label="Question Title"
                  value={updateQues.question}
                  onChange={async (e) => {
                    await setUpdateQues(prevState => ({ ...prevState, question: e.target.value }))
                    if (e.target.value.length > 0) {
                      error.editques = "";
              
                      await setError({ ...error });
                    } else {
                      error.editques = "Mandatory Field";
                      await setError({ ...error });
                    }
                  }}
                  
                  fullWidth
                  style={{ width: '95.5%', marginLeft: '12px' }}
                />
                <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.editques? error.editques : ''}</FormHelperText>
              </FormControl>
            </div>
            <div className='row mb-2'>
              <div className='col-md-6 col-xl-6' style={{ paddingRight: '0px' }}>
                <FormControl variant="outlined">
                  <TextField
                    variant="outlined"
                    name="Question"
                    label="Question Hint"
                    value={updateQues.question_hint}
                    onChange={async (e) => {
                      await setUpdateQues(prevState => ({ ...prevState, question_hint: e.target.value }))
                      if (e.target.value.length > 0) {
                        error.edithint = "";
                
                        await setError({ ...error });
                      } else {
                        error.edithint = "Mandatory Field";
                        await setError({ ...error });
                      }
                    }}
                    
                    multiline
                    style={{ width: '399px' }}
                  />
                  <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.edithint? error.edithint : ''}</FormHelperText>
                </FormControl>
              </div>
              <div className='col-md-6 col-xl-6' style={{ paddingLeft: '0px' }}>
                <FormControl variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label">Question Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={updateQues.Q_Type}
                    name="Question_Type"
                    label="Question Type"
                    onChange={async(e) => {
                      await setUpdateQues(prevState => ({ ...prevState, Q_Type: e.target.value }))
                      if (e.target.value.length > 0) {
                        error.edittype = "";
                
                        await setError({ ...error });
                      } else {
                        error.edittype = "Mandatory Field";
                        await setError({ ...error });
                      }
                    }}
                    
                    fullWidth
                    style={{ width: '399px' }}
                  >
                    <MenuItem value="single">Single</MenuItem>
                    <MenuItem value="multiple">Multiple</MenuItem>
                    <MenuItem value="text">Text</MenuItem>
                    <MenuItem value="textArea">TextArea</MenuItem>
                    <MenuItem value="rating">Rating</MenuItem>
                    <MenuItem value="quantity">Quantity</MenuItem>
                  </Select>
                  <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.edittype? error.edittype : ''}</FormHelperText>
                </FormControl>
              </div>
            </div>
            <div className='row mt-2'>
              <div className='col-md-6 col-xl-6' style={{ paddingRight: '0px' }}>
                <FormControl variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label">Criticality</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={updateQues.criticality}
                    name="Criticality"
                    label="Criticality"
                    onChange={async(e) => {
                      await setUpdateQues(prevState => ({ ...prevState, criticality: e.target.value }))
                      if (e.target.value.length > 0) {
                        error.editcriticality = "";
                
                        await setError({ ...error });
                      } else {
                        error.editcriticality = "Mandatory Field";
                        await setError({ ...error });
                      }
                    }}
                    
                    fullWidth
                    style={{ width: '399px' }}
                  >
                    <MenuItem value='Non Critical'>Non Critical</MenuItem>
                    <MenuItem value='Essential'>Essential</MenuItem>
                    <MenuItem value='Critical'>Critical</MenuItem>
                    <MenuItem value='Super Critical'>Super Critical</MenuItem>
                    {/* <MenuItem value='Ultra Critical'>Ultra Critical</MenuItem> */}
                  </Select>
                  <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.editcriticality? error.editcriticality : ''}</FormHelperText>
                </FormControl>
              </div>
              <div className='col-md-6 col-xl-6' style={{ paddingLeft: '0px' }}>
                <FormControl style={{ marginTop: '5px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <FormLabel id="demo-radio-buttons-group-label" style={{ fontSize: '14px' }}>Mandatory: </FormLabel>
                  <RadioGroup
                    style={{ display: 'block', marginLeft: '20px' }}
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={updateQues.is_mandatory? updateQues.is_mandatory: ''}
                    onChange={async(e) => {
                      await setUpdateQues(prevState => ({ ...prevState, is_mandatory: e.target.value }))
                      if (e.target.value.length > 0) {
                        error.editmandatory = "";
                
                        await setError({ ...error });
                      } else {
                        error.editmandatory = "Mandatory Field";
                        await setError({ ...error });
                      }
                    }}
                  >
                    <FormControlLabel value='yes' control={<Radio />} label="Yes" />
                    <FormControlLabel value='no' control={<Radio />} label="No" />
                  </RadioGroup>
                  <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.editmandatory? error.editmandatory : ''}</FormHelperText>
                </FormControl>
              </div>
            </div>
            <div className='row mt-2'>
              <div className='col-md-6 col-xl-6' style={{ paddingRight: '0px' }}>
                <FormControl variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label">Departments</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={updateQues.department_id}
                    name="Departments"
                    label="Departments"
                    onChange={async(e) => {
                      if (e.target.value.length > 0) {
                        await setUpdateQues(prevState => ({ ...prevState, department_id: e.target.value }))
                        error.editdepartments = "";
                        await setError({ ...error });
                      } else {
                        error.editdepartments = "Mandatory Field";
                        await setError({ ...error });
                      }
                    }}
                    
                    fullWidth
                    multiple
                    style={{ width: '399px' }}
                  >
                    {departments.length > 0 &&
                      departments.map((ele) => {
                        return <MenuItem value={ele.id}>{ele.name}</MenuItem>;
                      })}
                  </Select>
                  <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.editdepartments? error.editdepartments : ''}</FormHelperText>
                </FormControl>
              </div>
              <div className='col-md-6 col-xl-6' style={{ paddingLeft: '0px' }}>
                <FormControl variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label">Audit Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={updateQues.audit_type}
                    name="Audit_Type"
                    label="Audit Type"
                    onChange={async(e) => {
                      await setUpdateQues(prevState => ({ ...prevState, audit_type: e.target.value }))
                      if (e.target.value.length > 0) {
                        error.editaudittype = "";
                
                        await setError({ ...error });
                      } else {
                        error.editaudittype = "Mandatory Field";
                        await setError({ ...error });
                      }
                    }}
                    
                    fullWidth
                    style={{ width: '399px' }}
                  >
                    <MenuItem value="cinema">Cinema</MenuItem>
                    <MenuItem value="mystery">Mystery</MenuItem>
                  </Select>
                  <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.editaudittype? error.editaudittype : ''}</FormHelperText>
                </FormControl>
              </div>
            </div>
            <div className='row mt-2'>
              <div className='col-md-6 col-xl-6' style={{ paddingRight: '0px' }}>
                <FormControl variant="outlined">
                  <TextField
                    variant="outlined"
                    name="Score"
                    label="Score"
                    value={updateQues.score}
                    onChange={async(e) => {
                      await setUpdateQues(prevState => ({ ...prevState, score: e.target.value }))
                      if (e.target.value.length > 0) {
                        error.editscore = "";
                
                        await setError({ ...error });
                      } else {
                        error.editscore = "Mandatory Field";
                        await setError({ ...error });
                      }
                    }}
                    
                    fullWidth
                    style={{ width: '399px' }}
                  />
                  <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.editscore? error.editscore : ''}</FormHelperText>
                </FormControl>
              </div>
              <div className='col-md-6 col-xl-6' style={{ paddingLeft: '0px' }}>
                <FormControl style={{ marginTop: '5px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <FormLabel id="demo-radio-buttons-group-label" style={{ fontSize: '14px' }}>Attachment: </FormLabel>
                  <RadioGroup
                    style={{ display: 'block', marginLeft: '20px' }}
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={updateQues.Is_Attachment_Req ? updateQues.Is_Attachment_Req.toString(): ''}
                    onChange={async(e) => {
                      await setUpdateQues(prevState => ({ ...prevState, Is_Attachment_Req: e.target.value }))
                      if (e.target.value.length > 0) {
                        error.editattachment = "";
                
                        await setError({ ...error });
                      } else {
                        error.editattachment = "Mandatory Field";
                        await setError({ ...error });
                      }
                    }}
                  >
                    <FormControlLabel value='Yes' control={<Radio />} label="Yes" />
                    <FormControlLabel value='No' control={<Radio />} label="No" />
                  </RadioGroup>
                  <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.editattachment? error.editattachment : ''}</FormHelperText>
                </FormControl>
              </div>
            </div>
            {
              updateQues.Q_Type == 'single' || updateQues.Q_Type == 'multiple' ?
                <div className='row mt-2' style={{ width: '820px' }}>
                  <div className='col-md-2 col-xl-2' style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                    <FormControl variant="outlined">
                      <TextField
                        variant="outlined"
                        name="Option"
                        label="Option 1"
                        value={updateQues.Opt1}
                        onChange={async(e) => {
                          await setUpdateQues(prevState => ({ ...prevState, Opt1: e.target.value }))
                          if (e.target.value.length > 0) {
                            error.editoption1 = "";
                    
                            await setError({ ...error });
                          } else {
                            error.editoption1 = "Mandatory Field";
                            await setError({ ...error });
                          }
                        }}
                        
                        fullWidth
                        style={{ width: '95%', marginLeft: '12px' }}
                      />
                      <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.editoption1? error.editoption1 : ''}</FormHelperText>
                    </FormControl>
                  </div>
                  <div className='col-md-2 col-xl-2' style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                    <FormControl variant="outlined">
                      <TextField
                        variant="outlined"
                        name="Option"
                        label="Option 2"
                        value={updateQues.Opt2}
                        onChange={async(e) => {
                          await setUpdateQues(prevState => ({ ...prevState, Opt2: e.target.value }))
                          if (e.target.value.length > 0) {
                            error.editoption2 = "";
                    
                            await setError({ ...error });
                          } else {
                            error.editoption2 = "Mandatory Field";
                            await setError({ ...error });
                          }
                        }}
                        fullWidth
                        style={{ width: '95%', marginLeft: '12px' }}
                      />
                      <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.editoption2? error.editoption2 : ''}</FormHelperText>
                    </FormControl>
                  </div>
                  <div className='col-md-2 col-xl-2' style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                    <FormControl variant="outlined">
                      <TextField
                        variant="outlined"
                        name="Option"
                        label="Option 3"
                        value={updateQues.Opt3}
                        onChange={async(e) => {
                          await setUpdateQues(prevState => ({ ...prevState, Opt3: e.target.value }))
                          if (e.target.value.length > 0) {
                            error.editoption3 = "";
                    
                            await setError({ ...error });
                          } else {
                            error.editoption3 = "Mandatory Field";
                            await setError({ ...error });
                          }
                        }}
                        
                        fullWidth
                        style={{ width: '95%', marginLeft: '12px' }}
                      />
                      <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.editoption3? error.editoption3 : ''}</FormHelperText>
                    </FormControl>
                  </div>
                  <div className='col-md-2 col-xl-2' style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                    <FormControl variant="outlined">
                      <TextField
                        variant="outlined"
                        name="Option"
                        label="Option 4"
                        value={updateQues.Opt4}
                        onChange={async(e) => {
                          await setUpdateQues(prevState => ({ ...prevState, Opt4: e.target.value }))
                          if (e.target.value.length > 0) {
                            error.editoption4 = "";
                    
                            await setError({ ...error });
                          } else {
                            error.editoption4 = "Mandatory Field";
                            await setError({ ...error });
                          }
                        }}
                        
                        fullWidth
                        style={{ width: '95%', marginLeft: '12px' }}
                      />
                      <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.editoption4? error.editoption4 : ''}</FormHelperText>
                    </FormControl>
                  </div>
                  {/* <div className='col-md-2 col-xl-2' style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                    <FormControl variant="outlined">
                      <TextField
                        variant="outlined"
                        name="Option"
                        label="Option 5"
                        value={updateQues.Opt5}
                        onChange={async(e) => {
                          await setUpdateQues(prevState => ({ ...prevState, Opt5: e.target.value }))
                          if (e.target.value.length > 0) {
                            error.editoption5 = "";
                    
                            await setError({ ...error });
                          } else {
                            error.editoption5 = "Mandatory Field";
                            await setError({ ...error });
                          }
                        }}
                        
                        fullWidth
                        style={{ width: '95%', marginLeft: '12px' }}
                      />
                      <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.editoption5? error.editoption5 : ''}</FormHelperText>
                    </FormControl>
                  </div> */}
                  {/* <div className='col-md-2 col-xl-2' style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                    <FormControl variant="outlined">
                      <TextField
                        variant="outlined"
                        name="Option"
                        label="Option 6"
                        value={updateQues.Opt6}
                        onChange={async(e) => {
                          await setUpdateQues(prevState => ({ ...prevState, Opt6: e.target.value }))
                          if (e.target.value.length > 0) {
                            error.editoption6 = "";
                    
                            await setError({ ...error });
                          } else {
                            error.editoption6 = "Mandatory Field";
                            await setError({ ...error });
                          }
                        }}
                        
                        fullWidth
                        style={{ width: '95%', marginLeft: '12px' }}
                      />
                      <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.editoption6? error.editoption6 : ''}</FormHelperText>
                    </FormControl>
                  </div> */}
                </div> :
                updateQues.Q_Type  == 'rating' ?
                  <div className='row mt-2'>
                    <div className='col-md-6 col-xl-6'>
                      <FormControl variant="outlined">
                        <TextField
                          variant="outlined"
                          name="Max_Raiting"
                          label="Max Raiting"
                          value={updateQues.Max_Rating}
                          onChange={async(e) => {
                            await setUpdateQues(prevState => ({ ...prevState, Max_Rating: e.target.value }))
                            if (e.target.value.length > 0) {
                              error.editmaxrating = "";
                      
                              await setError({ ...error });
                            } else {
                              error.editmaxrating = "Mandatory Field";
                              await setError({ ...error });
                            }
                          }}
                          
                          fullWidth
                          style={{ width: '399px' }}
                        />
                        <FormHelperText style={{color: 'red', fontSize: '10px'}}>{error && error.editmaxrating? error.editmaxrating : ''}</FormHelperText>
                      </FormControl>
                    </div></div> : null
            }
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignContent: 'center' }}>
              <div
                style={{
                  textAlign: "center",
                  border: "1px solid ",
                  borderRadius: 8,
                  marginTop: 20,
                  marginBottom: 2,
                  // paddingTop: 5,
                  paddingBottom: 5,
                  width: 220,
                  alignSelf: "center",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  cursor: 'pointer',
                }}
              >
                <FaPaperclip style={{ marginLeft: 50, }} /><input type='file' name="image" className="attachment" onChange={(handleFileSelect)} />
              </div>
              {selectedFile ? <p style={{ textAlign: 'center', fontSize: '10px', color: 'red' }}>{selectedFile.name}</p> : null}
              <Button type="submit" style={{ marginTop: '7px', width: '220px', backgroundColor: '#e3b912', borderColor: '#e3b912' }}>Update Question</Button>
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

export default Question;
