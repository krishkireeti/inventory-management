import React, { useEffect, useState } from "react";
import ProductTable from "./ProductTable";
import axios from "axios";

function UserView() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
                );
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching inventory data:", error);
            }
        };
        fetchProducts();
    }, []);

    return <ProductTable products={products} isAdmin={false} />;
}

export default UserView;
