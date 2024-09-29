import React from 'react';

const SearchInput = ({ onSearch, searchQuery }) => (
    <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
    />
);

export default SearchInput;
