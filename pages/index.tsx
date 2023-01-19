import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductGrid from "../components/ProductGrid";
import { fetchProducts } from "../lib/fetchProducts";

export default function Home() {
  const [gridProducts, setGridProducts] = useState<any[]>([]);

  const handleFetch = async () => {
    const data = await fetchProducts();
    setGridProducts(data);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <>
      <Head>
        <title>Store</title>
      </Head>
      <Navbar />
      {gridProducts ? (
        <ProductGrid items={gridProducts} />
      ) : (
        <div>Loading products...</div>
      )}
    </>
  );
}
