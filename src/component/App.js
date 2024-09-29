import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setCategories } from '../store/actions/categoryActions';
import { setProducts, filterProducts, setLoading, setHasMore, resetProducts } from '../store/actions/productActions';
import CategorySelect from './CategorySelect';
import SearchInput from './SearcInput';
import ProductCard from './ProductCard';

const App = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { categories } = useSelector(state => state.categories);
    const { filteredProducts, loading, hasMore } = useSelector(state => state.products);
    const [selectedCategory, setSelectedCategory] = useState(new URLSearchParams(location.search).get('category') || '');
    const [searchQuery, setSearchQuery] = useState(new URLSearchParams(location.search).get('search') || '');
    const [page, setPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProducts(selectedCategory, page);
    }, [selectedCategory, page]);

    useEffect(() => {
        const params = new URLSearchParams();
        if (selectedCategory) params.append('category', selectedCategory);
        if (searchQuery) params.append('search', searchQuery);
        navigate({ search: params.toString() });
    }, [selectedCategory, searchQuery]);

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products/categories');
            const data = await response.json();
            dispatch(setCategories(data));
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProducts = async (category, page) => {
        if (loading || !hasMore) return;
        dispatch(setLoading(true));

        try {
            let url = `https://fakestoreapi.com/products?limit=${pageSize}&skip=${(page - 1) * pageSize}`;
            if (category) {
                url = `https://fakestoreapi.com/products/category/${category}?limit=${pageSize}&skip=${(page - 1) * pageSize}`;
            }

            const response = await fetch(url);
            const data = await response.json();

            if (data.length === 0) {
                dispatch(setHasMore(false));
            } else {
                dispatch(setProducts(data));
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        dispatch(resetProducts());
        setPage(1);
        dispatch(setHasMore(true));
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        dispatch(filterProducts(query));
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        fetchProducts(selectedCategory, newPage);
    };

    const totalPages = Math.ceil(filteredProducts.length / pageSize);

    return (
        <div className="app-container">
            <h1>Product </h1>
            <CategorySelect categories={categories} onChange={handleCategoryChange} selectedCategory={selectedCategory} />
            <SearchInput onSearch={handleSearch} searchQuery={searchQuery} />

            <div className="products-container">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                {filteredProducts.length === 0 && <p>No products found.</p>}
            </div>

            {/* Pagination Controls */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i} onClick={() => handlePageChange(i + 1)}>
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default App;
