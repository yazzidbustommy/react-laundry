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

const DeleteCustomer = ({ customer, fetchCustomers }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const deleteCustomer = async (onClose) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete(`/customers/${customer.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        title: "Customer Deleted",
        icon: "success",
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      onClose();
      fetchCustomers();
    } catch (error) {
      Swal.fire({
        title: "Failed to Delete Customer",
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
                  Are you sure that you want delete this customer
                </h1>
              </ModalBody>
              <ModalFooter className="justify-center pt-10">
                <Button color="danger" variant="light" onPress={onClose}>
                  No
                </Button>
                <Button color="primary" onPress={() => deleteCustomer(onClose)}>
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

export default DeleteCustomer;
