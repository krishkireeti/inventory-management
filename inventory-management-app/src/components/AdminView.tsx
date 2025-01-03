import React, { useState, useEffect } from "react";
import ProductTable from "./ProductTable";
import StatsWidgets from "./StatsWidgets";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../redux/slices/inventorySlice";
import axios from "axios";
import { RootState } from "../redux/store";

function AdminView() {
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.inventory.products);
    const stats = useSelector((state: RootState) => state.inventory.stats);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
                );
                dispatch(setProducts(response.data));
            } catch (error) {
                console.error("Error fetching inventory data:", error);
            }
        };

        fetchProducts();
    }, [dispatch]);


    return (
        <div>
            <StatsWidgets stats={stats} />
            <ProductTable products={products} isAdmin={true} />
        </div>
    )
}

export default AdminView;
