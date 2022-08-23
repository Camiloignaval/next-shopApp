import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { AuthLayout } from "../../components/layouts";
import { useRegisterMutation } from "../../store/RTKQuery/authApi";
import { validations } from "../../utils";

type FormData = {
  email: string;
  password: string;
  name: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const [useRegister, registerState] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const destination = useMemo(
    () => router.query?.p?.toString() || "/",
    [router]
  );

  useEffect(() => {
    registerState.isSuccess && router.replace(destination);
  }, [registerState.isSuccess]);

  const onRegisterUser = async ({ email, password, name }: FormData) => {
    useRegister({ email, password, name });
  };

  return (
    <AuthLayout title="Iniciar sesión">
      <form onSubmit={handleSubmit(onRegisterUser)}>
        <Box justifyItems="center" sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Crear cuenta
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nombre Completo"
                variant="standard"
                fullWidth
                {...register("name", {
                  required: "Este campo es requerido",
                  minLength: {
                    value: 2,
                    message: "Nombre debe tener minimo 2 caracteres",
                  },
                })}
                error={!!errors.name}
                helperText={errors?.name?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Correo"
                variant="standard"
                fullWidth
                {...register("email", {
                  required: "Este campo es requerido",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors?.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="standard"
                fullWidth
                {...register("password", {
                  required: "Este campo es requerido",
                  minLength: {
                    value: 6,
                    message: "Contraseña debe tener minimo 6 caracteres",
                  },
                })}
                error={!!errors.password}
                helperText={errors?.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={registerState.isLoading}
                className="circular-btn"
                color="secondary"
                fullWidth
                size="large"
                sx={{ marginTop: 5 }}
                type="submit"
              >
                Registrarse
              </Button>
            </Grid>
            <Grid
              marginTop={2}
              item
              xs={12}
              display="flex"
              justifyContent="end"
            >
              <NextLink href={`/auth/login?p=${destination}`} passHref>
                <Link underline="always">Ya tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
