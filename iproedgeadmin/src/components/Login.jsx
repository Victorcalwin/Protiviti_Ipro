import React, { useEffect, useState, useContext } from "react";
import { FaEnvelope, FaUserLock, FaEyeSlash } from "react-icons/fa";
import ApiCall from '../services/ApiCall';
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";
// import backgroungImg from "../images/bg_login.png"
import logo from "../images/pvr.png"
import "./Login.css"


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
        <div style={{ backgroundColor: "black", height: "100vh", alignContent: "center" }}>
            {/* <img src={backgroungImg} style={{ height: "100vh", width: "100%", justifyContent: "center" }} /> */}
            <div style={{ position: "absolute", top: "130px", left: "36%", justifyContent: "center", alignItems: 'center', width: '360px', height: '340px', fontFamily: 'Poppins' }}>
                <img src={logo} style={{ width: "30%", height: "30%", justifySelf: "center", marginLeft: "120px" }} />
                <div class="input-icons">
                    <i class="fa fa-envelope icon" style={{ paddingTop: "33px", paddingLeft: "15px" }}></i>
                    <input type="text"
                        placeholder='email'
                        style={{
                            marginTop: "20px",
                            border: "none",
                            borderRadius: "20px",
                            width: "350px",
                            height: "45px",
                            textAlign: "center",
                            background: "rgba(222, 222, 222, 0.3)",
                            shadow: "0px 0px 9px rgba(0, 0, 0, 0.1)",
                            color: "white"
                        }}
                        onKeyDown={handleKeyDown} onChange={(e) => setEmail(e.target.value)} /> <br />
                    <i class="fa fa-lock icon" style={{ paddingTop: "20px", fontSize: '22px', paddingLeft: "15px" }}></i>
                    <input
                        type='password'
                        placeholder='password'
                        style={{
                            marginTop: "10px",
                            border: "none",
                            borderRadius: "20px",
                            width: "350px",
                            height: "45px",
                            textAlign: "center",
                            background: "rgba(222, 222, 222, 0.3)",
                            shadow: "0px 0px 9px rgba(0, 0, 0, 0.1)",
                            color: "white"
                        }} onKeyDown={handleKeyDown} onChange={(e) => setPassword(e.target.value)} /> <br />
                </div>
                <p className="err"> {loginError} </p>
                <button style={{ marginTop: "10px", border: "none", borderRadius: "20px", width: "350px", height: "45px", color: "white", backgroundColor: "#fece0c" }} onClick={handlingSignin}>LOGIN</button>
            </div>
        </div>
    )
}

export default Login