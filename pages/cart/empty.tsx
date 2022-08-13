import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import { Box, Link, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import NextLink from "next/link";

const EmptyPage = () => {
  return (
    <ShopLayout
      title="Carrito vacío"
      pageDescription="No hay articulos en el carrito de compras"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: "column", md: "row" } }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography>No hay articulos en el carrito de compras</Typography>
          <NextLink href="/" passHref>
            <Link color="secondary">
              <Typography variant="h4">Volver a la tienda</Typography>
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default EmptyPage;
