import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { axiosInstance } from "../../lib/axios";
import Swal from "sweetalert2";

const DeleteProduct = ({ product, fetchProducts }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const deleteProduct = async (onClose) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete(`/products/${product.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        title: "Product Deleted",
        icon: "success",
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      onClose();
      fetchProducts();
    } catch (error) {
      Swal.fire({
        title: "Failed to Delete Product",
        icon: "error",
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      console.log(error);
    }
  };

  return (
    <div>
      <Button onPress={onOpen} isIconOnly variant="light" color="danger">
        <FaTrash size={18} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="mt-14">
                <h1 className="text-md text-center text-red-500">
                  Are you sure that you want delete this product
                </h1>
              </ModalBody>
              <ModalFooter className="justify-center pt-10">
                <Button color="danger" variant="light" onPress={onClose}>
                  No
                </Button>
                <Button color="primary" onPress={() => deleteProduct(onClose)}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DeleteProduct;
