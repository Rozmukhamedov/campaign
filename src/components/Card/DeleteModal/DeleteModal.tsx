import { Modal } from "@mantine/core";
import "./style.css";
import CloseIcon from "assets/images/closeicon.svg";

type DeleteModal = {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: any;
};

const DeleteModal: React.FC<DeleteModal> = ({ opened, setOpened, onClick }) => {
  return (
    <>
      <div className="deletemodal">
        <Modal 
          className="dd"
          opened={opened}
          onClose={() => setOpened(false)}
          size="sm"
          transition="fade"
          transitionDuration={200}
          transitionTimingFunction="ease"
          
        >
          <div className="deletemodal__inner">
            <div className="modaldelete__top">
              <h2>
                Are you sure <br />
                you want to delete
              </h2>
              <img
                onClick={() => setOpened(false)}
                src={CloseIcon}
                alt="CloseIcon"
              />
            </div>
            <div className="modaldelete__desc">
              <p>after deletion, the data will not be restored</p>
            </div>
            <div className="deletemodal__btns">
              <button  onClick={() => setOpened(false)}
               className="modal__delete-cancel">Cancel</button>
              <button className="modal__delete-btn" onClick={onClick}>Yes, delete</button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default DeleteModal;
