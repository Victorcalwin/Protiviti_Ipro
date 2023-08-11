import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';

function Role() {
    const [roleName, setRoleName] = useState("");
    // let status = {
    //     Approved: 'APPROVED',
    //     New: 'NEW',
    //     delete: 'DELETED',
    //     reject: 'REJECTED',
    // }
    // console.log(indName)

    const handleSubmit = () => {
        window.alert("New role created "+ `${roleName}`);
    };


    return (
        <>
            <div style={{ width: "100%", height: "400px", borderBottomLeftRadius: "10px",borderBottomRightRadius: "10px", boxShadow: "0 0 2px 2px grey", display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '100px' }}>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault()
                            handleSubmit(event)
                        }}
                    >
                        <input
                            type="text"
                            className="form-control "
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            placeholder='Role Name'
                            style={{ border: "1px solid grey", width: '300px' }}
                            required
                        />
                        <Button type="submit" color="primary" style={{ marginTop: '50px', marginLeft: '29%', width: '120px' }}>Submit</Button>
                    </form>
                </div>

            </div>
        </>
    )
}

export default Role;