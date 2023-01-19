const fetchProduct = async (productid: string) => {
  const query = new URLSearchParams({ productId: productid });
  const data = await fetch("/api/getProduct?" + query.toString());
  const product = await data.json();
  console.log(product);
  return product;
};

export { fetchProduct };
