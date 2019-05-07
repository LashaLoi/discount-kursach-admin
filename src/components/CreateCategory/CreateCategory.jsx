import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Input } from "semantic-ui-react";
import { useMutation, useQuery } from "react-apollo-hooks";
import { CREATE_CATEGORY } from "../../mutatuons";
import { GET_CATEGORIES } from "../../queries";
import { useInputValue } from "../../hooks";
import { ButtonContainer } from "../CreateBenefit/CreateBenefit.style";
import { Error } from "./CreateCategory";

const AddCategory = ({ itemKey, children, openModal, setOpenModal }) => {
  const [error, setError] = useState(false);
  const { reset, ...category } = useInputValue("");
  const createCategory = useMutation(CREATE_CATEGORY);
  const { data } = useQuery(GET_CATEGORIES, {
    variables: { id: itemKey }
  });

  const handleSubmit = async () => {
    if (
      data.getCity.categories.find(
        item => item.name.toLowerCase() === category.value.toLowerCase()
      )
    ) {
      setError(true);
      return;
    }

    await createCategory({
      variables: { name: category.value, city: itemKey }
    });

    reset();
    setOpenModal(false);
    setError(false);
  };

  const close = () => {
    setOpenModal(false);
    setError(false);
    reset();
  };

  return (
    <Modal trigger={children} open={openModal} onClose={close}>
      <Modal.Header>Укажите имя категории</Modal.Header>
      <Modal.Content>
        <Input fluid placeholder="Добавить категорию" {...category} />
        {error && <Error>Такое имя категории уже существует!</Error>}
        <ButtonContainer>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!category.value}
          >
            Добавить
          </Button>
          <Button onClick={close}>Закрыть</Button>
        </ButtonContainer>
      </Modal.Content>
    </Modal>
  );
};

AddCategory.defaultProps = {
  itemKey: ""
};

AddCategory.propTypes = {
  itemKey: PropTypes.string.isRequired
};

export default memo(AddCategory);
