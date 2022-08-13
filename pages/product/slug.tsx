import { Button, Chip, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ShopLayout } from "../../components/layouts";
import { ProductSlideShow, SizeSelector } from "../../components/products";
import { ItemCounter } from "../../components/ui";
import { initialData } from "../../database/products";

const product = initialData.products[0];

const ProductPage = () => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          {/* slideshow */}
          <ProductSlideShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          {/* titulos */}
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography
              variant="subtitle1"
              component="h2"
              sx={{ marginBottom: 1 }}
            >
              ${product.price}
            </Typography>
          </Box>
          {/* Cantidad */}
          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle2">Cantidad</Typography>
            <ItemCounter />
            <SizeSelector
              sizes={product.sizes}
              selectedSize={product.sizes[0]}
            />
          </Box>
          {/* agregar al carrito
           */}
          <Button
            className="circular-btn"
            variant="contained"
            color="secondary"
            fullWidth
          >
            Agregar al carrito
          </Button>
          {/* <Chip label="No hay disponibles" color="error" /> */}
          {/* descripcion */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2">Descripción</Typography>
            <Typography variant="body2">{product.description}</Typography>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default ProductPage;
