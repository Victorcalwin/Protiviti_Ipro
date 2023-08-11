import React, { useState, useEffect, useContext } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from './AppContext';
import { FaPowerOff, FaUserAlt } from "react-icons/fa";
import ApiCall from '../services/ApiCall';
import AuthDetails from '../services/AuthDetails';

const Navbar = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
        localStorage.clear();
        //navigate('/');
        window.location.href = '/';
    }
    const userId = AuthDetails.getUserId()
    const location = useLocation(); // once ready it returns the 'window.location' object
    const [url, setUrl] = useState(null);
    const [newNotification, seNewNotification] = useState(false);
    useEffect(() => {
        setUrl(location.pathname);
        ApiCall.getRequiredActionData({ userId })
            .then((result) => {
                if (result && Object.keys(result).length > 0) {
                    if(result.criticalCount > 0 || result.ultraCriticalCount > 0){
                        seNewNotification(true)
                    }
                }
            })
    }, [location]);
    const { userDataProvider } = useContext(AppContext);
    const userData = JSON.parse(localStorage.getItem('userData'));
    console.log(newNotification,"newNotification")
    return (
        <div style={{ position: 'sticky', top: '0', zIndex: '11', marginTop: '-24px' }}>
            <div style={{ width: '100%', height: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#2F2D2E', }}>
                <div>
                    <NavLink to='/cinema' style={{ textDecoration: 'none' }}><img style={{ marginLeft: '20px',width:'80px' }} src="pvr.png" alt="" /></NavLink>

                </div>
                <div className='abcd'>
                    <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                        {/* {(userData?.role_id ? <><NavLink to='/Home' style={{ textDecoration: 'none'}}><li style={{ paddingLeft: '20px',color:'#373737',fontWeight:'500' }}>Home</li></NavLink></> : null)} */}
                        {/* <p style={{marginTop:'15px',marginLeft:'10px',color:'#e3b912'}}> |&nbsp;&nbsp;&nbsp;</p> */}

                        {(userData?.role_id == 1) ? (<>
                            <NavLink to='/cinema' style={{ textDecoration: 'none' }}><li className={url === "/cinema" ?"underlineactive" : "underline"}>Cinemas</li></NavLink>
                            <p style={{ marginTop: '15px', marginLeft: '10px', color: '#fff' }}> |&nbsp;&nbsp;&nbsp;</p>
                            <NavLink to='/department' style={{ textDecoration: 'none' }}><li className={url === "/department" ? "underlineactive" : "underline"} >Departments</li></NavLink>
                            <p style={{ marginTop: '15px', marginLeft: '10px', color: '#fff' }}> |&nbsp;&nbsp;&nbsp;</p>
                            <NavLink to='/questions' style={{ textDecoration: 'none' }}><li className={url === "/questions" ?"underlineactive" : "underline"} >Questions</li></NavLink>
                            <p style={{ marginTop: '15px', marginLeft: '10px', color: '#fff' }}> |&nbsp;&nbsp;&nbsp;</p>
                            <NavLink to='/audits' style={{ textDecoration: 'none' }}><li className={url === "/audits" || url === "/deptquest" ?"underlineactive" : "underline"} >Audits</li></NavLink>
                            <p style={{ marginTop: '15px', marginLeft: '10px', color: '#fff' }}> |&nbsp;&nbsp;&nbsp;</p>
                            <NavLink to='/Users' style={{ textDecoration: 'none' }}><li className={url === "/Users" ?"underlineactive" : "underline"} >Users</li></NavLink>
                            <p style={{ marginTop: '15px', marginLeft: '10px', color: '#fff' }}> |&nbsp;&nbsp;&nbsp;</p>
                            <NavLink to='/calender' style={{ textDecoration: 'none' }}><li className={url === "/calender" ?"underlineactive" : "underline"} >Calender</li></NavLink>
                            {/* <NavLink to='/mapping' style={{textDecoration:'none',color:'#00A2B8'}}><li style={{paddingLeft:'20px'}}>Mapping</li></NavLink>  */}
                            {/* <NavLink to='/deptquest' style={{textDecoration:'none',color:'#00A2B8'}}><li style={{paddingLeft:'20px'}}>QuesDept</li></NavLink>  */}
                        </>) : null}
                        {((userData?.role_id && (userData?.role_id != 1 && userData?.role_id != 5))) ? (<>
                            <NavLink to='/cinema' style={{ textDecoration: 'none' }}><li className={url === "/cinema" ?"underlineactive" : "underline"}>Cinemas</li></NavLink>
                            <p style={{ marginTop: '15px', marginLeft: '10px', color: '#fff' }}> |&nbsp;&nbsp;&nbsp;</p>
                            <NavLink to='/audits' style={{ textDecoration: 'none' }}><li className={url === "/audits" || url === "/deptquest" || url === "/Editaudits" ?"underlineactive" : "underline"}>Audits</li></NavLink>
                            <p style={{ marginTop: '15px', marginLeft: '10px', color: '#fff' }}> |&nbsp;&nbsp;&nbsp;</p>
                            <NavLink to='/calender' style={{ textDecoration: 'none' }}><li className={url === "/calender" ?"underlineactive" : "underline"}>Calender</li></NavLink>
                        </>) : null}
                        {(userData?.role_id == 5) ? (<>
                            <NavLink to='/department' style={{ textDecoration: 'none' }}><li className={url === "/department" ? "underlineactive" : "underline"}>Departments</li></NavLink>
                            <p style={{ marginTop: '15px', marginLeft: '10px', color: '#fff' }}> |&nbsp;&nbsp;&nbsp;</p>
                            <NavLink to='/questions' style={{ textDecoration: 'none' }}><li className={url === "/questions" ?"underlineactive" : "underline"} >Questions</li></NavLink>
                            <p style={{ marginTop: '15px', marginLeft: '10px', color: '#fff' }}> |&nbsp;&nbsp;&nbsp;</p>
                            <NavLink to='/audits' style={{ textDecoration: 'none' }}><li className={url === "/audits" || url === "/deptquest" ?"underlineactive" : "underline"}>Audits</li></NavLink>
                            <p style={{ marginTop: '15px', marginLeft: '10px', color: '#fff' }}> |&nbsp;&nbsp;&nbsp;</p>
                            <NavLink to='/calender' style={{ textDecoration: 'none' }}><li className={url === "/calender" ?"underlineactive" : "underline"} >Calender</li></NavLink>
                            <p style={{ marginTop: '15px', marginLeft: '10px', color: '#D1D1D1' }}> |&nbsp;&nbsp;&nbsp;</p>
                            <NavLink to='/action-required' style={{ textDecoration: 'none' }}><li className={url === "/action-required" ? "underlineactive" : "underline"} >Immediate Action Required</li></NavLink>
                        </>) : null}
                    </ul>
                </div>
                <div>
                    {userData?.role_id ? <div style={{ display: 'flex', marginTop: '12px' }}>
                        <div style={{ display: 'flex', marginTop: '2px', fontFamily: 'Poppins', fontStyle: 'normal', fontSize: 14, color: '#3C3D3E' }}>
                            <FaUserAlt size={20} color='#fff' />
                            <p style={{ marginLeft: '10px',color:'#fff' }}>{userData.first_name + " " + userData.last_name}</p>
                        </div>
                        <NavLink to='/' style={{ textDecoration: 'none' }}><li style={{ paddingLeft: '20px', listStyle: 'none', marginRight: '30px', color: '#373737' }} onClick={() => logout()}><FaPowerOff size={20} color='#fff' /></li></NavLink>
                    </div> : null}
                </div>
            </div>
        </div>
    )
}

export default Navbar;
