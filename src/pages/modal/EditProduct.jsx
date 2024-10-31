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
import { FaEdit } from "react-icons/fa";
import { axiosInstance } from "../../lib/axios";
import Swal from "sweetalert2";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const EditProduct = ({ product, fetchProducts }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const addEditProductSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "name can't be empty"),
    price: z.coerce.number().min(1, "price can't be empty"),
    type: z.string().min(1, "type can't be empty"),
  });

  const formEditProduct = useForm({
    mode: "onBlur",
    defaultValues: {
      id: product.id,
      name: product.name,
      price: product.price,
      type: product.type,
    },
    resolver: zodResolver(addEditProductSchema),
  });

  const editProduct = async (data, onClose) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.put(`/products`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        title: "Success Edit Product",
        icon: "success",
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      onClose();
      fetchProducts();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error Edit Product",
        icon: "error",
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary" isIconOnly variant="light">
        <FaEdit size={20} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                Edit Product
              </ModalHeader>
              <form
                onSubmit={formEditProduct.handleSubmit((data) =>
                  editProduct(data, onClose)
                )}
              >
                <ModalBody>
                  <Controller
                    name="name"
                    control={formEditProduct.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          {...field}
                          isInvalid={!!fieldState.error}
                          errorMessage={fieldState.error?.message}
                          label="Product Name"
                          variant="bordered"
                          onBlur={field.onBlur}
                        />
                      );
                    }}
                  />
                  <Controller
                    name="price"
                    control={formEditProduct.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          {...field}
                          isInvalid={!!fieldState.error}
                          errorMessage={fieldState.error?.message}
                          label="Price"
                          type="number"
                          variant="bordered"
                          onBlur={field.onBlur}
                        />
                      );
                    }}
                  />
                  <Controller
                    name="type"
                    control={formEditProduct.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          {...field}
                          isInvalid={!!fieldState.error}
                          errorMessage={fieldState.error?.message}
                          label="Type"
                          variant="bordered"
                          onBlur={field.onBlur}
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
                    Update
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProduct;
