export interface ProductInfoSchema {
    brand: string,
    price: string,
    product: string,
    id: string,
}

export interface ResponseSchema {
    result: ProductInfoSchema[],
}