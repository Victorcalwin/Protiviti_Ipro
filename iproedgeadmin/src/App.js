import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Login from './components/Login';
import Login from './components/Login_v1';
import { useState } from 'react';
import { AppContext } from './components/AppContext';
import Page404 from './components/page404';
import AdminRoute from './roleBaseUrl/adminRoutes';
import PmoRoute from './roleBaseUrl/pmoRoutes';
import TeamLeaderRoute from './roleBaseUrl/teamLeaderRoutes';
import Protected from './components/Protected';
function App() {
  const [auditdata, setauditData] = useState({})
  const [data, setData] = useState({})
  const [comeback, setComeBack] = useState(false)
  const [userDataProvider, setUserDataProvider] = useState({})
  const userData = JSON.parse(localStorage.getItem('userData'));
  const isLoggedIn = userData ? true : false
  return (
    <div className="App">
      <AppContext.Provider value={{
        auditdata, setauditData, data, setData,
        comeback, setComeBack, setUserDataProvider, userDataProvider
      }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            {/* <Route path='/page404' element={<Page404 />} /> */}
          </Routes>
          <Protected isSignedIn={isLoggedIn}>
            {userData?.role_id == 1 ? <AdminRoute /> : null}
            {(userData?.role_id && (userData?.role_id != 1 && userData?.role_id != 5)) ? <PmoRoute /> : null}
            {userData?.role_id == 5 ? <TeamLeaderRoute /> : null}
          </Protected>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
