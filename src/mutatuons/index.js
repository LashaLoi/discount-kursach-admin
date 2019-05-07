import gql from "graphql-tag";

export const CREATE_CATEGORY = gql`
  mutation($name: String!, $city: ID!) {
    createCategory(name: $name, city: $city)
  }
`;

export const CREATE_BENEFIT = gql`
  mutation(
    $discount: [String!]!
    $locations: [LocationInput]
    $name: String!
    $description: String!
    $url: String!
    $link: String!
    $working: String!
    $category: ID!
    $phone: String!
  ) {
    createBenefit(
      discount: $discount
      locations: $locations
      name: $name
      description: $description
      url: $url
      link: $link
      working: $working
      category: $category
      phone: $phone
    )
  }
`;

export const DELETE_BENEFIT = gql`
  mutation($id: ID!) {
    deleteBenefit(id: $id)
  }
`;

export const UPDATE_BENEFIT = gql`
  mutation(
    $discount: [String]
    $locations: [LocationInput]
    $name: String
    $description: String
    $url: String
    $link: String
    $working: String
    $id: ID!
    $phone: String
    $rating: Int
    $count: Int
  ) {
    updateBenefit(
      id: $id
      discount: $discount
      locations: $locations
      name: $name
      description: $description
      url: $url
      link: $link
      phone: $phone
      working: $working
      count: $count
      rating: $rating
    )
  }
`;

export const LOGIN = gql`
  mutation($login: String!, $password: String!) {
    loginHR(login: $login, password: $password) {
      sessionId
      errorCode
      token
      refreshToken
      errorMessage
    }
  }
`;

export const TOGGLE_ADMIN = gql`
  mutation($profileId: Int!) {
    toggleAdmin(profileId: $profileId)
  }
`;

export const UPLOAD_FILE = gql`
  mutation($file: Upload!) {
    singleUpload(file: $file)
  }
`;

export const DELETE_CATEGORY = gql`
  mutation($id: ID!) {
    deleteCategory(id: $id)
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation($name: String!, $id: ID!, $city: ID!) {
    updateCategory(name: $name, id: $id, city: $city)
  }
`;
