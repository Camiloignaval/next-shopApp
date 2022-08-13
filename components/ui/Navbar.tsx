import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import NextLink from "next/link";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";

export const Navbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography variant="h6">Shop |</Typography>
            <Typography sx={{ marginLeft: 0.5 }}>App</Typography>
          </Link>
        </NextLink>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <NextLink href="/category/men" passHref>
            <Button>Hombres</Button>
          </NextLink>
          <NextLink href="/category/women" passHref>
            <Button>Mujeres</Button>
          </NextLink>
          <NextLink href="/category/kid" passHref>
            <Button>Niños</Button>
          </NextLink>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton>
          <BiSearchAlt />
        </IconButton>
        <NextLink href="/cart" passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={4} color="secondary">
                <AiOutlineShoppingCart />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>
        <Button>Menú</Button>
      </Toolbar>
    </AppBar>
  );
};
