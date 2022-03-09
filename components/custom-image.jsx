import React from 'react'
import Image from 'next/image'
import Avatar from '@mui/material/Avatar'

const CustomImage = ({ variant, style, src, alt, props }) => {
    return (
        <Avatar variant={variant} sx={{...styles, ...style}} {...props} >
            <Image src={src} alt={alt} quality="100" placeholder="blur"/>
        </Avatar>
    )
}

export default CustomImage

const styles = {
    backgroundColor: "transparent",
}