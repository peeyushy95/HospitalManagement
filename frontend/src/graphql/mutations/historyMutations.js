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


export const ADD_VISIT = gql`
  mutation AddVisit($patient_id: Int!, $visit_date: date!, $prescription_file: String, $diagnosis: String, $treatment: String) {
    insert_patient_history_one(object: {
      patient_id: $patient_id,
      visit_date: $visit_date,
      prescription_file: $prescription_file,
      diagnosis: $diagnosis,
      treatment: $treatment,
    }) {
      id
      visit_date
      prescription_file
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

// Add this mutation near your other mutations
export const DELETE_VISIT = gql`
  mutation DeleteVisit($id: Int!) {
    delete_patient_history_by_pk(id: $id) {
      id
    }
  }
`;
