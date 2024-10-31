import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Divider,
} from "@nextui-org/react";

const DetailsTransaction = ({ bill }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const firstBillDetail =
    bill.billDetails && bill.billDetails.length > 0
      ? bill.billDetails[0]
      : null;

  return (
    <div>
      <Button onPress={onOpen}>Details</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Transaction Details
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-3 gap-3">
                  <p className="font-bold">Transaction ID</p>
                  <p className="col-span-2">{bill.id}</p>
                  <p className="font-bold">Transaction Time</p>
                  <p className="col-span-2">{bill.billDate}</p>
                  <p className="font-bold">Customer Name</p>
                  <p className="col-span-2">{bill.customer.name}</p>
                  {firstBillDetail && (
                    <>
                      <p className="font-bold">Product Name</p>
                      <p className="col-span-2">
                        {firstBillDetail.product.name}
                      </p>
                      <p className="font-bold">Product Price</p>
                      <p className="col-span-2">
                        Rp. {firstBillDetail.product.price}
                      </p>
                      <p className="font-bold">Quantity</p>
                      <p className="col-span-2">
                        {firstBillDetail.qty} {firstBillDetail.product.type}
                      </p>
                    </>
                  )}
                </div>
                <Divider />
                <div className="flex flex-col items-center">
                  <h1 className="font-bold text-2xl">Total Price</h1>
                  <h1 className="font-bold text-2xl">
                    Rp.{" "}
                    {firstBillDetail
                      ? firstBillDetail.qty * firstBillDetail.product.price
                      : 0}
                    ,-
                  </h1>
                </div>
              </ModalBody>
              <ModalFooter className="justify-center">
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DetailsTransaction;
