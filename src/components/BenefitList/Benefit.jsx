import React, { useEffect } from "react";
import { useMutation } from "react-apollo-hooks";
import PropTypes from "prop-types";
import BenefitCard from "./BenefitCard";
import { Link } from "react-router-dom";
import { BenefitContainer, ButtonCard } from "./BenefitList.style";
import { Button, Transition } from "semantic-ui-react";
import { DELETE_BENEFIT } from "../../mutatuons";
import DeleteBenefit from "./DeleteItem";
import { useDeleteItem } from "../../hooks/";

const Benefit = ({ benefit }) => {
  const deleteBenefit = useMutation(DELETE_BENEFIT);
  const { visible, setVisible, open, setOpen, deleteItem } = useDeleteItem(
    deleteBenefit
  );

  useEffect(() => setVisible(true), []);

  const props = {
    id: benefit.id,
    open,
    setOpen,
    deleteItem,
    text: "Вы уверены что хотите удалить этот бенефит?",
    buttonText: "бенефит"
  };

  return (
    <Transition visible={visible} animation="fade" duration={500}>
      <BenefitContainer>
        <BenefitCard benefit={benefit}>
          <ButtonCard>
            <Button
              circular
              basic
              color="black"
              onClick={setOpen.bind(this, !open)}
              icon="delete"
            />
            <Link to={`/update/${benefit.id}`}>
              <Button basic color="black" icon="edit" circular />
            </Link>
          </ButtonCard>
        </BenefitCard>
        <DeleteBenefit {...props} />
      </BenefitContainer>
    </Transition>
  );
};

Benefit.defaultProps = {
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
  }
};

Benefit.propTypes = {
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
  }).isRequired
};

export default Benefit;
