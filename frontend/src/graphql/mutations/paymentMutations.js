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

export const ADD_PAYMENT = gql`
  mutation AddPayment($patient_id: Int!, $payment_date: date!, $amount: numeric!, $payment_method: String!) {
    insert_payments_one(object: {
      patient_id: $patient_id,
      payment_date: $payment_date,
      amount: $amount,
      payment_method: $payment_method,
    }) {
      id
      payment_date
      amount
      payment_method
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


export const UPDATE_PAYMENT_METHOD = gql`
  mutation UpdatePaymentMethod($payment_id: Int!, $payment_method: String!) {
    update_payments_by_pk(
      pk_columns: { id: $payment_id }
      _set: { payment_method: $payment_method }
    ) {
      id
      payment_method
      amount
      payment_date
      patient {
        first_name
        last_name
      }
    }
  }
`;

export const DELETE_PAYMENT = gql`
  mutation DeletePayment($payment_id: Int!) {
    delete_payments_by_pk(id: $payment_id) {
      id
      payment_method
      amount
      payment_date
    }
  }
`;