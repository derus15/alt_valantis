import md5 from 'md5';
import {useEffect} from 'react';
import {currentDate, password, url} from '../config/apiParams.ts';

export const useFetchProductList = (idList, setProductList) => {

    // принимает id и состояние списка товаров. Запрашивает новые поля, обновляя страницу MainPage

    useEffect(() => {
        if (idList) {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth': md5(`${password}_${currentDate}`)
                },
                body: JSON.stringify( {
                    'action': 'get_items',
                    'params': {'ids': idList},
                })
            })
                .then(response => response.json())
                .then(response => setProductList(response))
        }

    }, [idList])
}