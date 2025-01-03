interface Product {
    id: number;
    name: string;
    value: number;
    price: number;
    category: string;
    quantity: number;
    disabled?: boolean;
}

interface ProductTableProps {
    products: Product[];
    isAdmin: boolean;
}

interface EditProductModalProps {
    product: Product;
    onClose: () => void;
    onSave: (product: Product) => void;
}

interface Stats {
    totalProducts: number;
    totalValue: number;
    outOfStock: number;
    categories: number;
}

interface StatsWidgetsProps {
    stats: Stats;
}