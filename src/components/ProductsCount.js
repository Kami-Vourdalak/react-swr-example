import React from "react";
import {useProducts} from "../hooks/useProducts";
export default function ProductsCount() {
    const { products, isLoading, isError } = useProducts();

    if (isLoading || isError) return null

    return <article className="counter">{ products.length } products</article>
}