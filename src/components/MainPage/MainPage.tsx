import {useEffect, useState} from 'react';
import {currentDate, password, url} from '../../config/apiParams.ts';
import md5 from 'md5';
import {useFetchProductList} from '../../hooks/useFetchProductList.ts';
import {ProductList} from '../ProductList/ProductList.tsx';
import {ResponseSchema} from '../../types/types.ts';
import Pagination from '../Pagination/Pagination.tsx';
import {Filters} from '../Filters/Filter.tsx';

const MainPage = () => {

    const [idList, setIdList] = useState<ResponseSchema>([]);
    const [productList, setProductList] = useState<ResponseSchema>();

    // Пагинация

    const [currentPage, setCurrentPage] = useState(1)
    const indexOfLastItem = currentPage * 50;
    const indexOfFirstItem = indexOfLastItem - 50;

    // Запрос первоначального списка

    useEffect(() => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth': md5(`${password}_${currentDate}`)
            },
            body: JSON.stringify( {
                'action': 'get_ids',
                'params': { 'offset': 0, 'limit': 100 },
            })
        })
            .then(response => response.json())
            .then(response => setIdList(response))
    }, [])

    useFetchProductList(idList.result, setProductList);
    const currentItems = productList?.result.slice(indexOfFirstItem, indexOfLastItem);

    if (!productList) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <h1>Valantis</h1>
            <Filters setProductList={setProductList}/>
            <ProductList productList={currentItems}/>
            <Pagination page={currentPage} setPage={setCurrentPage}/>
        </div>
    );
};

export default MainPage;