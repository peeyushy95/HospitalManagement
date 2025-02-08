import { gql } from '@apollo/client';

// Mutation to add a patient's history record
export const ADD_HISTORY_MUTATION = gql`
  mutation AddHistory($description: String!, $date: String!, $patient_id: Int!) {
    insert_patient_history_one(object: {description: $description, date: $date, patient_id: $patient_id}) {
      id
      description
      date
    }
  }
`;

// Mutation to update a patient's history record
export const UPDATE_HISTORY_MUTATION = gql`
  mutation UpdateHistory($id: Int!, $description: String!, $date: String!) {
    update_patient_history_by_pk(pk_columns: {id: $id}, _set: {description: $description, date: $date}) {
      id
      description
      date
    }
  }
`;

// Mutation to delete a patient's history record
export const DELETE_HISTORY_MUTATION = gql`
  mutation DeleteHistory($id: Int!) {
    delete_patient_history_by_pk(id: $id) {
      id
    }
  }
`;
