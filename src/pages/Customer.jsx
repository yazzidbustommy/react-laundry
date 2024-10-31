import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import AddCustomer from "./modal/AddCustomer";
import EditCustomer from "./modal/EditCustomer";
import DeleteCustomer from "./modal/DeleteCustomer";

const customer = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  useEffect(() => {
    getCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="m-5 flex flex-col justify-end">
      <h1 className="text-5xl font-bold text-center mb-4">Customers</h1>
      <div className="w-full grid grid-cols-2">
        <div className="w-full flex justify-start">
          <Input
            size="lg"
            type="text"
            placeholder="Search customer..."
            className="w-72"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-end">
          <AddCustomer fetchCustomers={getCustomers} />
        </div>
      </div>
      <Table
        isHeaderSticky
        aria-label="list customer"
        shadow="none"
        className="overflow-y-auto max-h-[37rem] mt-2 border-1 rounded-xl"
      >
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>PHONE NUMBER</TableColumn>
          <TableColumn>ADDRESS</TableColumn>
          <TableColumn className="w-48">ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {filteredCustomers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.phoneNumber}</TableCell>
              <TableCell>{customer.address}</TableCell>
              <TableCell className="flex">
                <EditCustomer
                  customer={customer}
                  fetchCustomers={getCustomers}
                />
                <DeleteCustomer
                  customer={customer}
                  fetchCustomers={getCustomers}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default customer;
