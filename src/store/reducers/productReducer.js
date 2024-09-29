const initialState = {
    products: [],
    filteredProducts: [],
    loading: false,
    hasMore: true,
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, products: [...state.products, ...action.payload], filteredProducts: [...state.products, ...action.payload] };
        case 'FILTER_PRODUCTS':
            const filtered = state.products.filter(product =>
                product.title.toLowerCase().includes(action.payload.toLowerCase())
            );
            return { ...state, filteredProducts: filtered };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_HAS_MORE':
            return { ...state, hasMore: action.payload };
        case 'RESET_PRODUCTS':
            return { ...state, products: [], filteredProducts: [] };
        default:
            return state;
    }
};

export default productReducer;
