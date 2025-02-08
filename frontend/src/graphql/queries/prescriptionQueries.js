import { gql } from '@apollo/client';

export const GET_PATIENT_PRESCRIPTIONS_QUERY = gql`
  query GetPatientPrescriptions($patient_id: Int!) {
    prescriptions(where: { patient_id: { _eq: $patient_id } }) {
      id
      medication
      dose
      instructions
      date
    }
  }
`;
