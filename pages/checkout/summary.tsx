import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import React from "react";
import { CardList, OrdenSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";

const SummaryPage = () => {
  return (
    <ShopLayout
      title="Resumen de compras"
      pageDescription="Resumen de compra en la tienda"
    >
      <Typography variant="h1" component="h1">
        Resumen de compras
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          {/* card list */}
          <CardList />
        </Grid>
        <Grid item xs={12} sm={5}>
          {/* cart */}
          <Card className="summary-cart">
            <CardContent>
              <Typography variant="h2" sx={{ marginBottom: 1 }}>
                Resumen (3 productos)
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent={"space-between"}>
                <Typography variant="subtitle1">
                  Dirección de entrega
                </Typography>
                <NextLink href="/checkout/adress" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>
              <Typography>Camilo Valenenzuela</Typography>
              <Typography>987 Algun lugar</Typography>
              <Typography>Santiago</Typography>
              <Typography>9898</Typography>
              <Typography>+569876876</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent={"end"}>
                <NextLink href="/cart" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>
              <OrdenSummary />
              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Confirmar orden{" "}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
