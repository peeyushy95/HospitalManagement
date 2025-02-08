import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { TextField, Button, Grid, Box, Card, CardContent, Typography, InputLabel, Select, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl } from '@mui/material';
import { GET_TOTAL_PAYMENTS_QUERY,GET_TOTAL_PAYMENTS_WITH_PATIENT_NAME_QUERY, GET_TOTAL_PAYMENT_WITH_PAYMENT_METHOD_QUERY } from '../graphql/queries';

const TotalPayments = () => {
  const [filters, setFilters] = useState({
    start_date: '',
    end_date: '',
    patient_name: '',
    payment_method: '',
  });

  const { 
    data: basicData, 
    loading: basicLoading, 
    error: basicError 
  } = useQuery(GET_TOTAL_PAYMENTS_QUERY, {
    variables: {
      start_date: filters.start_date,
      end_date: filters.end_date,
    },
    skip: !filters.start_date || !filters.end_date || filters.patient_name || filters.payment_method // Skip if patient_name exists
  });

  // Query with patient name filter
  const { 
    data: patientData, 
    loading: patientLoading, 
    error: patientError 
  } = useQuery(GET_TOTAL_PAYMENTS_WITH_PATIENT_NAME_QUERY, {
    variables: {
      start_date: filters.start_date,
      end_date: filters.end_date,
      patient_name: `${filters.patient_name}%`
    },
    skip: !filters.start_date || !filters.end_date || !filters.patient_name || filters.payment_method // Skip if no patient_name
  });

  const { 
    data: patientData1, 
    loading: patientLoading1, 
    error: patientError1 
  } = useQuery(GET_TOTAL_PAYMENT_WITH_PAYMENT_METHOD_QUERY, {
    variables: {
      start_date: filters.start_date,
      end_date: filters.end_date,
      patient_name: `${filters.patient_name}%`,
      payment_method: `${filters.payment_method}`
    },
    skip: !filters.start_date || !filters.end_date || !filters.patient_name || !filters.payment_method // Skip if no patient_name
  });




  const data = patientData || basicData || patientData1;
  const loading = patientLoading || basicLoading || patientLoading1;
  const error = patientError || basicError || patientError1;


  // Calculate total amount
  const totalAmount = data?.payments?.reduce((sum, payment) => sum + parseFloat(payment.amount), 0) || 0;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    // Trigger the search by updating the query
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
          Payments
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Start Date"
              variant="outlined"
              type="date"
              name="start_date"
              value={filters.start_date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="End Date"
              variant="outlined"
              type="date"
              name="end_date"
              value={filters.end_date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Patient First Name"
              variant="outlined"
              name="patient_name"
              value={filters.patient_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="payment-method-label">Payment Method</InputLabel>
            <Select
              labelId="payment-method-label"
              id="payment-method"
              name="payment_method"
              value={filters.payment_method}
              label="Payment Method"
              onChange={handleChange}
            >
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="upi">UPI</MenuItem>
              <MenuItem value="online">Online</MenuItem>
              <MenuItem value="unpaid">Unpaid</MenuItem>
            </Select>
          </FormControl>
          </Grid>
        </Grid>

        {/* <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Box> */}

        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">Error: {error.message}</Typography>}
        {data && (
          <>
           <Card 
           elevation={3} 
           sx={{ 
             mt: 3, 
             mb: 3, 
             p: 2,
             background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
             color: 'white'
           }}
         >
           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <Typography variant="h6">
               Total Amount:
             </Typography>
             <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
               ₹{totalAmount.toFixed(2)}
             </Typography>
           </Box>
         </Card>
          <Box sx={{ marginTop: 2 }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Patient Name</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Payment Date</TableCell>
                    <TableCell>Payment Method</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.patient.first_name} {payment.patient.last_name}</TableCell>
                      <TableCell>₹{payment.amount.toFixed(2)}</TableCell>
                      <TableCell>{payment.payment_date}</TableCell>
                      <TableCell>{payment.payment_method}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TotalPayments;
