import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Benefit from "./Benefit.jsx";
import { useMutation } from "react-apollo-hooks";
import { DELETE_CATEGORY, UPDATE_CATEGORY } from "../../mutatuons/";
import { useDeleteItem } from "../../hooks/";
import DeleteCategory from "./DeleteItem";
import { ItemContainer, Titie } from "./BenefitList.style";
import { Icon, Divider, Button, Transition } from "semantic-ui-react";
import UpdateCategory from "./UpdateCategory";

const Category = ({ category, openBenefits, activeBenefit, city }) => {
  const [isOpen, setIsOpen] = useState(false);
  const deleteCategory = useMutation(DELETE_CATEGORY);
  const updateCategory = useMutation(UPDATE_CATEGORY);
  const { visible, setVisible, open, setOpen, deleteItem } = useDeleteItem(
    deleteCategory
  );

  useEffect(() => setVisible(true), []);

  const props = {
    id: category.id,
    open,
    setOpen,
    deleteItem,
    text: "Вы уверены что хотите удалить эту категорию?",
    buttonText: "категорию"
  };

  const className =
    activeBenefit.indexOf(category.id) > -1 && category.benefits
      ? "rotate"
      : "";

  return (
    <Transition visible={visible} animation="fade" duration={400}>
      <ItemContainer key={category.id}>
        <Titie>
          <div onClick={openBenefits.bind(this, category.id)}>
            <Icon name="dropdown" className={className} />
            {category.name}
          </div>
          <div>
            <UpdateCategory
              open={isOpen}
              setOpen={setIsOpen}
              updateCategory={updateCategory}
              category={category}
              city={city}
            >
              <Button
                circular
                icon="edit"
                onClick={setIsOpen.bind(this, true)}
              />
            </UpdateCategory>

            <Button
              circular
              color="red"
              icon="delete"
              onClick={setOpen.bind(this, !open)}
            />
          </div>
        </Titie>
        <Divider />
        {activeBenefit.indexOf(category.id) > -1 &&
          category.benefits.map(benefit => (
            <Benefit benefit={benefit} key={benefit.id} />
          ))}
        <DeleteCategory {...props} />
      </ItemContainer>
    </Transition>
  );
};

Category.defaultProps = {
  category: {},
  openBenefits: () => {},
  activeBenefit: []
};

Category.propTypes = {
  category: PropTypes.object.isRequired,
  openBenefits: PropTypes.func.isRequired,
  activeBenefit: PropTypes.array.isRequired
};

export default memo(Category);
