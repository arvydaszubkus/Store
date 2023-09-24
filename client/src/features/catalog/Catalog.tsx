import { useEffect } from "react";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const dispatch = useAppDispatch();
    const {productsLoaded, status} = useAppSelector(state => state.catalog);

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch])

    if (status.includes('pending')) return <LoadingComponent message='Loading products...' />

    return (
        <>
            <ProductList products={products} />
        </>
    )
}