import {Dispatch, SetStateAction} from 'react';
import style from './Pagination.module.css';

interface PaginationProps {
    page: number;
    setPage: Dispatch<SetStateAction<number>>
}

const Pagination = ({page, setPage}: PaginationProps) => {

    const incrementPage = () => {
        setPage(page => page + 1)
    }

    const decrementPage = () => {
        if (page >= 1) {
            setPage(page => page - 1)

        }
    }

    return (
        <div className={style.Container}>
            <button type='button' onClick={decrementPage}>{'<'}</button>
            <span className={style.pageCounter}>{page}</span>
            <button type='button' onClick={incrementPage}>{'>'}</button>
        </div>
    );
};

export default Pagination;