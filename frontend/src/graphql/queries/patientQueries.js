import { gql } from '@apollo/client';

export const GET_ALL_PATIENTS_QUERY = gql`
  query GetAllPatients {
    patients {
      id
      name
      date_of_birth
      gender
      address
    }
  }
`;

export const GET_PATIENT_BY_ID_QUERY = gql`
  query GetPatientById($id: Int!) {
    patients_by_pk(id: $id) {
      id
      name
      date_of_birth
      gender
      address
    }
  }
`;

export const SEARCH_PATIENT_QUERY = gql`
  query SearchPatientsByName {
    patients {
      id
      first_name
      last_name
      date_of_birth
      gender
      medical_history
    }
  }
`;
