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
import EditProductModal from "./EditProductModal";
import { useDispatch } from "react-redux";
import { updateProduct, deleteProduct, disableProduct } from "../redux/slices/inventorySlice";
import { ProductTableProps, Product } from "./product.types";


function ProductTable({ products, isAdmin }: ProductTableProps) {
    const dispatch = useDispatch();
    const [editProduct, setEditProduct] = React.useState<Product | null>(null);

    const handleEdit = (product: Product) => {
        setEditProduct(product);
    };

    const handleDelete = (id: number) => {
        dispatch(deleteProduct(id));
    };

    const handleDisable = (id: number) => {
        dispatch(disableProduct(id));
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    {isAdmin && <TableCell>Actions</TableCell>}
                </TableRow>
                <TableBody>
                    {products.map(product => (
                        <TableRow
                            key={product.id}
                            style={{
                                opacity: product.disabled ? 0.5 : 1,
                                textDecoration: product.disabled ? "line-through" : "none",
                            }}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            {isAdmin && (
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleEdit(product)}
                                        disabled={product.disabled}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDisable(product.id)}
                                    >
                                        Disable
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
                    onSave={(updatedProduct) => dispatch(updateProduct(updatedProduct))}
                />
            )}
        </TableContainer>
    );
}

export default ProductTable;