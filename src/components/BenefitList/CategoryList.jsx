import React, { useEffect, memo } from "react";
import PropTypes from "prop-types";
import Category from "./Category";
import {
  handleNewBenefit,
  handleUpdatedBenefit,
  handleDeletedBenefit,
  handleNewCategory,
  handleUpdatedCategory,
  handleDeletedCategory
} from "../../subscriptions/";

const CategoryList = ({
  data,
  openBenefits,
  activeBenefit,
  subscribeToMore,
  refetch
}) => {
  useEffect(() => {
    handleNewBenefit(subscribeToMore, data);
    handleUpdatedBenefit(subscribeToMore, data);
    handleDeletedBenefit(subscribeToMore, data);
    handleNewCategory(subscribeToMore, data);
    handleUpdatedCategory(subscribeToMore, data);
    handleDeletedCategory(subscribeToMore, data);
    refetch();
  }, []);

  const {
    getCity: { categories }
  } = data;

  return categories.map(category => (
    <Category
      openBenefits={openBenefits}
      activeBenefit={activeBenefit}
      key={category.id}
      category={category}
      city={data.getCity.id}
    />
  ));
};

CategoryList.defaultProps = {
  data: {},
  openBenefits: () => {},
  activeBenefit: [],
  subscribeToMore: () => {},
  refetch: () => {}
};

CategoryList.propTypes = {
  data: PropTypes.object.isRequired,
  openBenefits: PropTypes.func.isRequired,
  activeBenefit: PropTypes.array.isRequired,
  subscribeToMore: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

export default memo(CategoryList);
