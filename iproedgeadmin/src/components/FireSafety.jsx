import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { AppContext } from './AppContext';
import { Button, Form, Table } from "react-bootstrap";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  RadioGroup,
  Radio,
  Checkbox,
  Rating,
} from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom'
import status_obj from '../audit_status';
import ENV from '../ENV';

const FireSafety = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const item = location.state.item
  const { auditdata, setauditData } = useContext(AppContext)
  const { data, setData } = useContext(AppContext)
  const { comeback, setComeBack } = useContext(AppContext)
  let postdata = {}
  const [queData, setQueData] = useState([])

  var criticality_obj = {
    'Essential': '#89FE02',
    'Critical': '#FEC803',
    'Super Critical': '#FF5100',
    'Non Critical': '#FF8403',
    'Ultra Critical': '#FE0002',
}

  const checkIfKeyExist = (objectName, keyName) => {
    let keyExist = Object.keys(objectName).some(key => key === keyName);
    return keyExist;
  };


  useEffect(() => {
    if (data.audit_status == "Sent to PMO") {
      axios.post(`${ENV.API_END_POINT}QuestionnaireByDepartment`, { depatmentId: item.deptId, auditId: data.AuditId })
        .then((res) => {
          setQueData(res.data)
        })
    }
    else {
      axios.post(`${ENV.API_END_POINT}Question/Get_questions`, { deptId: item.deptId })
        .then((res) => {
          setQueData(res.data)
        })
    }
  }, [item])

  console.log(queData, "skdnfkndskfdsjsd")

  const handleSubmit = async () => {
    postdata.cinema_id = auditdata.cinema_id
    postdata.start_date = auditdata.start_date
    postdata.end_date = auditdata.end_date
    postdata.auditName = auditdata.auditName
    postdata.audit_status = auditdata.audit_status
    postdata.current_status = auditdata.current_status
    postdata.scheduling_type = auditdata.scheduling_type
    postdata.created_by = auditdata.created_by
    postdata.month = auditdata.month

    console.log(postdata, auditdata)
    // return false;

    await axios
      .post(`${ENV.API_END_POINT}AuditStatusReport/Create_audit`, { postdata: postdata, tlName: auditdata.tlName, pmoName: auditdata.pmoName, departmentsName: auditdata.departmentsName, auditorVal: auditdata.auditorVal, departmentsManID: auditdata.departmentsManID, directorID: auditdata.directorID })
      .then((res) => {
        navigate('/audits')
      })
      .catch((error) => { });
  }

  const handlegoback = async () => {
    await setComeBack(true)
    navigate('/audits')
  }

  return (
    <div className='container'>
      <div className='mt-3'>
        {
          queData.map((item, index) =>
            <div style={{ border: '1px solid #000', padding: '10px', marginBottom: '10px', borderRadius: 10 }}>
              <h6 className='mb-2'> <b>Q.{index + 1}</b> {item.question} {item.imagePath? <img src={item.imagePath} style={{width: '40px', height:'30px'}}/>: ''}</h6>
              <h6 className='mb-2'> <b>Answer</b>{item.answer ?
                item.Q_Type == 'single' ?
                  <FormControl style={{ marginLeft: '10px', marginTop: '-10px', }}>
                    <RadioGroup
                       style={{display: 'block'}}
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={(item.answer)}
                      defaultValue={(item.answer)}
                    >
                      {item.options.map((ele) =>
                        <FormControlLabel value={ele.value} control={<Radio />} label={ele.label} />
                      )}
                    </RadioGroup>
                  </FormControl>
                  : item.Q_Type == 'multiple' ?
                    <FormControl style={{ marginLeft: '10px', marginTop: '-10px', }}>
                      <FormGroup
                      style={{display: 'block'}}
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        // checked={(item.answer).split(',')}
                        // defaultValue={(item.answer)}
                      >
                        {item.options.map((ele) =>
                          <FormControlLabel value={ele.value} control={<Checkbox disabled checked={((item.answer).includes(ele.value)) ? true : false} />} label={ele.label} />
                        )}
                      </FormGroup>
                    </FormControl>
                    : item.Q_Type == 'text' || item.Q_Type == 'textArea' ?
                      <div style={{marginLeft: '65px', marginTop: '-19.5px'}}>{(item.answer)}</div> :
                       item.Q_Type == 'rating'? 
                       <Rating style={{ marginLeft: '10px', marginTop: '-10px' }} name="read-only" value={item.answer} readOnly max={item.Max_Rating} />:null

                :
                  item.Q_Type == 'single' ?
                  <FormControl style={{ marginLeft: '10px', marginTop: '-10px' }}>
                    <RadioGroup
                    style={{display: 'block'}}
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                    >
                      <FormControlLabel value={item.Opt1} control={<Radio />} label={item.Opt1} />
                      <FormControlLabel value={item.Opt2} control={<Radio />} label={item.Opt2} />
                      <FormControlLabel value={item.Opt3} control={<Radio />} label={item.Opt3} />
                      <FormControlLabel value={item.Opt4} control={<Radio />} label={item.Opt4} />
                      <FormControlLabel value={item.Opt5} control={<Radio />} label={item.Opt5} />
                      <FormControlLabel value={item.Opt6} control={<Radio />} label={item.Opt6} />
                    </RadioGroup>
                  </FormControl>
                  : item.Q_Type == 'multiple' ?
                    <FormControl style={{ marginLeft: '10px', marginTop: '-10px' }}>
                      <FormGroup
                      style={{display: 'block'}}
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                      >
                        <FormControlLabel value={item.Opt1} control={<Checkbox disabled />} label={item.Opt1} />
                        <FormControlLabel value={item.Opt2} control={<Checkbox disabled />} label={item.Opt2} />
                        <FormControlLabel value={item.Opt3} control={<Checkbox disabled />} label={item.Opt3} />
                        <FormControlLabel value={item.Opt4} control={<Checkbox disabled />} label={item.Opt4} />
                        <FormControlLabel value={item.Opt5} control={<Checkbox disabled />} label={item.Opt5} />
                        <FormControlLabel value={item.Opt6} control={<Checkbox disabled />} label={item.Opt6} />
                      </FormGroup>
                    </FormControl>
                    :  
                    item.Q_Type == 'rating'? 
                    <Rating style={{ marginLeft: '10px', marginTop: '-10px' }} name="read-only" value={item.answer} readOnly max={item.Max_Rating} />
                    : item.Q_Type == 'text' || item.Q_Type == 'textArea' ?
                      "----" 
                      :null

              }</h6>
            </div>
          )
        }
      </div>
      {status_obj.hasOwnProperty(data.audit_status) ? null :
        <div className='mt-3 mb-5' style={{ height: '11px' }}>
          <Button variant='primary' style={{ float: 'right' }} onClick={handleSubmit}>Submit</Button>
          <Button variant='secondary' style={{ float: 'right', marginRight: '10px' }} onClick={handlegoback}>Go Back</Button>
        </div>}

    </div>
  )
}

export default FireSafety
