import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from "@mui/material";
import { EditProductModalProps } from "./product.types";

function EditProductModal({ product, onClose, onSave }: EditProductModalProps) {
    const [editedProduct, setEditedProduct] = useState({ ...product });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    const handleSave = () => {
        if (editedProduct.price < 0 || editedProduct.quantity < 0) {
            alert("Price and quantity must be non-negative.");
            return;
        }
        onSave(editedProduct);
        onClose();
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogContent>
                <TextField
                    label="Name"
                    name="name"
                    value={editedProduct.name}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    disabled
                />
                <TextField
                    label="Category"
                    name="category"
                    value={editedProduct.category}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    disabled
                />
                <TextField
                    label="Price"
                    name="price"
                    type="number"
                    value={editedProduct.price}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={editedProduct.quantity}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary" variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}


export default EditProductModal;