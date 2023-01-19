const fetchProducts = async () => {
  const data = await fetch("/api/getAllProducts");
  const products = await data.json();
  console.log(products);
  return products;
};

export { fetchProducts };
