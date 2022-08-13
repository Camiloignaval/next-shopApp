import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { ShopLayout } from "../../components/layouts";

const AdressPage = () => {
  return (
    <ShopLayout title="Adress" pageDescription="Confirmar dirección de destino">
      <Typography variant="h1" component="h1">
        Dirección
      </Typography>
      <Grid container spacing={2} marginTop={2}>
        <Grid item xs={12} sm={6}>
          <TextField label="Nombre" variant="standard" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Apellido" variant="standard" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Direccion" variant="standard" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Direccion 2 (Opcional)"
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Codigo Postal" variant="standard" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Pais</InputLabel>
            <Select
              variant="standard"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={1}
              label="Age"
              // onChange={handleChange}
            >
              <MenuItem value={1}>Chile</MenuItem>
              <MenuItem value={2}>Paru</MenuItem>
              <MenuItem value={3}>Brasil</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Ciudad" variant="standard" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Telefono" variant="standard" fullWidth />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center" sx={{ mt: 5 }}>
        <Button color="secondary" className="circular-btn" size="large">
          Revisar pedido
        </Button>
      </Box>
    </ShopLayout>
  );
};

export default AdressPage;
