import React from 'react';
import { Route,Routes } from 'react-router-dom';

import Cinema from '../components/Cinema';
import Audit from '../components/Audit';
import DeptQuestion from '../components/DeptQuestion';
import AuditCalender from '../components/AuditCalender'
import Page404 from '../components/page404';
import Navbar from '../components/Navbar';
const PmoRoute = ({...rest }) => {
    return (
        <>
        <Navbar />
        <Routes>
          <Route path='/cinema' element={<Cinema />} />
          <Route path='/audits' element={<Audit />} />
          <Route path='/deptquest' element={<DeptQuestion />} />
          <Route path='/calender' element={<AuditCalender />} />
          <Route path='*' element={<Page404 />} />
          </Routes>
        </>
    );
  };
  
  export default PmoRoute;