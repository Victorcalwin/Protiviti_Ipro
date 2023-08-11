import React, { useEffect, useRef, useState } from 'react'
import AuthDetails from '../../services/AuthDetails';
import { Box, Divider, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import ApiCall from '../../services/ApiCall';
import { FaEye } from "react-icons/fa";
import Modal from '@mui/material/Modal';
import { BsArrowLeft, BsCheckCircle } from 'react-icons/bs';
const ActionRequired = () => {
  const role = AuthDetails.getRoles()
  const userId = AuthDetails.getUserId()
  const [refresh, setRefresh] = useState("1")
  const [tableData, setTableData] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [details, setDetails] = useState({});
  const [criticalCount, setCriticalCount] = useState(0)
  const [ultraCriticalCount, setUltraCriticalCount] = useState(0)
  useEffect(() => {
    ApiCall.getRequiredActionData({ userId })
      .then((result) => {
        if (result && Object.keys(result).length > 0) {
          setTableData(result.tableData)
          setCriticalCount(result.criticalCount)
          setUltraCriticalCount(result.ultraCriticalCount)
          setRefresh("0")
        }
      })
  }, [refresh])
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleView = (row) => {
    toggleModal()
    setDetails(row)
  }
  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }
  const handleSubmit = (val) => {
    ApiCall.updateNotificationStatus({
      notificationId: details.NotificationId,
      status: val
    })
    setRefresh("1")
    toggleModal()
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '12%', marginLeft: '9vh' }}>
        <Box sx={{ background: '#4b4b4b', fontSize: '14px', marginTop: '30px', width: '100%', borderRadius: '5px', height: '20vh' }}>
          <Typography sx={{ fontSize: '14px', alignItems: 'center', color: '#fff', display: 'flex', justifyContent: 'center', borderBottom: '1px solid', marginTop: '5px', marginBottom: '5px' }}>Ultra Critical</Typography>
          <Typography sx={{ fontSize: '45px', display: 'flex', justifyContent: 'center', color: '#e3b912' }}>{ultraCriticalCount}</Typography>
          <Typography sx={{ fontSize: '12px', alignItems: 'center', color: '#fff', display: 'flex', justifyContent: 'center' }}>unread notifications</Typography>
        </Box>
        <Box sx={{ background: '#4b4b4b', fontSize: '14px', marginTop: '30px', width: '100%', borderRadius: '5px', height: '20vh' }}>
          <Typography sx={{ fontSize: '14px', alignItems: 'center', color: '#fff', display: 'flex', justifyContent: 'center', borderBottom: '1px solid', marginTop: '5px', marginBottom: '5px' }}>Critical</Typography>
          <Typography sx={{ fontSize: '45px', display: 'flex', justifyContent: 'center', color: '#e3b912' }}>{criticalCount}</Typography>
          <Typography sx={{ fontSize: '12px', alignItems: 'center', color: '#fff', display: 'flex', justifyContent: 'center' }}>unread notifications</Typography>
        </Box>
      </Box>
      <Divider orientation="vertical" sx={{ backgroundColor: '#fff', height: '81vh', width: '3px', marginLeft: '55px', marginTop: '4vh' }} />
      <Box className="table-view" sx={{ background: '#4b4b4b', fontSize: '14px', marginTop: '30px', width: '75%' }}>
        <Paper>
          <TableContainer sx={{ maxHeight: 520 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell align='center' sx={{ width: '1vh', backgroundColor: '#4b4b4b', color: '#fff' }}>#</TableCell>
                  <TableCell align='center' sx={{ backgroundColor: '#4b4b4b', color: '#fff' }}>Audit ID | Name</TableCell>
                  <TableCell align='center' sx={{ backgroundColor: '#4b4b4b', color: '#fff' }}>Question Type</TableCell>
                  <TableCell align='center' sx={{ backgroundColor: '#4b4b4b', color: '#fff' }}>Notified On</TableCell>
                  <TableCell align='center' sx={{ backgroundColor: '#4b4b4b', color: '#fff' }}>Status</TableCell>
                  <TableCell align='center' sx={{ backgroundColor: '#4b4b4b', color: '#fff' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData && tableData.length > 0 && tableData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover>
                        <TableCell sx={{ backgroundColor: '#7c7b7b', color: '#fff' }} align="center">{row.NotificationId}</TableCell>
                        <TableCell sx={{ backgroundColor: '#7c7b7b', color: '#fff' }} align="left">{row.company_code + "00" + row.audit_Id} | {row.auditName}</TableCell>
                        <TableCell sx={{ backgroundColor: '#7c7b7b', color: '#fff' }} align="center">{row.QuestionType}</TableCell>
                        <TableCell sx={{ backgroundColor: '#7c7b7b', color: '#fff' }} align="center">{row.createdOn}</TableCell>
                        <TableCell sx={{ backgroundColor: '#7c7b7b', color: '#fff' }} align="center">{row.status}</TableCell>
                        <TableCell sx={{ backgroundColor: '#7c7b7b', color: '#fff' }} align="center"><button className='Icon-button' onClick={() => handleView(row)}><FaEye /> View</button></TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={{ backgroundColor: '#7c7b7b', color: '#fff' }}
            rowsPerPageOptions={[10, 25, 100, { label: 'All', value: -1 }]}
            component="div"
            count={tableData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <Modal open={modalOpen} onClose={toggleModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', bgcolor: '#4b4b4b', boxShadow: 24, p: 4 }}>
          <Stack spacing={2} direction={'row'} sx={{display:'flex',flexDirection: 'row',justifyContent: 'space-between'}}>
          <Typography id="modal-modal-title" variant="h6" component="h2" color= '#fff'>{details.company_code + "00" + details.audit_Id} | {details.auditName}</Typography>
          <Typography id="modal-modal-title" color= '#fff'>{details.QuestionType}</Typography>
          </Stack>
          <Typography id="modal-modal-description" sx={{ fontSize: '12px', color: '#fff' }}>{details.CinemaName + ' ( ' + details.start_date + ' to ' + details.end_date + ' ) | ' + details.DeptName}</Typography>
          <Typography id="modal-modal-description" sx={{ fontSize: '14px', color: '#fff', fontWeight: '600', mt: 2 }}>Q. {details.question}</Typography>
          <Typography id="modal-modal-description" sx={{ fontSize: '14px', color: '#fff', fontWeight: '600', mt: 2 }}>Ans: {details.answer}</Typography>
          <Stack spacing={3} direction='row' sx={{marginTop:'3vh'}}>
            <Box>
            <a download={details.fileName} href={details.filePath}>
              <img src={details.filePath} alt='image' style={{height:'50vh'}}/>
            </a>
            </Box>
            <Divider orientation="vertical" sx={{height: 'inherit',width: '1px', backgroundColor: '#fff'}}/>
            <Box>
              <Typography id="modal-modal-description" sx={{ fontSize: '14px', mt: 1, color: '#fff' }}>Auditor: {details.AuditorName}</Typography>
              <Typography id="modal-modal-description" sx={{ fontSize: '14px', mt: 1, color: '#fff' }}>Observation: {details.Observation === '' || details.Observation === null || details.Observation === 'undefined' ? 'No Observation' : details.Observation}</Typography>
            </Box>
          </Stack>
          {details.status === "New" ?
            <Box sx={{ m: 2 }}>
              <button className='add_btn' style={{ backgroundColor: '#e3b912', color: '#fff', marginLeft: '1vh', border: '1px solid #e3b912', height: '31px', paddingTop: 0 }} onClick={() => handleSubmit('Approved & Forwarded')}><BsCheckCircle /> Approve & Forward</button>
              <button className='add_btn' style={{ backgroundColor: '#7c7b7b', color: '#fff', marginLeft: '1vh', border: '1px solid #e3b912', height: '31px', paddingTop: 0 }} onClick={() => handleSubmit('Rejected')}><BsArrowLeft /> Reject</button>
            </Box>
            : null}
        </Box>
      </Modal>
    </Box>
  )
}

export default ActionRequired;
