import React from 'react'

const ProgressBarDept = (props) => {
    const { status, percentage } = props;
    console.log("status", status, "percentage", percentage);
    return (
        <div style={{ display: 'flex', position: 'absolute', top: 30, right: 0 }}>
            <p style={{ position: '', marginRight: '5px', height: '5px', right: '10.5vh', top: '4.5vh', borderRadius: '25px', width: '12px', background: percentage > 0 ? status : '#A0A0A0' }} />
            <p style={{ position: '', marginRight: '5px', height: '5px', right: '8vh', top: '4.5vh', borderRadius: '25px', width: '12px', background: percentage > 20 ? status : '#A0A0A0' }} />
            <p style={{ position: '', marginRight: '5px', height: '5px', right: '5.5vh', top: '4.5vh', borderRadius: '25px', width: '12px', background: percentage > 40 ? status : '#A0A0A0' }} />
            <p style={{ position: '', marginRight: '5px', height: '5px', right: '3vh', top: '4.5vh', borderRadius: '25px', width: '12px', background: percentage > 60 ? status : '#A0A0A0' }} />
            <p style={{ position: '', marginRight: '5px', height: '5px', right: '.5vh', top: '4.5vh', borderRadius: '25px', width: '12px', background: percentage > 80 ? status : '#A0A0A0' }} />
        </div>
    )

}

export default ProgressBarDept
