import { useEffect } from "react";
import Card from "../components/Card";
import { useProductStore } from "../store/product";

const HomePage = () => {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      {products.map((item) => (
        <Card
          key={item._id ?? "default-id"} // Fallback to default id for key
          id={item._id ?? "default-id"} // Fallback to default id for id prop
          name={item.name}
          price={item.price}
          img={item.image}
        />
      ))}
    </div>
  );
};

export default HomePage;
