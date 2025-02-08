import { gql } from '@apollo/client';

export const GET_PATIENT_PAYMENTS_QUERY = gql`
  query GetPatientPayments($patient_id: Int!) {
    payments(where: { patient_id: { _eq: $patient_id } }) {
      id
      amount
      payment_date
    }
  }
`;

export const GET_TOTAL_PAYMENTS_QUERY = gql`
  query GetTotalPayments($start_date: date, $end_date: date) {
    payments(
      where: {
        _and: [
          { payment_date: { _gte: $start_date } },
          { payment_date: { _lte: $end_date } },
        ]
      }
    ) {
      id
      amount
      payment_date
      payment_method
      patient {
        first_name
        last_name
      }
    }
  }
`;

export const GET_TOTAL_PAYMENT_WITH_PAYMENT_METHOD_QUERY = gql`
  query GetTotalPayments($start_date: date, $end_date: date, $patient_name: String, $payment_method: String) {
    payments(
      where: {
        _and: [
          { payment_date: { _gte: $start_date } },
          { payment_date: { _lte: $end_date } },
          { patient: { first_name: { _like: $patient_name } } }
          { payment_method: { _eq: $payment_method } }
        ]
      }
    ) {
      id
      amount
      payment_date
      payment_method
      patient {
        first_name
        last_name
        id
      }
    }
  }
`;


export const GET_TOTAL_PAYMENTS_WITH_PATIENT_NAME_QUERY = gql`
  query GetTotalPayments($start_date: date, $end_date: date, $patient_name: String) {
    payments(
      where: {
        _and: [
          { payment_date: { _gte: $start_date } },
          { payment_date: { _lte: $end_date } },
          { patient: { first_name: { _like: $patient_name } } }
        ]
      }
    ) {
      id
      amount
      payment_date
      payment_method
      patient {
        first_name
        last_name
      }
    }
  }
`;