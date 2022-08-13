import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import NextLink from "next/link";
import { AuthLayout } from "../../components/layouts";

const LoginPage = () => {
  return (
    <AuthLayout title="Iniciar sesión">
      <Box justifyItems="center" sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Iniciar sesión
            </Typography>
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
              Iniciar sesión
            </Button>
          </Grid>
          <Grid marginTop={2} item xs={12} display="flex" justifyContent="end">
            <NextLink href="/auth/register" passHref>
              <Link underline="always">No tienes cuenta?</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
