import { Divider, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { currency } from "../../utils";
import { format } from "../../utils/currency";

export const OrdenSummary = () => {
  const { numberOfItems, subTotal, tax, total } = useSelector(
    (state: RootState) => state.cart
  );
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          {numberOfItems} {numberOfItems > 1 ? "items" : "item"}
        </Typography>
      </Grid>
      <Divider />
      {/* subtotal */}
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(subTotal)}</Typography>
      </Grid>
      {/* impuestos */}
      <Grid item xs={6}>
        <Typography>Impuestos ({process.env.NEXT_PUBLIC_TAX_RATE}%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(tax)}</Typography>
      </Grid>
      {/* total */}
      <Grid item xs={6} sx={{ marginTop: 5 }}>
        <Typography variant="subtitle1">Total</Typography>
      </Grid>
      <Grid
        sx={{ marginTop: 5 }}
        item
        xs={6}
        display="flex"
        justifyContent="end"
      >
        <Typography variant="subtitle1">{currency.format(total)}</Typography>
      </Grid>
    </Grid>
  );
};
