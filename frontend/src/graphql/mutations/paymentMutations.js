import { gql } from '@apollo/client';

// Mutation to add payment for a patient
export const ADD_PAYMENT_MUTATION = gql`
  mutation AddPayment($amount: numeric!, $payment_date: date!, $patient_id: Int!) {
    insert_payments_one(object: {amount: $amount, payment_date: $payment_date, patient_id: $patient_id}) {
      id
      amount
      payment_date
      patient {
        name
      }
    }
  }
`;

// Mutation to update a payment
export const UPDATE_PAYMENT_MUTATION = gql`
  mutation UpdatePayment($id: Int!, $amount: Float!, $payment_date: date!) {
    update_payments_by_pk(pk_columns: {id: $id}, _set: {amount: $amount, payment_date: $payment_date}) {
      id
      amount
      payment_date
    }
  }
`;

// Mutation to delete a payment
export const DELETE_PAYMENT_MUTATION = gql`
  mutation DeletePayment($id: Int!) {
    delete_payments_by_pk(id: $id) {
      id
    }
  }
`;
