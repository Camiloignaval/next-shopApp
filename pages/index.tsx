import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { ShopLayout } from "../components/layouts/ShopLayout";
import { ProductList } from "../components/products";
import { initialData } from "../database/products";

const Home: NextPage = () => {
  return (
    <ShopLayout
      title="ShopApp - Home"
      pageDescription="Encuentra los mejores productos aqui"
    >
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ marginBottom: 1 }}>
        Todos los productos
      </Typography>
      <ProductList products={initialData.products as any} />
    </ShopLayout>
  );
};
export default Home;
