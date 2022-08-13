import {
  Grid,
  Link,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
  Button,
} from "@mui/material";
import NextLink from "next/link";
import { FC, useEffect, useState } from "react";
import { initialData } from "../../database/products";
import { ItemCounter } from "../ui";
import { IProduct } from "../../interfaces/products";

const productInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  editable?: boolean;
}
export const CardList: FC<Props> = ({ editable = false }) => {
  const [cardProducts, setCardProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    setCardProducts(productInCart as IProduct[]);
  }, []);

  return (
    <>
      {cardProducts.map((product) => (
        <Grid container spacing={3} key={product.slug}>
          <Grid item xs={3}>
            <NextLink href={`/product/slug`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.images[0]}`}
                    component="img"
                    sx={{ borderRadius: "5px" }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Talla: <strong>M</strong>
                {editable ? (
                  <ItemCounter />
                ) : (
                  <Typography variant="h6">1 items</Typography>
                )}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">${product.price}</Typography>
            {editable && (
              <Button variant="text" color="secondary">
                Eliminar
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
