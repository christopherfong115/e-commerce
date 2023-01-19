import { collection, getDocs, query, where } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebase/clientApp";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { productId } = req.query;
  const collections = collection(db, "products");
  const q = query(collections, where("productid", "==", productId));
  const data = await getDocs(q);
  const retval = data.docs.map((doc) => ({ ...doc.data() }));

  res.status(200).json(retval);
};
