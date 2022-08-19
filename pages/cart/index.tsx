import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { CardList, OrdenSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";
import { RootState } from "../../store";

const CartPage = () => {
  const { numberOfItems } = useSelector((state: RootState) => state.cart);
  const { push } = useRouter();

  useEffect(() => {
    if (numberOfItems === 0) {
      push("/cart/empty");
    }
  }, [numberOfItems, push]);

  return (
    <ShopLayout
      title="Carrito de compras"
      pageDescription="Carrito de compras de la tienda"
    >
      <Typography variant="h1" component="h1">
        Carrito de compras
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          {/* card list */}
          <CardList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          {/* cart */}
          <Card className="summary-cart">
            <CardContent>
              <Typography variant="h2" sx={{ marginBottom: 1 }}>
                Resumen del carrito
              </Typography>
              <Divider sx={{ my: 1 }} />
              <OrdenSummary />
              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;
