import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductGrid from "../components/ProductGrid";
import SectionTitle from "../components/SectionTitle";
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
    <div className="overflow-y-hidden">
      <Head>
        <title>Store</title>
      </Head>
      <Navbar />
      <div>
        <SectionTitle title={"Home"} />
        {gridProducts ? (
          <ProductGrid items={gridProducts} />
        ) : (
          <div className="text-black">Loading products...</div>
        )}
      </div>
    </div>
  );
}
