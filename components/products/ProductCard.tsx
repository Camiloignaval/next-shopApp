import {
  Card,
  CardActionArea,
  Grid,
  CardMedia,
  Box,
  Typography,
  Link,
} from "@mui/material";
import NextLink from "next/link";
import React, { FC, useMemo, useState } from "react";
import { IProduct } from "../../interfaces";

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setisHovered] = useState(false);
  const productImage = useMemo(() => {
    return isHovered
      ? `products/${product.images[1]}`
      : `products/${product.images[0]}`;
  }, [isHovered, product.images]);

  return (
    <Grid
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setisHovered(true)}
      onMouseLeave={() => setisHovered(false)}
    >
      <Card>
        <NextLink href={`/product/slug`} passHref prefetch={false}>
          <Link>
            <CardActionArea>
              <CardMedia
                className="fadeIn"
                image={productImage}
                component="img"
                alt={product.title}
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>

      <Box sx={{ mt: 1 }}>
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>${product.price}</Typography>
      </Box>
    </Grid>
  );
};
