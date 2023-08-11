import React, { useEffect, useState, useContext } from "react";
import { FaEnvelope, FaUserLock, FaEyeSlash } from "react-icons/fa";
import ApiCall from '../services/ApiCall';
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";
import { Box, Typography, Stack, Button } from "@mui/material";
import Carousel from 'react-material-ui-carousel';
import workflow from '../PDF/IProEdge PVR Workflow.pdf'

const CarouselArea = () => {
    let items = [
        { name: "/login-1.png" },
        { name: "/login-2.png" },
        { name: "/login-3.png" }
    ]

    return (
        <Box sx={{width: '73%'}}>
            <img src="/Protiviti Logo-1.png" alt="" style={{ position: "absolute", left: "2rem", top: "2.2rem", height: '45px', zIndex: "3" }} />
            <Typography sx={{ position: "absolute", left: "8rem", top: "1.9rem", zIndex: "3", fontSize: '30px', color: '#ffffff', fontWeight: '100' }}>&#124;</Typography>
            <img src="/Group-16243.svg" alt="" style={{ position: "absolute", left: "9rem", top: "2.4rem", height: "36px", zIndex: "3" }} />
            <Carousel navButtonsAlwaysVisible={true} fullHeightHover={true} indicatorIconButtonProps={{ style: { color: '#000', zIndex: '1' } }}
                indicatorContainerProps={{ style: { position: 'absolute', Index: "3", bottom: 30 } }}
                activeIndicatorIconButtonProps={{ style: { color: '#fff' } }}
                navButtonsProps={{ style: { margin: '0 1.7rem', borderRadius: '0', height: '30px', width: '21px' } }}
                PrevIcon={<img src="/Group-16245.svg" style={{ height:'8vh', width:'5vh' }} />}
                NextIcon={<img src="/Group-16244.svg" style={{ height:'8vh', width:'5vh', float :"right" }} />}
            >
                {items.map((item, i) => <Box key={i} sx={{ height: '100vh', marginTop: '0px' }}><img src={item.name} alt="login" style={{ height: '100%', width: '100%' }} /></Box>)}
            </Carousel>
        </Box>
    )
}

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState("");
    const { setUserDataProvider } = useContext(AppContext)
    const userData = JSON.parse(localStorage.getItem('userData'));
    const isLoggedIn = userData ? true : false
    const navigate = useNavigate();

    useEffect(() => {
        console.log(isLoggedIn, 'isLoggedIn')
        if (isLoggedIn) {
            navigate('/audits');
        }
    }, [isLoggedIn])

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handlingSignin();
        }
    };

    const handleOpenPDF = () => {
        window.open(workflow, '_blank');
      };

    const handlingSignin = async () => {
        try {
            let data = await ApiCall.login({ email, password });
            if (data?.userData?.id) {
                localStorage.setItem("token", data.token)
                localStorage.setItem("userData", JSON.stringify(data.userData));
                await setUserDataProvider(data.userData);
                navigate('/audits');
            }
            else {
                setLoginError(data.message);
            }
        }
        catch (error) {
            if (error.response.status == '422' && error?.response?.data?.error) {
                setLoginError(error?.response?.data?.error[0]?.message)
            }
            else {
                setLoginError(error);
            }
        }
    };
    return (
        <Box sx={{}}>
            <CarouselArea />
            <Box className='Login-form'>
                <Stack spacing={6} direction={'column'} sx={{ alignItems: 'center' }}>
                    <button
                        onClick={handleOpenPDF}
                        style={{
                            position: 'fixed',
                            top: '10px',
                            right: '10px',
                            zIndex: '9999',
                            fontFamily: 'poppins',
                            fontSize: '12px',
                            background: 'none',
                            border: 'none',
                            color: '#fff',
                        }}
                    >
                        Click Here to View Applicaiton workflow
                    </button>
                    <Box className='pvr-logo' />
                    <div class="input-icons">
                        <div
                        style={{
                            display: 'flex',
                            marginTop: "20px",
                            border: "none",
                            borderRadius: "10px",
                            width: "350px",
                            height: "45px",
                            textAlign: "center",
                            background: "#dedede",
                            shadow: "0px 0px 9px rgba(0, 0, 0, 0.1)",
                            color: "white"
                        }}>
                            <i class="fa fa-envelope icon" style={{ paddingTop: "16px", paddingLeft: "10px", color: 'black' }}></i>
                            <input
                            className="focusinput"
                             type="text"
                                placeholder='email'
                                style={{
                                    border: 'none',
                                    boxDecorationBreak: 'true',
                                    borderRadius: "10px",
                                    width: "320px",
                                    height: "45px",
                                    textAlign: "center",
                                    background: "#dedede",
                                    color: "#000",
                                    fontFamily: 'poppins'
                                }}
                                onKeyDown={handleKeyDown} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                     <div
                     style={{
                        display: 'flex',
                        marginTop: "20px",
                        border: "none",
                        borderRadius: "10px",
                        width: "350px",
                        height: "45px",
                        textAlign: "center",
                        background: "#dedede",
                        shadow: "0px 0px 9px rgba(0, 0, 0, 0.1)",
                        color: "white"
                    }}>
                     <i class="fa fa-lock icon" style={{ paddingTop: "16px", paddingLeft: "15px", color: 'black' }}></i>
                    <input
                        type='password'
                        className="focusinput"
                        placeholder='password'
                        style={{
                            border: 'none',
                            boxDecorationBreak: 'true',
                            borderRadius: "10px",
                            width: "320px",
                            height: "45px",
                            textAlign: "center",
                            background: "#dedede",
                            color: "#000",
                            fontFamily: 'poppins'
                        }} onKeyDown={handleKeyDown} onChange={(e) => setPassword(e.target.value)} />
                     </div>
                </div>
                    <Box>
                        {loginError ? <p className="err"> {loginError} </p> : null}
                        <Button className="btn-2" sx={{ borderRadius: '10px', background: '#FECE0C', width: '350px', height: '45px', color: 'black' }} onClick={handlingSignin}>Login</Button>
                    </Box>
                </Stack>
            </Box>
        </Box>
    )
}

export default Login