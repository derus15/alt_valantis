import style from './ProductCard.module.css';
import {Link} from 'react-router-dom';

interface ProductCardProps {
    id?: string;
    name?: string;
    brand?: string;
    price?: string;
}

export const ProductCard = ({name, brand, price, id}: ProductCardProps) => {

    return (
        <Link to={`/product/${id}`} className={style.Card}>
            <span>{name}</span>
            <span>{price}</span>
            <span>{brand || 'NoName'}</span>
        </Link>
    );
};

