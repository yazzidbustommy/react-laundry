import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { AiFillProduct } from "react-icons/ai";
import { FaUserGroup } from "react-icons/fa6";
import { RiExchangeBoxFill } from "react-icons/ri";

const Home = () => {
  const [bills, setBills] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const getCustomers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/customers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCustomers(response.data.data);
    } catch (err) {
      console.error("Error get list customers:", err);
      alert("Error get list customers");
    }
  };

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
  const getBills = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get(`/bills`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBills(response.data.data);
    } catch (err) {
      console.error("Error get list transactions:", err);
      alert("Error get list transactions");
    }
  };

  useEffect(() => {
    getBills();
    getProducts();
    getCustomers();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 m-5 items-center">
      <div className="flex justify-center">
        <div className="h-40 shadow-md flex">
          <div className="bg-green-600 w-40 h-full flex items-center justify-center">
            <AiFillProduct size={100} className="text-white" />
          </div>
          <div className="bg-white w-60 flex flex-col justify-center items-center text-main-choc font-semibold">
            <p className="text-3xl font-inter">Total Product</p>
            <p className="text-5xl font-inter">{products.length}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="h-40 shadow-md flex">
          <div className="bg-sky-600 w-40 h-full flex items-center justify-center">
            <FaUserGroup size={100} className="text-white" />
          </div>
          <div className="bg-white w-64 flex flex-col justify-center items-center text-main-choc font-semibold">
            <p className="text-3xl font-inter">Total Costumer</p>
            <p className="text-5xl font-inter">{customers.length}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="h-40 shadow-md flex">
          <div className="bg-violet-600 w-40 h-full flex items-center justify-center">
            <RiExchangeBoxFill size={100} className="text-white" />
          </div>
          <div className="bg-white w-64 flex flex-col justify-center items-center text-main-choc font-semibold">
            <p className="text-3xl font-inter">Total Transaction</p>
            <p className="text-5xl font-inter">{bills.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
