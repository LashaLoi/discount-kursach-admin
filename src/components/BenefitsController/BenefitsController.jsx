import React, { useEffect, memo, useState } from "react";
import PropTypes from "prop-types";
import { Button, Dropdown, Loader } from "semantic-ui-react";
import { Controller, ControllerItem } from "./BenefitsContoller.style";
import { Link } from "react-router-dom";
import AddCategory from "../CreateCategory/CreateCategory.jsx";

const BenefitsContoller = ({ getBenefitsByCity, options }) => {
  const [openModal, setOpenModal] = useState(false);
  const [itemKey, setItemKey] = useState(null);

  if (options.length === 0) return <Loader />;

  const count = localStorage.getItem("city") || 0;

  useEffect(() => {
    getBenefitsByCity(options[count].value);
    setItemKey(options[count].value);
  }, []);

  useEffect(() => {
    setItemKey(options[count].value);
  }, [count]);

  const handleChange = (_, { value }) => {
    localStorage.setItem(
      "city",
      options.find(item => item.value === value).key
    );

    getBenefitsByCity(value);
  };

  return (
    <Controller>
      <ControllerItem>
        <Dropdown
          placeholder="Выбрать город"
          options={options}
          selection
          button
          defaultValue={options[count].value}
          onChange={handleChange}
        />
      </ControllerItem>
      <ControllerItem>
        <Link to="/create">
          <Button
            content="Добавить бенефит"
            icon="plus"
            labelPosition="right"
          />
        </Link>
      </ControllerItem>
      <ControllerItem>
        <AddCategory
          itemKey={itemKey}
          openModal={openModal}
          setOpenModal={setOpenModal}
        >
          <Button
            content="Добавить категорию"
            icon="plus"
            onClick={setOpenModal.bind(this, true)}
            labelPosition="right"
          />
        </AddCategory>
      </ControllerItem>
    </Controller>
  );
};

BenefitsContoller.defaultProps = {
  getBenefitsByCity: () => {},
  options: []
};

BenefitsContoller.propTypes = {
  getBenefitsByCity: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default memo(BenefitsContoller);
