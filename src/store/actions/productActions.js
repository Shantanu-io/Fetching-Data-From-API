export const setProducts = (products) => ({
    type: 'SET_PRODUCTS',
    payload: products,
});

export const filterProducts = (query) => ({
    type: 'FILTER_PRODUCTS',
    payload: query,
});

export const setLoading = (loading) => ({
    type: 'SET_LOADING',
    payload: loading,
});

export const setHasMore = (hasMore) => ({
    type: 'SET_HAS_MORE',
    payload: hasMore,
});

export const resetProducts = () => ({
    type: 'RESET_PRODUCTS',
});
