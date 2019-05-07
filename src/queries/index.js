import gql from "graphql-tag";

export const GET_ALL_BY_CITY = gql`
  query($id: ID!) {
    getCity(id: $id) {
      name
      id
      __typename
      categories {
        name
        id
        __typename
        benefits {
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
          __typename
          parentCategory {
            id
            name
            __typename
          }
        }
      }
    }
  }
`;

export const GET_ALL_CITIES = gql`
  query {
    getCities {
      id
      name
      categories {
        id
        name
      }
    }
  }
`;

export const GET_BENEFIT = gql`
  query($id: ID!) {
    getBenefit(id: $id) {
      name
      id
      url
      link
      secret
      rating
      working
      discount
      createdAt
      phone
      count
      parentCategory {
        parentCity {
          name
        }
      }
      comments {
        firstName
        lastName
        message
      }
      locations {
        address
        lat
        lng
      }
      description
      parentCategory {
        name
        id
      }
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query($lastName: String, $limit: Int) {
    getNoAdmins(lastName: $lastName, limit: $limit) {
      firstName
      lastName
      profileId
      image
    }
  }
`;

export const GET_ADMINS = gql`
  query($lastName: String) {
    getAdmins(lastName: $lastName) {
      firstName
      lastName
      profileId
      image
    }
  }
`;

export const GET_USER = gql`
  query($profileId: Int!) {
    getUser(profileId: $profileId) {
      room
      image
      votes {
        userId
        commentId
      }
      deptId
      lastName
      position
      errorCode
      firstName
      isEnabled
      profileId
      favorites
      firstNameEng
      permission
      lastNameEng
      employmentDate
    }
  }
`;

export const GET_CATEGORIES = gql`
  query($id: ID!) {
    getCity(id: $id) {
      categories {
        name
      }
    }
  }
`;
