import { gql } from '@apollo/client';

// Mutation to add a prescription for a patient
export const ADD_PRESCRIPTION_MUTATION = gql`
  mutation AddPrescription($medication: String!, $dose: String!, $instructions: String!, $date: String!, $patient_id: Int!) {
    insert_prescriptions_one(object: {medication: $medication, dose: $dose, instructions: $instructions, date: $date, patient_id: $patient_id}) {
      id
      medication
      dose
      instructions
      date
    }
  }
`;

// Mutation to update a prescription
export const UPDATE_PRESCRIPTION_MUTATION = gql`
  mutation UpdatePrescription($id: Int!, $medication: String!, $dose: String!, $instructions: String!, $date: String!) {
    update_prescriptions_by_pk(pk_columns: {id: $id}, _set: {medication: $medication, dose: $dose, instructions: $instructions, date: $date}) {
      id
      medication
      dose
      instructions
      date
    }
  }
`;

// Mutation to delete a prescription
export const DELETE_PRESCRIPTION_MUTATION = gql`
  mutation DeletePrescription($id: Int!) {
    delete_prescriptions_by_pk(id: $id) {
      id
    }
  }
`;
