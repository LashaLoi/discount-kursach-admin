import React from "react";
import { Container, InputButton, InputList } from "./ListOfUInputs.style";
import { Icon } from "semantic-ui-react";

const Input = ({ value, onChange, type = "text" }) => (
  <InputList
    placeholder="Добавьте новую скидку"
    type={type}
    value={value}
    onChange={e => onChange(e.target.value)}
  />
);

export const Item = ({
  decorateHandle,
  removable,
  onChange,
  onRemove,
  value
}) => {
  return (
    <Container>
      <Input value={value} onChange={onChange} />
      {decorateHandle(
        <span style={{ cursor: "move", marginLeft: "10px" }}>
          <Icon name="move" />
        </span>
      )}
      <InputButton onClick={removable ? onRemove : x => x}>
        <Icon name="remove" />
      </InputButton>
    </Container>
  );
};

export const StagingItem = ({ value, onAdd, canAdd, add, onChange }) => {
  return (
    <Container>
      <Input value={value} onChange={onChange} />
      <InputButton
        onClick={
          canAdd
            ? () => {
                onAdd();
                onChange("");
              }
            : null
        }
      >
        <Icon name="plus" />
      </InputButton>
    </Container>
  );
};
