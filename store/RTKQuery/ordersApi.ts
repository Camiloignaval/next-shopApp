import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { IOrder } from "../../interfaces";
import { useRouter } from "next/router";

interface IResponse {
  data: {
    message: string;
    error?: object;
  };
}

// Define a service using a base URL and expected endpoints
export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation<IResponse, IOrder>({
      query: (body) => ({
        url: `/orders`,
        method: "post",
        body,
      }),
      onQueryStarted(_, { queryFulfilled, dispatch }) {
        toast.promise(queryFulfilled, {
          loading: "Registrando usuario...",
          success: ({ data }) => {
            // limpiar el carrito y sacarlo de la pagina
            // const router = useRouter();
            // console.log(router);
            return "Orden creada con éxito";
          },
          error: ({ error }) => error.data.message.toString(),
        });
      },
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApi;
