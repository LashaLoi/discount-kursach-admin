import React from "react";
import PropTypes from "prop-types";
import { Modal } from "semantic-ui-react";

const UpdateModal = ({ open, close, children }) => (
  <Modal dimmer="blurring" open={open} onClose={close} size="large">
    {children}
  </Modal>
);

UpdateModal.defaultProps = {
  open: false,
  close: () => {}
};

UpdateModal.propsTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};

export default UpdateModal;
