import {
  Button,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../lib/axios";
import EditProduct from "./modal/EditProduct";
import AddProduct from "./modal/AddProduct";
import DeleteProduct from "./modal/DeleteProduct";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data.data);
    } catch (err) {
      alert("Error get list products");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="m-5 flex flex-col">
      <h1 className="text-5xl font-bold text-center mb-4">Products</h1>
      <div className="w-full grid grid-cols-2">
        <div className="w-full flex justify-start">
          <Input
            size="lg"
            type="text"
            placeholder="Search product..."
            className="w-72"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-end">
          <AddProduct fetchProducts={getProducts} />
        </div>
      </div>

      <Table
        isHeaderSticky
        aria-label="laundry products"
        shadow="none"
        className="overflow-y-auto max-h-[37rem] mt-2 border-1 rounded-xl"
      >
        <TableHeader>
          <TableColumn>PRODUCT NAME</TableColumn>
          <TableColumn>PRICE</TableColumn>
          <TableColumn>TYPE</TableColumn>
          <TableColumn className="w-48">ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>Rp. {product.price},-</TableCell>
              <TableCell>{product.type}</TableCell>
              <TableCell className="flex">
                <EditProduct product={product} fetchProducts={getProducts} />
                <DeleteProduct product={product} fetchProducts={getProducts} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Product;
