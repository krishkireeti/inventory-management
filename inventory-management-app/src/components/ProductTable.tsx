import React from "react";
import {
    Table,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Paper,
    Button,
} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditProductModal from "./EditProductModal";
import { useDispatch, useSelector } from "react-redux";
import {
    updateProduct,
    deleteProduct,
    disableProduct,
} from "../redux/slices/inventorySlice";
import { ProductTableProps, Product } from "./product.types";

function ProductTable({ products, isAdmin }: ProductTableProps) {
    const dispatch = useDispatch();
    const [editProduct, setEditProduct] = React.useState<Product | null>(null);

    const handleEdit = (product: Product) => {
        setEditProduct(product);
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteProduct(id));
        }
    };

    const handleDisable = (id: number) => {
        dispatch(disableProduct(id));
    };

    const handleSave = (updatedProduct: Product) => {
        dispatch(updateProduct(updatedProduct));
        setEditProduct(null); // Close the modal after saving
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <thead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        {isAdmin && <TableCell>Actions</TableCell>}
                    </TableRow>
                </thead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow
                            key={product.id}
                            style={{
                                opacity: product.disabled ? 0.5 : 1,
                                textDecoration: product.disabled ? "line-through" : "none",
                            }}
                        >
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            {isAdmin && (
                                <TableCell>
                                    <Button
                                        color="primary"
                                        onClick={() => handleEdit(product)}
                                        disabled={product.disabled}
                                    >
                                        <CreateIcon />
                                    </Button>
                                    <Button
                                        color="error"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                    <Button
                                        color="secondary"
                                        onClick={() => handleDisable(product.id)}
                                    >
                                        <VisibilityIcon />
                                    </Button>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {editProduct && (
                <EditProductModal
                    product={editProduct}
                    onClose={() => setEditProduct(null)}
                    onSave={handleSave}
                />
            )}
        </TableContainer>
    );
}

export default ProductTable;
