import type { NextApiRequest, NextApiResponse } from "next";
import { db, seedDataBase } from "../../database";
import { Product, User } from "../../models";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({ message: "No tiene acceso a este servicio" });
  }

  await db.connect();
  await Product.deleteMany();
  await User.deleteMany();
  await Product.insertMany(seedDataBase.initialData.products);
  await User.insertMany(seedDataBase.initialData.users);
  await db.disconnect();

  res.status(200).json({ message: "Realizado con exito" });
}
