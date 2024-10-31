import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import AddTransaction from "./modal/AddTransaction";
import DetailsTransaction from "./modal/DetailsTransaction";

const Transaction = () => {
  const [bills, setBills] = useState([]);

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
  }, []);

  return (
    <div className="m-5 flex flex-col">
      <h1 className="text-5xl font-bold text-center mb-4">Transactions</h1>
      <div className="w-full flex justify-end">
        <AddTransaction fetchBills={getBills} />
      </div>

      <Table
        isHeaderSticky
        aria-label="laundry transactions"
        shadow="none"
        className="overflow-y-auto max-h-[37rem] mt-2 border-1 rounded-xl"
      >
        <TableHeader>
          <TableColumn>COSTUMER ID</TableColumn>
          <TableColumn>COSTUMER NAME</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {bills.map((bill) => (
            <TableRow key={bill.id}>
              <TableCell>{bill.customer.id}</TableCell>
              <TableCell>{bill.customer.name}</TableCell>
              <TableCell>
                <DetailsTransaction bill={bill} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Transaction;
