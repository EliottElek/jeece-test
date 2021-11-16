import React from 'react'
import headerpic from '../../images/header.jpg'
import { Typography } from '@mui/material'
import { Context } from "../Context/Context";
import { useContext } from "react";
const styles = {
    header: {
        width: "100%",
        height: "200px",
        marginTop: "-30px",
        marginBottom: "40px",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${headerpic})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: 'bottom',
        backgroundSize: "cover"
    }
}
const Header = () => {
    const { header } = useContext(Context)
    return (
        <div style={styles.header}>
            <Typography variant='h4' style={{color: "whitesmoke", fontWeight: "bold" }}>{header}</Typography>
        </div >
    )
}

export default Header
