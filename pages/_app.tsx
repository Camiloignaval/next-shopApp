import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "../themes";
import { SWRConfig } from "swr";
import { Provider } from "react-redux";
import { store } from "../store";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   const cookiesCart = Cookies.get("cart")
  //     ? JSON.parse(Cookies.get("cart")!)
  //     : [];
  //   console.log(cookiesCart);
  // }, []);

  return (
    <Provider store={store}>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
          <Toaster
            toastOptions={{
              success: {
                style: {
                  background: "green",
                  color: "white",
                },
              },
              error: {
                style: {
                  background: "white",
                  color: "black",
                  fontWeight: "500",
                },
              },
            }}
          />
        </ThemeProvider>
      </SWRConfig>
    </Provider>
  );
}

export default MyApp;
