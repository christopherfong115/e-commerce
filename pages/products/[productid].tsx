import Head from "next/head";
import Navbar from "../../components/Navbar";
import { GetStaticPaths } from "next";
import PhotoCarousel from "../../components/PhotoCarousel";
import { addToCart, Product } from "../../redux/cart/cartSlice";
import { useAppDispatch } from "../../redux/hooks";

const ProductPage = ({ products }: { products: any }) => {
  // const router = useRouter();
  // const productid = router.query.productid as string;
  // console.log(productid);
  // const product = await fetchProduct(productid);
  const dispatch = useAppDispatch();

  return (
    <>
      <Head>
        <title>{products.productName}</title>
      </Head>
      <Navbar />
      {/* <h1>{products.inStock}</h1> */}
      <div>
        <div className="p-4 flex flex-row gap-10">
          <PhotoCarousel images={products.imageLink} />
          <div>
            <div className="w-[98%] mx-auto h-1 bg-black" />
            <h1 className="text-2xl font-extrabold text-center">
              {products.productName}
            </h1>
            <div className="w-[98%] mx-auto h-1 bg-black" />
            <div>{products.description}</div>
            <button
              className="bg-purple-500 text-white px-4 py-2 rounded-xl w-full"
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
