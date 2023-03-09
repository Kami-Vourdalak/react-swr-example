import {deleteProduct, useProducts} from "../hooks/useProducts";
import React from "react";

export default function Products() {
    const { products, isLoading, isError } = useProducts();

    function handleDeleteClick(product) {
        deleteProduct(products, product)
    }

    if(isError) return <div>Unable to fetch products.</div>

    if(isLoading) return <div>Loading products...</div>

    return (
        products.map((product) => (
            <div key={product.id} className="product-item">
                <div>{product.name}</div>
                <div>${product.price}</div>
                <button type="button" onClick={() => handleDeleteClick(product)}>delete</button>
            </div>
        ))
    );
}