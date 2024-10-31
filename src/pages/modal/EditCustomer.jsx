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
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { z } from "zod";
import { axiosInstance } from "../../lib/axios";

const EditCustomer = ({ customer, fetchCustomers }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const addEditCustomerSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "name can't be empty"),
    phoneNumber: z.string().min(1, "phone number can't be empty"),
    address: z.string().min(1, "type can't be empty"),
  });

  const formEditCustomer = useForm({
    mode: "onBlur",
    defaultValues: {
      id: customer.id,
      name: customer.name,
      phoneNumber: customer.phoneNumber,
      address: customer.address,
    },
    resolver: zodResolver(addEditCustomerSchema),
  });

  const editCustomer = async (data, onClose) => {
    // console.log(data);
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.put(`/customers`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        title: "Success Edit Customer",
        icon: "success",
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      onClose();
      fetchCustomers();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error Edit Customer",
        icon: "error",
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div>
      <Button onPress={onOpen} color="primary" isIconOnly variant="light">
        <FaEdit size={20} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                Edit Customer
              </ModalHeader>
              <form
                onSubmit={formEditCustomer.handleSubmit((data) =>
                  editCustomer(data, onClose)
                )}
              >
                <ModalBody>
                  <Controller
                    name="name"
                    control={formEditCustomer.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          {...field}
                          isInvalid={!!fieldState.error}
                          errorMessage={fieldState.error?.message}
                          label="Customer Name"
                          variant="bordered"
                          onBlur={field.onBlur}
                        />
                      );
                    }}
                  />
                  <Controller
                    name="phoneNumber"
                    control={formEditCustomer.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          {...field}
                          isInvalid={!!fieldState.error}
                          errorMessage={fieldState.error?.message}
                          label="Phone Number"
                          variant="bordered"
                          onBlur={field.onBlur}
                        />
                      );
                    }}
                  />
                  <Controller
                    name="address"
                    control={formEditCustomer.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          {...field}
                          isInvalid={!!fieldState.error}
                          errorMessage={fieldState.error?.message}
                          label="Address"
                          variant="bordered"
                          onBlur={field.onBlur}
                        />
                      );
                    }}
                  />
                </ModalBody>
                <ModalFooter className="justify-center">
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit">
                    Update
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

export default EditCustomer;
