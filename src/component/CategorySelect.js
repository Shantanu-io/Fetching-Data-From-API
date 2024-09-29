import React from 'react';

const CategorySelect = ({ categories, onChange, selectedCategory }) => (
    <div>
        
        <select id="category-select" onChange={onChange} value={selectedCategory}>
            <option value="">Select a category</option>
            {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
            ))}
        </select>
    </div>
);

export default CategorySelect;
