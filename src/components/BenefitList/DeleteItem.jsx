import React, { memo } from "react";
import PropTypes from "prop-types";
import { alignCenter } from "./BenefitList.style";
import { Modal } from "semantic-ui-react";
import { Button, Icon } from "semantic-ui-react";

const DeleteBenefit = ({ open, setOpen, deleteItem, id, text, buttonText }) => (
  <Modal
    open={open}
    onClose={setOpen.bind(this, !open)}
    basic
    dimmer="blurring"
    size="small"
    style={alignCenter}
  >
    <Modal.Content>
      <Icon size="massive" name="attention" />
      <h3>{text}</h3>
    </Modal.Content>
    <Modal.Actions style={alignCenter}>
      <Button color="red" onClick={setOpen.bind(this, !open)} inverted>
        <Icon name="cancel" /> Закрыть
      </Button>
      <Button color="green" onClick={deleteItem.bind(this, id)} inverted>
        <Icon name="checkmark" /> Удалить {buttonText}
      </Button>
    </Modal.Actions>
  </Modal>
);

DeleteBenefit.defaultProps = {
  benefit: {
    createdAt: "",
    description: "",
    discount: [],
    id: Date.now(),
    name: "",
    phone: "",
    rating: 0,
    secret: null,
    url: "",
    working: ""
  },
  open: true,
  setOpen: () => {},
  deleteItem: () => {},
  deleteBenefit: () => {}
};

DeleteBenefit.propTypes = {
  benefit: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    discount: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    working: PropTypes.string.isRequired
  }).isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  deleteBenefit: PropTypes.func.isRequired
};

export default memo(DeleteBenefit);
