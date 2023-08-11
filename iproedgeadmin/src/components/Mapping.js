import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Role from './Role';
import RoleVsUser from './RoleVSUser';


function Mapping() {
    return (
        <>
            <div style={{ width: '100%', height: '85vh', backgroundColor: '#e9f3fc',marginBottom:'30px' }}><br/>
                <Container style={{width:'80%', marginTop: '30px'}}>
                    <Tabs  fill justify id="uncontrolled-tab-example" defaultActiveKey="first" style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px", boxShadow: "0 0 2px 2px grey",backgroundColor:'lightGrey', fontWeight: 'bold', fontSize: '17px', width: '100%'}}>
                        <Tab eventKey="first" title="Role" style={{backgroundColor: 'white'}}>
                            <Role/>
                        </Tab>
                        <Tab eventKey="second" title="Role VS User" style={{backgroundColor: 'white'}}>
                            <RoleVsUser />
                        </Tab>
                    </Tabs>
                </Container>
            </div>
        </>
    )
}

export default Mapping;