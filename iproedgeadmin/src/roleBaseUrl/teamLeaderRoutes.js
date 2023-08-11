import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Department from '../components/Department';
import Cinema from '../components/Cinema';
import Questions from '../components/Questions';
import Audit from '../components/Audit';
import AuditCalender from '../components/AuditCalender'
import DeptQuestion from '../components/DeptQuestion';
import FireSafety from '../components/FireSafety'
import Accounts from '../components/Accounts'
import Engineering from '../components/Engineering'
import FoodNBeb from '../components/FoodNBeb'
import Page404 from '../components/page404';
import Navbar from '../components/Navbar';
import EditAudit from '../components/EditAudit';
import ActionRequired from '../components/Pages/ActionRequired';
const TeamLeaderRoute = ({...rest }) => {
    return (
        <>
        <Navbar />
        <Routes>
        <Route path='/department' element={<Department />} />
          <Route path='/cinema' element={<Cinema />} />
          <Route path='/audits' element={<Audit />} />
          <Route path='/department' element={<Department />} />
          <Route path='/questions' element={<Questions />} />
          <Route path='/calender' element={<AuditCalender />} />
          <Route path='/deptquest' element={<DeptQuestion />}/>
          <Route path='/Editaudits' element={<EditAudit />} />
          <Route path='/deptquest/fire-safety'  element={< FireSafety/>}/>
          <Route path='/deptquest/accounts' element={< Accounts/>} />
          <Route path='/deptquest/engineering' element={<Engineering />} />
          <Route path='/deptquest/f&b' element={< FoodNBeb/>} />
          <Route path='/action-required' element={< ActionRequired/>} />
          <Route path='*' element={<Page404 />} />
          </Routes>
        </>
    );
  };
  
  export default TeamLeaderRoute;