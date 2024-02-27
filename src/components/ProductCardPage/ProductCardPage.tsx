import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {currentDate, password, url} from '../../config/apiParams.ts';
import md5 from 'md5';
import {ResponseSchema} from '../../types/types.ts';

const ProductCardPage = () => {

    const params = useParams();
    const [currentProductInfo, setCurrentProductInfo] = useState<ResponseSchema>()

    useEffect(() => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth': md5(`${password}_${currentDate}`)
            },
            body: JSON.stringify( {
                'action': 'get_items',
                'params': { 'ids': [params.id] },
            })
        })
            .then(response => response.json())
            .then(response => setCurrentProductInfo(response))
    }, [])

    if (!currentProductInfo) {
        return <h1>Loading....</h1>
    }

    return (
        <div>
            <h1>{currentProductInfo.result[0].product}</h1>
            <h2>Цена: {currentProductInfo.result[0].price}</h2>
            <h2>{currentProductInfo.result[0].brand || 'NoName'}</h2>

        </div>
    );
};

export default ProductCardPage;