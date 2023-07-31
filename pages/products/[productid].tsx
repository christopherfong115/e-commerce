import Head from "next/head";
import Navbar from "../../components/Navbar";
import { GetStaticPaths } from "next";
import PhotoCarousel from "../../components/PhotoCarousel";
import {
  addToCart,
  Product,
  ShoppingCartItem,
  addNumToCart,
} from "../../redux/cart/cartSlice";
import { useAppDispatch } from "../../redux/hooks";
import ProductItemTitle from "../../components/ProductItemTitle";
import { useEffect, useState } from "react";

const ProductPage = ({ products }: { products: any }) => {
  // const router = useRouter();
  // const productid = router.query.productid as string;
  // console.log(productid);
  // const product = await fetchProduct(productid);
  const dispatch = useAppDispatch();
  const [numProduct, setNumProduct] = useState(1);

  useEffect(() => {
    if (numProduct <= 0) {
      setNumProduct(1);
    }
  }, [numProduct]);

  return (
    <>
      <Head>
        <title>{products.productName}</title>
      </Head>
      <Navbar />
      {/* <h1>{products.inStock}</h1> */}
      <div>
        <div className="p-4 flex gap-10">
          <PhotoCarousel images={products.imageLink} />
          <div className="w-full flex flex-col">
            <ProductItemTitle productName={products.productName} />
            <div className="py-10">{products.description}</div>
            <div className="flex gap-4 mb-5 outline w-fit text-center items-center">
              <button
                className="bg-red-500 text-white w-8 font-extrabold text-2xl"
                onClick={(e) => setNumProduct(numProduct - 1)}
              >
                -
              </button>
              <input
                className="w-4"
                onChange={(e) => setNumProduct(parseInt(e.target.value))}
                value={numProduct}
              />
              <button
                className="bg-red-500 text-white w-8 font-extrabold text-2xl"
                onClick={(e) => setNumProduct(numProduct + 1)}
              >
                +
              </button>
            </div>
            <button
              className="bg-purple-500 hover:bg-purple-400 active:bg-purple-600 text-white px-4 py-2 rounded-xl w-full"
              onClick={(e) => {
                e.preventDefault();
                dispatch(addToCart(products));
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div>{`$${products.price}`}</div>
      </div>
    </>
  );
};

export default ProductPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("http://localhost:3000/api/getAllProducts");
  const products = await res.json();

  const paths = products.map((p: any) => ({
    params: { productid: p.productid.toString() },
  }));
  return { paths: paths, fallback: true };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  const query = new URLSearchParams({ productId: params.productid });
  const data = await fetch(
    "http://localhost:3000/api/getProduct?" + query.toString()
  );
  const retval = await data.json();
  console.log(retval);
  return {
    props: { products: retval[0] },
  };
};
