import React from 'react';

const CoinInfo = ({coin}) => {
    return (
        <div>
            {console.log(coin)}
            <h1>This is {coin.id}</h1>            
        </div>
    );
};

export default CoinInfo;            