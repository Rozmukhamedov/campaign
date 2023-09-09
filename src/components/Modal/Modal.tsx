
import { Modal } from "@mantine/core";
import React, { FC, ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  opened?: any;
  onClose?: any;
  size?: string;
};

const CustomModal: FC<ModalProps> = ({ children, opened, onClose, size }) => {

  return (
    <Modal opened={opened} onClose={onClose} size={size}>
      {children}
    </Modal>
  );
};

export default CustomModal;
