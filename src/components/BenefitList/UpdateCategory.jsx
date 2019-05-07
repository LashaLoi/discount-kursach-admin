import React, { memo, useState } from "react";
import { Modal, Button, Input } from "semantic-ui-react";
import { ButtonContainer } from "./BenefitList.style";

const UpdateCategory = ({
  open,
  setOpen,
  category,
  updateCategory,
  city,
  children
}) => {
  const [value, setValue] = useState(category.name);

  const handleSubmit = async () => {
    try {
      await updateCategory({
        variables: {
          id: category.id,
          city,
          name: value
        }
      });

      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = e => {
    const {
      target: { value }
    } = e;

    setValue(value);
  };

  return (
    <Modal
      open={open}
      onClose={setOpen.bind(this, false)}
      trigger={children}
      centered
    >
      <Modal.Header>Измените имя категории</Modal.Header>
      <Modal.Content>
        <Input
          value={value}
          fluid
          placeholder="Измените имя"
          onChange={handleChange}
        />
        <ButtonContainer>
          <Button onClick={handleSubmit}>Изменить</Button>
          <Button onClick={setOpen.bind(this, false)}>Закрыть</Button>
        </ButtonContainer>
      </Modal.Content>
    </Modal>
  );
};

export default memo(UpdateCategory);
