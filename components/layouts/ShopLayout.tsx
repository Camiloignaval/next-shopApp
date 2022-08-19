import Head from "next/head";
import { FC, useEffect, useState } from "react";
import { Navbar, SideMenu } from "../ui";
import Cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { addOrUpdateCart, updateSummary } from "../../store/Slices/CartSlice";

interface Props {
  children: React.ReactNode;
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
}

export const ShopLayout: FC<Props> = ({
  children,
  pageDescription,
  imageFullUrl,
  title,
}) => {
  const [firstRender, setFirstRender] = useState(true);
  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.cart);

  // atento al carrito
  // -----------------
  useEffect(() => {
    try {
      setFirstRender(false);
      const cookiesCart = Cookie.get("cart")
        ? JSON.parse(Cookie.get("cart")!)
        : [];
      dispatch(addOrUpdateCart(cookiesCart));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (firstRender) return;
    Cookie.set("cart", JSON.stringify(cart));
  }, [cart]);

  // calculo de precios
  useEffect(() => {
    const numberOfItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);
    const subTotal = cart.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    const tax =
      (subTotal * Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)) / 100;
    const total = subTotal + tax;
    const ordenSummary = {
      numberOfItems,
      subTotal,
      tax,
      total,
    };
    dispatch(updateSummary(ordenSummary));
  }, [cart]);

  // -----------------

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>
      <nav>
        <Navbar />
      </nav>
      <SideMenu />
      <main
        style={{
          margin: "80px auto",
          maxWidth: "1440px",
          padding: "0 30px",
        }}
      >
        {children}
      </main>
      {/* footer */}
      <footer>{/* customfooter */}</footer>
    </>
  );
};
