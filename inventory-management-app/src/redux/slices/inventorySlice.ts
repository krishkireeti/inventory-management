import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
    id: number;
    name: string;
    value: number;
    price: number;
    category: string;
    quantity: number;
    disabled?: boolean;
}

interface Stats {
    totalProducts: number;
    totalValue: number;
    outOfStock: number;
    categories: number;
}

interface InventoryState {
    products: Product[];
    stats: Stats;
}

const initialState: InventoryState = {
    products: [],
    stats: {
        totalProducts: 0,
        totalValue: 0,
        outOfStock: 0,
        categories: 0,
    },
};

const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
            state.stats = calculateStats(action.payload);
        },
        updateProduct(state, action: PayloadAction<Product>) {
            const updatedProduct = action.payload;
            state.products = state.products.map((p) =>
                p.id === updatedProduct.id ? updatedProduct : p
            );
            state.stats = calculateStats(state.products);
        },
        deleteProduct(state, action: PayloadAction<number>) {
            const productId = action.payload;
            state.products = state.products.filter((p) => p.id !== productId);
            state.stats = calculateStats(state.products);
        },
        disableProduct(state, action: PayloadAction<number>) {
            const productId = action.payload;
            state.products = state.products.map((p) =>
                p.id === productId ? { ...p, disabled: true } : p
            );
            state.stats = calculateStats(state.products);
        },
    }
});

function calculateStats(products: Product[]): Stats {
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const outOfStock = products.filter((p) => p.quantity === 0).length;
    const categories = new Set(products.map((p) => p.category)).size;

    return { totalProducts, totalValue, outOfStock, categories };
}

export const { setProducts, updateProduct, deleteProduct, disableProduct } =
    inventorySlice.actions;

export default inventorySlice.reducer;