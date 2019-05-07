import gql from "graphql-tag";

const FETCH_BENEFIT = gql`
  subscription($cityId: ID!) {
    benefitAdded(cityId: $cityId) {
      name
      url
      phone
      createdAt
      description
      discount
      id
      rating
      working
      url
      secret
      parentCategory {
        id
        name
      }
    }
  }
`;

const FETCH_BENEFIT_UPDATE = gql`
  subscription($cityId: ID!) {
    benefitUpdated(cityId: $cityId) {
      name
      url
      phone
      createdAt
      description
      discount
      id
      rating
      working
      url
      secret
      parentCategory {
        id
        name
      }
    }
  }
`;

const FETCH_BENEFIT_DELETED = gql`
  subscription($cityId: ID!) {
    benefitDeleted(cityId: $cityId) {
      id
      parentCategory {
        id
        name
      }
    }
  }
`;

const FETCH_CATEGORY = gql`
  subscription($cityId: ID!) {
    categoryAdded(cityId: $cityId) {
      name
      id
    }
  }
`;

const FETCH_CATEGORY_UPDATE = gql`
  subscription($cityId: ID!) {
    categoryUpdated(cityId: $cityId) {
      name
      id
    }
  }
`;

const FETCH_CATEGORY_DELETED = gql`
  subscription($cityId: ID!) {
    categoryDeleted(cityId: $cityId) {
      name
      id
    }
  }
`;

export const handleNewBenefit = (subscribeToMore, data) => {
  subscribeToMore({
    document: FETCH_BENEFIT,
    variables: { cityId: data.getCity.id },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;

      const newBenefitsArray = prev.getCity.categories.map(category => {
        if (
          category.id === subscriptionData.data.benefitAdded.parentCategory.id
        ) {
          return {
            ...category,
            benefits: [...category.benefits, subscriptionData.data.benefitAdded]
          };
        }

        return category;
      });

      const newData = {
        ...prev,
        getCity: {
          ...prev.getCity,
          categories: newBenefitsArray
        }
      };

      return newData;
    }
  });
};

export const handleUpdatedBenefit = (subscribeToMore, data) => {
  subscribeToMore({
    document: FETCH_BENEFIT_UPDATE,
    variables: { cityId: data.getCity.id },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;

      const newBenefitsArray = prev.getCity.categories.map(category => {
        if (
          category.id === subscriptionData.data.benefitUpdated.parentCategory.id
        ) {
          return {
            ...category,
            benefits: [...category.benefits, subscriptionData.data.benefitAdded]
          };
        }

        return category;
      });

      const newData = {
        ...prev,
        getCity: {
          ...prev.getCity,
          categories: newBenefitsArray
        }
      };

      return newData;
    }
  });
};

export const handleDeletedBenefit = (subscribeToMore, data) => {
  subscribeToMore({
    document: FETCH_BENEFIT_DELETED,
    variables: { cityId: data.getCity.id },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;

      const newBenefitsArray = prev.getCity.categories.map(category => {
        if (
          category.id === subscriptionData.data.benefitDeleted.parentCategory.id
        ) {
          return {
            ...category,
            benefits: [...category.benefits].filter(
              item => item.id !== subscriptionData.data.benefitDeleted.id
            )
          };
        }

        return category;
      });

      const newData = {
        ...prev,
        getCity: {
          ...prev.getCity,
          categories: newBenefitsArray
        }
      };

      return newData;
    }
  });
};

export const handleNewCategory = (subscribeToMore, data) => {
  subscribeToMore({
    document: FETCH_CATEGORY,
    variables: { cityId: data.getCity.id },
    updateQuery: (prev, { subscriptionData }) => {
      const newCategoriesArray = prev.getCity.categories.concat({
        ...subscriptionData.data.categoryAdded,
        benefits: []
      });

      const newData = {
        ...prev,
        getCity: {
          ...prev.getCity,
          categories: newCategoriesArray
        }
      };

      return newData;
    }
  });
};

export const handleUpdatedCategory = (subscribeToMore, data) => {
  subscribeToMore({
    document: FETCH_CATEGORY_UPDATE,
    variables: { cityId: data.getCity.id },
    updateQuery: prev => prev
  });
};

export const handleDeletedCategory = (subscribeToMore, data) => {
  subscribeToMore({
    document: FETCH_CATEGORY_DELETED,
    variables: { cityId: data.getCity.id },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;

      const newCategoriesArray = prev.getCity.categories.filter(
        category => category.id !== subscriptionData.data.categoryDeleted.id
      );

      const newData = {
        ...prev,
        getCity: {
          ...prev.getCity,
          categories: newCategoriesArray
        }
      };

      return newData;
    }
  });
};
