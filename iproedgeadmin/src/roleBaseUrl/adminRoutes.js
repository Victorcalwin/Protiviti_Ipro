import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Department from '../components/Department';
import Users from '../components/Users';
import Cinema from '../components/Cinema';
import Questions from '../components/Questions';
import Audit from '../components/Audit';
import Mapping from '../components/Mapping';
import AuditCalender from '../components/AuditCalender'
import DeptQuestion from '../components/DeptQuestion';
import FireSafety from '../components/FireSafety'
import Accounts from '../components/Accounts'
import Engineering from '../components/Engineering'
import FoodNBeb from '../components/FoodNBeb'
import Page404 from '../components/page404';
import Navbar from '../components/Navbar';


const AdminRoute = ({...rest }) => {
    return (
        <>
        <Navbar />
        <Routes>
        <Route path='/department' element={<Department />} />
        <Route path='/Users' element={<Users />} />
          <Route path='/cinema' element={<Cinema />} />
          <Route path='/department' element={<Department />} />
          <Route path='/questions' element={<Questions />} />
          <Route path='/mapping' element={<Mapping />} />
          <Route path='/audits' element={<Audit />} />
          <Route path='/calender' element={<AuditCalender />} />
          <Route path='/deptquest' element={<DeptQuestion />}/>
          <Route path='/deptquest/fire-safety'  element={< FireSafety/>}/>
          <Route path='/deptquest/accounts' element={< Accounts/>} />
          <Route path='/deptquest/engineering' element={<Engineering />} />
          <Route path='/deptquest/f&b' element={< FoodNBeb/>} />
          {/* <Route path='*' element={<Page404 />} /> */}
          </Routes>
        </>
    );
  };
  
  export default AdminRoute;