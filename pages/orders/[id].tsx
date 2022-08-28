import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import React, { FC } from "react";
import { CardList, OrdenSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { db, dbOrders } from "../../database";
import { IOrder } from "../../interfaces";
import { Order } from "../../models";

interface Props {
  order: IOrder;
}

const OrderPage: FC<Props> = ({ order }) => {
  const { shippingAddress: sa } = order;
  return (
    <ShopLayout
      title={`Resumen de la orden`}
      pageDescription="Resumen de orden en la tienda"
    >
      <Typography variant="h1" component="h1">
        Orden: {order?._id}
      </Typography>
      {order?.isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label="Orden ya pagada"
          variant="outlined"
          color="success"
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label="Pendiente de pago"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
        />
      )}

      <Grid container spacing={3} className="fadeIn">
        <Grid item xs={12} sm={7}>
          {/* card list */}
          <CardList products={order.orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          {/* cart */}
          <Card className="summary-cart">
            <CardContent>
              <Typography variant="h2" sx={{ marginBottom: 1 }}>
                Resumen ({order.numberOfItems}{" "}
                {order.numberOfItems === 1 ? "Producto" : "Productos"})
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent={"space-between"}>
                <Typography variant="subtitle1">
                  Dirección de entrega
                </Typography>
              </Box>
              <Typography>{sa.firstName}</Typography>
              <Typography>{sa.lastName}</Typography>
              <Typography>{sa.adress}</Typography>
              {sa.adress2 && <Typography>{sa.adress2}</Typography>}
              <Typography>{sa.city}</Typography>
              <Typography>{sa.phone}</Typography>
              <Divider sx={{ my: 1 }} />

              <OrdenSummary
                infoPrices={{
                  numberOfItems: order.numberOfItems,
                  subTotal: order.subTotal,
                  tax: order.tax,
                  total: order.total,
                }}
              />
              <Box sx={{ mt: 3, display: "flex", flexDirection: "column" }}>
                {order.isPaid ? (
                  <Chip
                    sx={{ my: 2 }}
                    label="Orden ya pagada"
                    variant="outlined"
                    color="success"
                    icon={<CreditScoreOutlined />}
                  />
                ) : (
                  <h1>Pagar</h1>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = "" } = query;

  const session: any = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    };
  }

  const order = await dbOrders.getOrderById(id.toString());
  if (!order || order.user !== session.user._id) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrderPage;
