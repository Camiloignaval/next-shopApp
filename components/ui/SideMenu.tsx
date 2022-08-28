import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { toggleMenu } from "../../store/Slices/UISlice";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import Cookies from "js-cookie";
import { signOut } from "next-auth/react";

export const SideMenu = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    ui: { sideBarIsOpen },
    auth: { isLoggedIn, user },
  } = useSelector((state: RootState) => state);
  const [searchTerm, setSearchTerm] = useState("");

  const navigateTo = (url: string) => {
    router.push(url);
    dispatch(toggleMenu());
  };

  const onSearchTerm = () => {
    if (searchTerm.length === 0) return;
    navigateTo(`/search/${searchTerm}`);
  };

  const onLogout = () => {
    // Cookies.remove("token");
    Cookies.remove("cart");
    Cookies.remove("address");
    // router.reload();
    signOut();
  };

  return (
    <Drawer
      role="presentation"
      open={sideBarIsOpen}
      anchor="right"
      onClose={() => dispatch(toggleMenu())}
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              onKeyPress={(e) => (e.key == "Enter" ? onSearchTerm() : null)}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="search"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={onSearchTerm}
                    aria-label="toggle password visibility"
                  >
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          {isLoggedIn && (
            <>
              <ListItem button>
                <ListItemIcon>
                  <AccountCircleOutlined />
                </ListItemIcon>
                <ListItemText primary={"Perfil"} />
              </ListItem>

              <ListItem button onClick={() => navigateTo("/orders/history")}>
                <ListItemIcon>
                  <ConfirmationNumberOutlined />
                </ListItemIcon>
                <ListItemText primary={"Mis Ordenes"} />
              </ListItem>
            </>
          )}

          <ListItem button sx={{ display: { xs: "", sm: "none" } }}>
            <ListItemIcon>
              <MaleOutlined />
            </ListItemIcon>
            <ListItemText
              onClick={() => navigateTo("/category/men")}
              primary={"Hombres"}
            />
          </ListItem>

          <ListItem button sx={{ display: { xs: "", sm: "none" } }}>
            <ListItemIcon>
              <FemaleOutlined />
            </ListItemIcon>
            <ListItemText
              onClick={() => navigateTo("/category/women")}
              primary={"Mujeres"}
            />
          </ListItem>

          <ListItem button sx={{ display: { xs: "", sm: "none" } }}>
            <ListItemIcon>
              <EscalatorWarningOutlined />
            </ListItemIcon>
            <ListItemText
              onClick={() => navigateTo("/category/kid")}
              primary={"Niños"}
            />
          </ListItem>

          {!isLoggedIn ? (
            <ListItem
              button
              onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}
            >
              <ListItemIcon>
                <VpnKeyOutlined />
              </ListItemIcon>
              <ListItemText primary={"Ingresar"} />
            </ListItem>
          ) : (
            <ListItem button onClick={onLogout}>
              <ListItemIcon>
                <LoginOutlined />
              </ListItemIcon>
              <ListItemText primary={"Salir"} />
            </ListItem>
          )}

          {/* Admin */}
          {isLoggedIn && user?.role === "admin" && (
            <>
              {" "}
              <Divider />
              <ListSubheader>Admin Panel</ListSubheader>
              <ListItem button>
                <ListItemIcon>
                  <CategoryOutlined />
                </ListItemIcon>
                <ListItemText primary={"Productos"} />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <ConfirmationNumberOutlined />
                </ListItemIcon>
                <ListItemText primary={"Ordenes"} />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <AdminPanelSettings />
                </ListItemIcon>
                <ListItemText primary={"Usuarios"} />
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );
};
