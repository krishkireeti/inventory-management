import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
    id: number;
    name: string;
    value: string;
    price: string;
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
            const index = state.products.findIndex((p) => p.id === updatedProduct.id);
            if (index === -1) {
                console.error(`Product with id ${updatedProduct.id} not found.`);
                return;
            }
            state.products[index] = updatedProduct;
            state.stats = calculateStats(state.products);
        },
        deleteProduct(state, action: PayloadAction<number>) {
            const productId = action.payload;
            const filteredProducts = state.products.filter((p) => p.id !== productId);
            if (filteredProducts.length === state.products.length) {
                console.error(`Product with id ${productId} not found.`);
                return;
            }
            state.products = filteredProducts;
            state.stats = calculateStats(state.products);
        },
        disableProduct(state, action: PayloadAction<number>) {
            const productId = action.payload;
            const index = state.products.findIndex((p) => p.id === productId);
            if (index === -1) {
                console.error(`Product with id ${productId} not found.`);
                return;
            }
            state.products[index] = { ...state.products[index], disabled: true };
            state.stats = calculateStats(state.products);
        },
    },
});

function calculateStats(products: Product[]): Stats {
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, p) => {
        const numericValue = typeof p.value === "string"
            ? parseFloat(p.value.replace('$', ''))
            : p.value;

        return isNaN(numericValue) ? sum : sum + numericValue;
    }, 0);

    console.log("Total Value:", totalValue);

    const outOfStock = products.filter((p) => p.quantity === 0).length;
    const categories = new Set(products.map((p) => p.category)).size;

    return { totalProducts, totalValue, outOfStock, categories };
}

export const { setProducts, updateProduct, deleteProduct, disableProduct } =
    inventorySlice.actions;

export default inventorySlice.reducer;