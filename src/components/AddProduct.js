import React, {useCallback, useMemo, useState} from "react";
import {addProduct, useProducts} from "../hooks/useProducts";


export  default function AddProduct() {
    const { products } = useProducts();
    const emptyProduct = useMemo(() => ({
        id: products.length + 1,
        name: '',
        price: ''
    }), [products])

    const [product, setProduct] = useState(emptyProduct);
    const [disabled, setDisabled] = useState(true);

    const handleFieldUpdate = useCallback(function (e) {
        const element = e.target;
        const value = element.type === 'number' ? Number(element.value) : element.value;
        const nextProduct = {...product, [element.name]: value};

        setProduct(nextProduct);
        setDisabled(!nextProduct.name || !nextProduct.price);
    }, [product])

    function handleAddProduct()  {
        addProduct(products, product)
        // setProduct({...emptyProduct, id: emptyProduct.id + 1 })
        setProduct(emptyProduct)
    }

    return(
        <div className="product-form">
            <input
                type="text"
                name="name"
                placeholder="Name"
                autoFocus
                value={product.name}
                onChange={handleFieldUpdate}/>
            <input
                type="number"
                name="price"
                min="1"
                value={product.price}
                placeholder="Price"
                onChange={handleFieldUpdate}/>
            <button onClick={handleAddProduct} disabled={disabled}>Add</button>
        </div>
    );
}