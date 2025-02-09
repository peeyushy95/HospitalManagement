import { gql } from '@apollo/client';

export const GET_PATIENT_HISTORY_QUERY = gql`
  query GetPatientHistory($patient_id: Int!) {
  
    patients_by_pk(id: $patient_id)  {
        first_name
        last_name
        age
        gender
        # medical_history
        patient_histories{
          id
          visit_date
          prescription_file
          diagnosis
          treatment
      }
    }
  }
`;

// export const GET_PATIENT_HISTORY_QUERY = gql`
//   query GetPatientHistory($patient_id: Int!) {
//     patient_history(where: { patient_id: { _eq: $patient_id } }) {
//       id
//       visit_date
//       diagnosis
//       treatment
//       patient {
//         first_name
//         last_name
//         date_of_birth
//         gender
//         medical_history
//       }
//     }
//   }
// `;
