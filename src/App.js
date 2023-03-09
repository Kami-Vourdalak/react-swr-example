import React, { useState } from 'react';
import './App.css';
import AddProduct from "./components/AddProduct";
import Products from "./components/Products";
import ProductsCount from "./components/ProductsCount";


function App() {
  const [ page, setPage ] = useState('list');
  return (
    <>
      <div className="menu-bar">
        <div onClick={() => { setPage('list') }} className={page === 'list' ? 'selected' : ''}>All products</div>
        <div onClick={() => { setPage('add') }} className={page === 'add' ? 'selected' : ''}>Add product</div>
        <ProductsCount />
      </div>
      <div className="wrapper">
        { page === 'list' ? <Products/> : <AddProduct /> }
      </div>
    </>
  );
}

export default App;
