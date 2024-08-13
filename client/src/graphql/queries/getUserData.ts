import { gql } from "@apollo/client";

export const GET_USER_DATA = gql`
  query GetUserData {
    preferences {
      dietaryPreferences
      cuisinePreferences
    }
    addresses {
      id
      label
      addressLine1
      addressLine2
      city
      postalCode
      country
    }
  }
`;
