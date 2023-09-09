import { Modal } from "@mantine/core";
import ModalContent from "./ModalContent/ModalContent";
import ModalMenu from "./ModalMenu/ModalMenu";
import "./style.css";
import React from "react";

type EventModalProps = {
  opened: boolean | number;
  setOpened?: any;
};
const EventModal: React.FC<EventModalProps> = ({ opened, setOpened }) => {
  return (
    <div className="event__modal-setting">
      <Modal
        className="event__modal"
        opened={!!opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
        size="80%"
      >
        <div className="event__modal-inner">
          <ModalMenu />
          <ModalContent />
        </div>
      </Modal>
    </div>
  );
};

export default EventModal;
