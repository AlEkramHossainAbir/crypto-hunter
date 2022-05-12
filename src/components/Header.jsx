import { AppBar, Container, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import { CryptoState } from '../CryptoContext';


const useStyles = makeStyles(() => ({
    title: {
        flex: 1,
        color: 'gold',
        fontFamily: "Montserrat",
        fontWeight: "bold",
        cursor: 'pointer'

    },

}))
const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#fff",
        },
        type: 'dark',
    },

});
const Header = ({name}) => {
    const classes = useStyles()

    const { currency, setCurrency } = CryptoState()

    let navigate = useNavigate();

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color='transparent' position='static'>
                <Container>

                    <Toolbar>
                        <Typography
                            variant="h6"
                            className={classes.title}
                            onClick={() => navigate(`/`)}>Crypto Hunter</Typography>
                        <Select
                            variant='outlined'
                            style={{
                                width: 100,
                                height: 40,
                                marginRight: 15,
                            }}
                            value={currency}
                            onChange={(e) => { setCurrency(e.target.value) }}
                        >
                            <MenuItem value={'USD'}>USD</MenuItem>
                            <MenuItem value={"INR"}>INR</MenuItem>
                            <MenuItem value={"BDT"}>BDT</MenuItem>
                        </Select>
                       
                    </Toolbar>
                </Container>

            </AppBar>
        </ThemeProvider>
    );
};

export default Header;