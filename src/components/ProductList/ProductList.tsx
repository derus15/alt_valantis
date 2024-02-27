import style from './ProductList.module.css'
import {ProductCard} from '../ProductCard/ProductCard.tsx';
import {ProductInfoSchema } from '../../types/types.ts';

interface ProductListProps {
    productList: ProductInfoSchema[];
}

export const ProductList = ({productList}: ProductListProps) => {

    if (!productList) {
        return <div>Loading...</div>;
    }

    return (
        <div className={style.ProductList}>
            {productList.map((product, index) =>
                <ProductCard
                    key={index}
                    name={product.product}
                    brand={product.brand}
                    id={product.id}
                    price={product.price}
                />)}
        </div>
    );
};

