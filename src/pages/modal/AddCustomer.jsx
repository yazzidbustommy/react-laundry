import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import { z } from "zod";
import { axiosInstance } from "../../lib/axios";

const AddCustomer = ({ fetchCustomers }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const inputRef = useRef(null);

  const addCustomerSchema = z.object({
    name: z.string().min(1, "name can't be empty"),
    phoneNumber: z.string().min(1, "phone number can't be empty"),
    address: z.string().min(1, "address can't be empty"),
  });

  const formCustomer = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      phoneNumber: "",
      address: "",
    },
    resolver: zodResolver(addCustomerSchema),
  });

  const postCustomer = async (data, onClose) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.post("/customers", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        title: "Customer Addded",
        icon: "success",
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      fetchCustomers();
      onClose();
    } catch (error) {
      Swal.fire({
        title: "Error Add Customer",
        icon: "error",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div>
      <Button onPress={onOpen} color="primary" size="lg">
        <FaPlus size={20} /> Add Customers
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                Add Customer
              </ModalHeader>
              <form
                onSubmit={formCustomer.handleSubmit((data) =>
                  postCustomer(data, onClose)
                )}
              >
                <ModalBody>
                  <Controller
                    name="name"
                    control={formCustomer.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          {...field}
                          isInvalid={!!fieldState.error}
                          errorMessage={fieldState.error?.message}
                          label="Customer Name"
                          variant="brodered"
                          onBlur={field.onBlur}
                          ref={inputRef}
                        />
                      );
                    }}
                  />
                  <Controller
                    name="phoneNumber"
                    control={formCustomer.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          {...field}
                          isInvalid={!!fieldState.error}
                          errorMessage={fieldState.error?.message}
                          label="Phone Number"
                          variant="brodered"
                          onBlur={field.onBlur}
                        />
                      );
                    }}
                  />
                  <Controller
                    name="address"
                    control={formCustomer.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          {...field}
                          isInvalid={!!fieldState.error}
                          errorMessage={fieldState.error?.message}
                          label="Address"
                          variant="brodered"
                          onBlur={field.onBlur}
                        />
                      );
                    }}
                  />
                </ModalBody>
                <ModalFooter className="justify-center">
                  <Button color="primary" type="submit">
                    Add Customer
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

export default AddCustomer;
