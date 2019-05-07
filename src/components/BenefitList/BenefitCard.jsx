import React from "react";
import PropTypes from "prop-types";
import { Item, Divider } from "semantic-ui-react";
import { Img } from "./BenefitList.style";

const BenefitCard = ({ benefit, children }) => (
  <Item.Group>
    <Item>
      <Img src={benefit.url} />
      <Item.Content>
        <Item.Header>{benefit.name}</Item.Header>
        <Item.Description>Скидка: {benefit.discount}</Item.Description>
        <Item.Description>
          Описание:
          {benefit.description.length > 100
            ? ` ${benefit.description.substring(0, 100)}...`
            : ` ${benefit.description}`}
        </Item.Description>
        <Item.Extra>Рейтинг: {benefit.rating}</Item.Extra>
      </Item.Content>
      {children}
    </Item>
    <Divider />
  </Item.Group>
);

BenefitCard.defaultProps = {
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

BenefitCard.propTypes = {
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

export default BenefitCard;
