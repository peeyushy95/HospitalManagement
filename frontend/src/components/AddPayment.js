import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, TextField, Grid, Box, Card, CardContent, Typography } from '@mui/material';
import { ADD_PAYMENT_MUTATION } from '../graphql/mutations';

const AddPayment = () => {
  const [payment, setPayment] = useState({
    patient_id: '',
    amount: '',
    payment_date: '',
  });

  const [addPayment] = useMutation(ADD_PAYMENT_MUTATION);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPayment({ variables: { ...payment } });
      alert('Payment Added Successfully');
    } catch (error) {
      alert('Error adding payment');
    }
  };

  return (
    <Card sx={{ marginBottom: 4 }}>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom
        sx={{ 
          color: 'rgb(194, 131, 54)',
          fontWeight: 500,  // Making it slightly bold
          mb: 3  // Adding some margin bottom for better spacing
        }}
        
        >
          Add Payment Information
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Patient ID"
                variant="outlined"
                name="patient_id"
                value={payment.patient_id}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Amount"
                variant="outlined"
                type="number"
                name="amount"
                value={payment.amount}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Payment Date"
                variant="outlined"
                type="date"
                name="payment_date"
                value={payment.payment_date}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center' }}>
                <Button type="submit" variant="contained" color="primary">
                  Add Payment
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddPayment;
