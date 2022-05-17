import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CoinInfo from '../components/CoinInfo';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';

const Coinpage = () => {

    let { id } = useParams()

    const [coin, setCoin] = useState()

    const { currency, symbol } = CryptoState()

    const fetchCoins = async () => {
        const { data } = await axios.get(SingleCoin(id))
        setCoin(data)
    }
    useEffect(() => {
        fetchCoins()
    }, [])
    console.log("coin: " + coin)

    const useStyles = makeStyles(
        {
            container: {
                display: 'flex',
                flexDirection: 'column'

            },
            sidebar: {
                width: "30%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 25,
                borderRight: "2px solid grey",

            },
            heading: {
                fontWeight: "bold",
                marginBottom: 20,
                fontFamily: "Montserrat",

            }
        }
    )

    const classes = useStyles()
    if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

    return (
        <div>
            <div className={classes.container}>
                <div className={classes.sidebar}>
                    <img src={coin.image.large} alt={coin.name} height="200" style={{ marginBottom: 20 }} />
                    <Typography variant='h3' className={classes.heading}>
                        {coin.name}
                    </Typography>
                </div>
                {/* Chart */}
                <CoinInfo coin={coin} />
            </div>
        </div>
    );
};

export default Coinpage;