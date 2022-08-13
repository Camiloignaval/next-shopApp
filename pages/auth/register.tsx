import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import NextLink from "next/link";
import { AuthLayout } from "../../components/layouts";

const RegisterPage = () => {
  return (
    <AuthLayout title="Iniciar sesión">
      <Box justifyItems="center" sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Crear cuenta
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Nombre Completo" variant="standard" fullWidth />
          </Grid>

          <Grid item xs={12}>
            <TextField label="Correo" variant="standard" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className="circular-btn"
              color="secondary"
              fullWidth
              size="large"
              sx={{ marginTop: 5 }}
            >
              Registrarse
            </Button>
          </Grid>
          <Grid marginTop={2} item xs={12} display="flex" justifyContent="end">
            <NextLink href="/auth/login" passHref>
              <Link underline="always">Ya tienes cuenta?</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default RegisterPage;
