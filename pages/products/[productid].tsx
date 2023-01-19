import Head from "next/head";
import { Product } from "../../redux/cart/cartSlice";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";
import { fetchProduct } from "../../lib/fetchProduct";
import { GetStaticPaths } from "next";

const ProductPage = ({ products }: { products: any }) => {
  // const router = useRouter();
  // const productid = router.query.productid as string;
  // console.log(productid);
  // const product = await fetchProduct(productid);

  return (
    <>
      <Head>
        <title>{products.productName}</title>
      </Head>
      <Navbar />
      <div>
        <h1>{products.productName}</h1>
        <h1>{products.inStock}</h1>
        <img src={products.imageLink[0]} />
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
