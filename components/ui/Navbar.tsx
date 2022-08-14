import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import NextLink from "next/link";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../../store/Slices/UISlice";
import { IoMdClose } from "react-icons/io";

export const Navbar = () => {
  const { asPath, push } = useRouter();
  const dispatch = useDispatch();
  // const pathName = useMemo(() => router.pathname, [router]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`);
    setIsSearchVisible(false);
  };

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
        <Box
          className="fadeIn"
          sx={{
            display: isSearchVisible ? "none" : { xs: "none", sm: "block" },
          }}
        >
          <NextLink href="/category/men" passHref>
            <Button color={asPath === "/category/men" ? "primary" : "info"}>
              Hombres
            </Button>
          </NextLink>
          <NextLink href="/category/women" passHref>
            <Button color={asPath === "/category/women" ? "primary" : "info"}>
              Mujeres
            </Button>
          </NextLink>
          <NextLink href="/category/kid" passHref>
            <Button color={asPath === "/category/kid" ? "primary" : "info"}>
              Niños
            </Button>
          </NextLink>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        {/* pantallas pequeñoas */}
        <IconButton
          sx={{ display: { xs: "", sm: "none" } }}
          onClick={() => dispatch(toggleMenu())}
        >
          <BiSearchAlt />
        </IconButton>
        {/* pantallas grandes */}

        {isSearchVisible ? (
          <Input
            sx={{ display: { xs: "none", sm: "flex" } }}
            autoFocus
            onKeyPress={(e) => (e.key == "Enter" ? onSearchTerm() : null)}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Buscar..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setIsSearchVisible(false)}
                  aria-label="toggle password visibility"
                >
                  <IoMdClose />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            sx={{ display: { xs: "none", sm: "flex" } }}
            onClick={() => setIsSearchVisible(true)}
            aria-label="toggle password visibility"
            className="fadeIn"
          >
            <BiSearchAlt />
          </IconButton>
        )}
        <NextLink href="/cart" passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={4} color="secondary">
                <AiOutlineShoppingCart />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>
        <Button onClick={() => dispatch(toggleMenu())}>Menú</Button>
      </Toolbar>
    </AppBar>
  );
};
