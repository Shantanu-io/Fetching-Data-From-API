import React from 'react';

const ProductCard = ({ product }) => (
    <div className="product-card">
        <img src={product.image} alt={product.title} />
        <h4>{product.title}</h4>
        <p>${product.price}</p>
    </div>
);

export default ProductCard;
