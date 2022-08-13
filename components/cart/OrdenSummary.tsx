import { Divider, Grid, Typography } from "@mui/material";

export const OrdenSummary = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>3 items</Typography>
      </Grid>
      <Divider />
      {/* subtotal */}
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>$155</Typography>
      </Grid>
      {/* impuestos */}
      <Grid item xs={6}>
        <Typography>Impuestos (19%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>$15</Typography>
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
        <Typography variant="subtitle1">$160</Typography>
      </Grid>
    </Grid>
  );
};
