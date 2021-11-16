import React from 'react'
import headerpic from '../../images/header.jpg'
import { Typography } from '@mui/material'
import { Context } from "../Context/Context";
import { useContext } from "react";
const Header = () => {
    const { header } = useContext(Context)
    return (
        <div style={{ width: "100%", height: "200px", marginTop: "-30px", marginBottom: "40px" }}>
            <Typography variant='h4' style={{marginLeft:'350px', position: "absolute", top: "20%", color: "whitesmoke", fontWeight:"bold" }}>{header}</Typography>
            <img style={{ objectFit: "cover", objectPosition: "bottom" }} width="100%" height="100%" src={headerpic} alt={"header"} />
        </div>
    )
}

export default Header
