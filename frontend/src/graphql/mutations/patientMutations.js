import { gql } from '@apollo/client';

// Mutation to add a new patient
export const ADD_PATIENT_MUTATION = gql`
  mutation AddPatient($first_name: String!, $last_name: String!, $date_of_birth: date!, $gender: String!, $medical_history: String!) {
    insert_patients_one(object: {first_name: $first_name, last_name: $last_name, date_of_birth: $date_of_birth, gender: $gender, medical_history: $medical_history}) {
      id
      first_name
      last_name
      date_of_birth
      gender
      medical_history
    }
  }
`;

// Mutation to update an existing patient's details
export const UPDATE_PATIENT_MUTATION = gql`
  mutation UpdatePatient($id: Int!, $name: String!, $date_of_birth: date!, $gender: String!, $address: String!) {
    update_patients_by_pk(pk_columns: {id: $id}, _set: {name: $name, date_of_birth: $date_of_birth, gender: $gender, address: $address}) {
      id
      name
      date_of_birth
      gender
      address
    }
  }
`;

// Mutation to delete a patient
export const DELETE_PATIENT_MUTATION = gql`
  mutation DeletePatient($id: Int!) {
    delete_patients_by_pk(id: $id) {
      id
    }
  }
`;
