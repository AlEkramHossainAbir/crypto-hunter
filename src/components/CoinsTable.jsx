import {
    Container,
    createTheme,
    LinearProgress,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    ThemeProvider,
    Typography
} from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';

const CoinsTable = () => {
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')

    const { currency } = CryptoState()

    const fetchCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency))
        setCoins(data)
        setLoading(false)
    }
    useEffect(() => {
        fetchCoins()
    }, [currency])

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: 'dark',
        },
    });
    const useStyles = makeStyles({
        tableRow: {
            minWidth: 650,
            backgroundColor: 'gold',
            fontWeight: 'bold',
            font: '25px'
        },
        row: {
            backgroundColor: "#16171a",
            cursor: 'pointer',

        }
    });
    const classes = useStyles();

    const handleSearch = () => {
        return coins.filter(coin => (
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        ))
    }

    let navigate = useNavigate();
    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <Container style={{ textAlign: 'center' }}>
                    <Typography variant="h4" style={{ margin: 13, fontFamily: 'Montserrat' }}>
                        Cryptocurrency Prices by Market Cap
                    </Typography>
                    <TextField label="Search For a Crypto Currency.. " variant="outlined"
                        style={{
                            display: 'flex',
                            flex: 1,
                            marginBottom: 20
                        }}
                        onChange={e => { setSearch(e.target.value) }}
                    />

                    <TableContainer>
                        {
                            loading ?
                                (<LinearProgress style={{ backgroundColor: 'gold' }} />) :
                                <Table>
                                    <TableHead style={{
                                        backgroundColor: '#EEBC1D',
                                    }}>
                                        <TableRow >
                                            {
                                                ["Coin", "Price", "24h Change", "Market Cap"].map(head => (
                                                    <TableCell
                                                        style={{
                                                            color: 'black',
                                                            fontWeight: '700',
                                                            fontFamily: 'Montserrat',
                                                        }}
                                                        key={head}
                                                        align={head === "Coin" ? "" : 'right'}
                                                    >
                                                        {head}
                                                    </TableCell>
                                                ))
                                            }

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {handleSearch().map(row => {
                                            const profit = row.price_change_percentage_24h > 0;
                                            return (
                                                <TableRow onClick={() => navigate(`/coins/${row.id}`)}
                                                    key={row.name}
                                                    className={classes.row}
                                                >
                                                    <TableCell 
                                                    component='th' 
                                                    scope='row'
                                                    style={{
                                                        display:'flex',
                                                        gap:15
                                                    }}
                                                    >
                                                        <img src={row?.image} 
                                                        alt={row?.name}
                                                        style={{
                                                            height:50,
                                                            marginBottom: 10,
                                                        }}
                                                        />
                                                        
                                                        {row.name}</TableCell>
                                                    {console.log(row)}
                                                    <TableCell>{profit}</TableCell>
                                                    <TableCell>{row.name}</TableCell>
                                                    <TableCell>{row.name}</TableCell>
                                                </TableRow>
                                            )
                                        })}

                                    </TableBody>
                                </Table>

                        }

                    </TableContainer>
                </Container>
            </ThemeProvider>

        </div>
    );
};

export default CoinsTable;