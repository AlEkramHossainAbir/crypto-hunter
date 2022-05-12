import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryptoContext';

const useStyles = makeStyles(() => ({
    carousel: {
        height: '50%',
        display: 'flex',
        alignItems: 'center'

    },
    carouselItems: {
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        cursor:'pointer',
        textTransform:'uppercase',
        color:'white'
    },
}))

export const numberWithCommas = (x) =>{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
    const [trending, setTrending] = useState([])

    const classes = useStyles()

    const { currency,symbol } = CryptoState()


    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency))
        setTrending(data)
    }

    useEffect(() => {
        fetchTrendingCoins();
    }, [currency])

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        }
    };

    const items = trending.map((coin) => {
        let profit = coin?.price_change_percentage_24h >= 0;
        console.log(coin)
        return (
            <Link
                className={classes.carouselItems}
                to={`/coins/${coin.id}`}>
                <img src={coin?.image}
                    alt={coin.name}
                    height="80"
                    style={{ marginBottom: 10 }}

                />
                <span>
                    {coin.symbol}
                    &nbsp;
                    <span style={{ color: "red" }}>
                        {profit && "+"}
                        {coin?.market_cap_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <span style={{ fontSize: 22, fontWeight: 500 }}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>

            </Link>
        )
    })

    return (
        <div className={classes.carousel}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                items={items}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
            />
        </div>
    );
};

export default Carousel;