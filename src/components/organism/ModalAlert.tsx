import react, { forwardRef, useImperativeHandle, useState } from "react";

import Modal from "@mui/material/Modal";
import Alert, { AlertProps } from "@mui/material/Alert";
import Box from "@mui/material/Box";

export type RefProps = {
  getOpenModal: () => boolean
  closeModal: () => void
  openModal: () => void;
}

type Props = AlertProps & {
  title: string;
}

export const ModalAlert = forwardRef<RefProps, Props>((props, _ref) => {
  const [openModal, setOpenModal] = useState(false);
 
  function handleCloseModal() {
    setOpenModal(false);
  }

  useImperativeHandle(_ref, () => ({
    getOpenModal: () => {
      return openModal;
    },
    closeModal: () => {
      setOpenModal(false);
    },
    openModal: () => {
      setOpenModal(true);
    }
  }));
  
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
    >
      <Box sx={styleModalMessage}>
        <Alert severity={props.severity}>{props.title}</Alert>
      </Box>
    </Modal>
  );
});

const styleModalMessage = {
  position: 'absolute' as 'absolute',
  top: '5%',
  right: '2%',
  transform: 'translate(0%, -50%)',
};