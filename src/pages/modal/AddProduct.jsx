import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { axiosInstance } from "../../lib/axios";
import Swal from "sweetalert2";

const AddProduct = ({ fetchProducts }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const inputRef = useRef(null);

  const addProductSchema = z.object({
    name: z.string().min(1, "name can't be empty"),
    price: z.coerce.number().min(1, "price can't be empty"),
    type: z.string().min(1, "type can't be empty"),
  });

  const formAddProduct = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      price: "",
      type: "",
    },
    resolver: zodResolver(addProductSchema),
  });

  const postProduct = async (data, onClose) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.post("/products", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        title: "Product Addded",
        icon: "success",
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      fetchProducts();
      onClose();
    } catch (error) {
      Swal.fire({
        title: "Error Add Product",
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
    <>
      <Button onPress={onOpen} color="primary" variant="solid" size="lg">
        <FaPlus size={20} /> ADD Product
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                Add Product
              </ModalHeader>
              <form
                onSubmit={formAddProduct.handleSubmit((data) =>
                  postProduct(data, onClose)
                )}
              >
                <ModalBody>
                  <Controller
                    name="name"
                    control={formAddProduct.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          {...field}
                          isInvalid={!!fieldState.error}
                          errorMessage={fieldState.error?.message}
                          label="Product Name"
                          variant="brodered"
                          onBlur={field.onBlur}
                          ref={inputRef}
                        />
                      );
                    }}
                  />
                  <Controller
                    name="price"
                    control={formAddProduct.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          {...field}
                          isInvalid={!!fieldState.error}
                          errorMessage={fieldState.error?.message}
                          type="number"
                          label="Price"
                          variant="brodered"
                          onBlur={field.onBlur}
                        />
                      );
                    }}
                  />
                  <Controller
                    name="type"
                    control={formAddProduct.control}
                    render={({ field, fieldState }) => {
                      return (
                        <Input
                          {...field}
                          isInvalid={!!fieldState.error}
                          errorMessage={fieldState.error?.message}
                          label="type"
                          variant="brodered"
                          onBlur={field.onBlur}
                        />
                      );
                    }}
                  />
                </ModalBody>
                <ModalFooter className="justify-center">
                  <Button color="primary" type="submit">
                    Add
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

export default AddProduct;
