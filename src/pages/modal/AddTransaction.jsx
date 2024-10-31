import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { axiosInstance } from "../../lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Swal from "sweetalert2";

const AddTransaction = ({ fetchBills }) => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get(`/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data.data);
    } catch (err) {
      console.error("Error get list products:", err);
      alert("Error get list products");
    }
  };

  const getCustomers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get(`/customers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCustomers(response.data.data);
    } catch (err) {
      console.error("Error get list customer:", err);
      alert("Error get list customers");
    }
  };

  const addTransactionSchema = z.object({
    idCustomer: z.string().min(1, "please select a customer"),
    idProduct: z.string().min(1, "please select a product"),
    qty: z.coerce.number().min(1, "Quantity can't be empty"),
  });

  const formTransaction = useForm({
    defaultValues: {
      idCustomer: "",
      idProduct: "",
      qty: 1,
    },
    resolver: zodResolver(addTransactionSchema),
  });

  const postTransaction = async (data, onClose) => {
    try {
      const token = localStorage.getItem("token");

      const dataBills = {
        customerId: data.idCustomer,
        billDetails: [
          {
            product: {
              id: data.idProduct,
            },
            qty: data.qty,
          },
        ],
      };
      await axiosInstance.post("/bills", dataBills, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        title: "Transaction Success",
        icon: "success",
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      fetchBills();
      onClose();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Transaction Failed",
        icon: "error",
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    getProducts();
    getCustomers();
  }, []);

  return (
    <div>
      <Button onPress={onOpen} color="primary" variant="solid" size="lg">
        <FaPlus size={20} /> ADD Transaction
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Trasantion
              </ModalHeader>
              <form
                onSubmit={formTransaction.handleSubmit((data) =>
                  postTransaction(data, onClose)
                )}
              >
                <ModalBody>
                  <Controller
                    name="idCustomer"
                    control={formTransaction.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Select
                          {...field}
                          isInvalid={!!fieldState.error}
                          errorMessage={fieldState.error?.message}
                          label="Select Customer"
                        >
                          {customers.map((customer) => (
                            <SelectItem key={customer.id} value={customer.id}>
                              {customer.name}
                            </SelectItem>
                          ))}
                        </Select>
                      );
                    }}
                  />
                  <Controller
                    name="idProduct"
                    control={formTransaction.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Select
                          {...field}
                          isInvalid={!!fieldState.error}
                          errorMessage={fieldState.error?.message}
                          label="Select Product"
                        >
                          {products.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name}
                            </SelectItem>
                          ))}
                        </Select>
                      );
                    }}
                  />
                  <Controller
                    name="qty"
                    control={formTransaction.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          {...field}
                          isInvalid={!!fieldState.error}
                          errorMessage={fieldState.error?.message}
                          type="number"
                          label="Quantity"
                          variant="brodered"
                        />
                      );
                    }}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit">
                    Add Transaction
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddTransaction;
