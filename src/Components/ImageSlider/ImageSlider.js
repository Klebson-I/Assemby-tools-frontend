import React, {useState} from 'react';
import {Paper} from "@mui/material";
import './style.css';
import {SingleSlide} from "./SingleSlide";


export const ImageSlider = ({images}) => {


    return <Paper elevation={3} className='container'>
        {images.map((img, index) => <SingleSlide
            src={img}
            key={index}
            imagesQuantity={images.length}
        />)}
    </Paper>
};