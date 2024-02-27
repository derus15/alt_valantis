import {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from 'react';
import {ResponseSchema} from '../../types/types.ts';
import {currentDate, password, url} from '../../config/apiParams.ts';
import md5 from 'md5';
import {useFetchProductList} from '../../hooks/useFetchProductList.ts';

interface FilterProps {
    setProductList: Dispatch<SetStateAction<ResponseSchema>>
}

export const Filters = ({setProductList}: FilterProps) => {

    const [brandsField, setBrandsField] = useState<ResponseSchema>([]);
    const [filteredIdList, setFilteredIdList] = useState<ResponseSchema>([])

    const uniqueArray = Array.from(new Set(brandsField.result?.filter(Boolean)))

    // получаем поля для фильтра

    useEffect(() => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth': md5(`${password}_${currentDate}`)
            },
            body: JSON.stringify( {
                'action': 'get_fields',
                'params': { 'field': 'brand', 'offset': 0, 'limit': 8000 },
            })
        })
            .then(response => response.json())
            .then(response => setBrandsField(response))
    }, [])

    // меняем поле фильтра и заправшиваем данные через хук.

    const changeBrands = (e: ChangeEvent<HTMLSelectElement>) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth': md5(`${password}_${currentDate}`)
            },
            body: JSON.stringify( {
                "action": "filter",
                "params": {"brand": e.target.value}
            })
        })
            .then(response => response.json())
            .then(response => setFilteredIdList(response))
    }

    useFetchProductList(filteredIdList.result, setProductList);

    return (
        <div>
            <select
                name="brands"
                id="brands"
                onChange={(e) => changeBrands(e)}
            >
                <option value="All">Все</option>
                {uniqueArray?.map((brands) => <option key={brands} value={brands}>
                    {brands}
                </option>)}
            </select>
        </div>
    );
};
