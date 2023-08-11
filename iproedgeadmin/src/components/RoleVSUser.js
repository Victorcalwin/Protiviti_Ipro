import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function RoleVsUser() {
    // const [riskCategory, setRiskCategory] = useState([]);
    // const [Industrymaster, setIndustrymaster] = useState([]);
    const [userVal, setUserVal] = useState("");
    const [Roleval, setRoleVal] = useState("");
    let status = {
        Approved: 'APPROVED',
        New: 'NEW',
        delete: 'DELETED',
        reject: 'REJECTED',
    }

    let roles = [
        {ID: 1, NAME: 'Admin'},
        {ID: 2, NAME: 'Developer'},
        {ID: 3, NAME: 'HR'},
        {ID: 4, NAME: 'Consultant'}  
    ]

    let users = [
        {ID: 1, NAME: 'ALAM'},
        {ID: 2, NAME: 'Abhirup'},
        {ID: 3, NAME: 'Akshay'},
        {ID: 4, NAME: 'Narendra'}  
    ]

    

    // useEffect(() => {
    //     axios
    //         .get("http://localhost:5000/api/v1/Risk/getRickCategory")
    //         .then((res) => {
    //             setRiskCategory(res.data)
    //         })
    //         .catch((error) => { });
    //     axios
    //         .get("http://localhost:5000/api/v1/industry/")
    //         .then((res) => {
    //             setIndustrymaster(res.data)
    //         })
    //         .catch((error) => { });
    // }, []);

    console.log(Roleval, userVal)
    const handleSubmit = () => {
        window.alert(`${userVal}`+ " is mapped with "+ `${Roleval}`);
    };

    return (
        <>
            <div style={{ width: "100%", height: "400px", borderBottomLeftRadius: "10px",borderBottomRightRadius: "10px", boxShadow: "0 0 2px 2px grey", display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: "80%", display: 'flex', flexDirection: 'row', marginTop: '70px', justifyContent: 'center'  }}>
                    <Form
                        style={{width: '300px'}}
                        onSubmit={(event) => {
                            event.preventDefault()
                            handleSubmit(event)
                        }}    
                    >
                        <Form.Select
                        onChange={(e) => setRoleVal(e.target.value)}
                        required>
                            <option disabled selected value>Role</option>
                            {roles.map((item) => 
                            <option value={item.NAME} key={item.ID}>{item.NAME}</option>
                            )}
                        </Form.Select>
                        <Form.Select
                        style={{marginTop: '30px'}}
                        onChange={(e) => setUserVal(e.target.value)}
                        required>
                            <option disabled selected value>User</option>
                            {users.map((item) => 
                            <option value={item.NAME} key={item.ID}>{item.NAME}</option>
                            )}
                        </Form.Select>
                
                        <Button type="submit" color="primary" style={{ marginTop: '50px', marginLeft: '29%', width: '120px' }}>Submit</Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default RoleVsUser;