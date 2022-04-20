import React from 'react'
import Image from 'next/image'
import Avatar from '@mui/material/Avatar'
import AccountCircle from '@mui/icons-material/AccountCircle'

const CustomImage = ({ variant, style, src, alt, props, width, height, noBlur }) => {
    return (
        <Avatar variant={variant} sx={{...styles.avatar, ...style}} {...props} >
            { src && <Image src={src} alt={alt} quality="100" width={width} height={height} placeholder={() => noBlur ? "blur" : "empty"} /> }
            { !src && <AccountCircle sx={styles.icon} /> }
        </Avatar>
    )
}

export default CustomImage

const styles = {
    avatar: {
        backgroundColor: "transparent",
    },
    icon: {
        width: 90,
        height: "auto",
        color: "custom.contrastText",
    }
}