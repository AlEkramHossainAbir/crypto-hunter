import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Carousel from './Carousel';

const useStyles = makeStyles({
    banner: {
        backgroundImage: "url('./banner2.jpg')",
    },
    bannerContent: {
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 25,
        justifyContent: 'space-around'
    },
    bannerText: {
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        marginBottom:15,
    },
    bannerSubtitle:{
        fontFamily:'Montserrat'
    },
    tagLine:{
        display:'flex',
        height:"40%",
        flexDirection:"column",
        justifyContent:"center",
        textAlign:"center"
    }
})

const Banner = () => {
    const classes = useStyles()
    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                <div className={classes.tagLine}>
                    <Typography className={classes.bannerText} variant="h2">Crypto Hunter</Typography>
                    <Typography variant='subtitle'>Get all  the Info regarding your favourite
                         Crypto Currency
                    </Typography>
                </div>
                <Carousel />
            </Container>
        </div>
    );
};

export default Banner;