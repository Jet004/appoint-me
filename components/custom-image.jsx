import React from 'react'
import Image from 'next/image'
import Avatar from '@mui/material/Avatar'

const CustomImage = ({ style, src, alt }) => {
    return (
        <Avatar variant="square" sx={{...styles, ...style}}>
            <Image src={src} alt={alt} quality="100" placeholder="blur"/>
        </Avatar>
    )
}

export default CustomImage

const styles = {
    backgroundColor: "transparent",
}