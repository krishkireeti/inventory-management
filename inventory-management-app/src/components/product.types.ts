export interface Product {
    id: number;
    name: string;
    value: string;
    price: string;
    category: string;
    quantity: number;
    disabled?: boolean;
}

export interface ProductTableProps {
    products: Product[];
    isAdmin: boolean;
}

export interface EditProductModalProps {
    product: Product;
    onClose: () => void;
    onSave: (product: Product) => void;
}

export interface Stats {
    totalProducts: number;
    totalValue: number;
    outOfStock: number;
    categories: number;
}

export interface StatsWidgetsProps {
    stats: Stats;
}