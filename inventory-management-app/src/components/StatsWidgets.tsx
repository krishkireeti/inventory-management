import { Card, CardContent, Typography, Stack } from "@mui/material";
import { StatsWidgetsProps } from "./product.types";

function StatsWidgets({ stats }: StatsWidgetsProps) {
    const { totalProducts, totalValue, outOfStock, categories } = stats;

    const statsData = [
        { label: "Total Products", value: totalProducts },
        { label: "Total Store Value", value: `$${totalValue.toFixed(2)}` },
        { label: "Out of Stock", value: outOfStock },
        { label: "Categories", value: categories },
    ];

    return (
        <Stack direction="row" spacing={2} flexWrap="wrap">
            {statsData.map((stat, index) => (
                <Card key={index} sx={{ flex: 1, minWidth: 220 }}>
                    <CardContent>
                        <Typography variant="h6" color="primary">
                            {stat.label}
                        </Typography>
                        <Typography variant="h4">{stat.value}</Typography>
                    </CardContent>
                </Card>
            ))}
        </Stack>
    );
}

export default StatsWidgets;
