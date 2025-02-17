import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { TextField, Button, Grid, Box, Card, CardContent, Typography, InputLabel, Select, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, Dialog, DialogTitle, DialogContent, DialogActions , IconButton } from '@mui/material';
import { GET_TOTAL_PAYMENTS_QUERY,GET_TOTAL_PAYMENTS_WITH_PATIENT_NAME_QUERY, GET_TOTAL_PAYMENT_WITH_PAYMENT_METHOD_QUERY } from '../graphql/queries';
import { UPDATE_PAYMENT_METHOD, DELETE_PAYMENT } from '../graphql/mutations';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';


const TotalPayments = () => {
  const [filters, setFilters] = useState({
    start_date: '',
    end_date: '',
    patient_name: '',
    payment_method: '',
  });

  const getQueryType = () => {
    
    if (filters.payment_method && filters.patient_name) {
      return GET_TOTAL_PAYMENT_WITH_PAYMENT_METHOD_QUERY;
    }

    if (filters.patient_name) {
      return GET_TOTAL_PAYMENTS_WITH_PATIENT_NAME_QUERY;
    }

    return GET_TOTAL_PAYMENTS_QUERY;
  };

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const getCurrentQueryVariables = () => ({
    ...(filters.start_date && { start_date: filters.start_date }),
    ...(filters.end_date && { end_date: filters.end_date }),
    ...(filters.patient_name && { patient_name: `${filters.patient_name}%` }),
    ...(filters.payment_method && { payment_method: filters.payment_method })
  });


  const [updatePaymentMethod] = useMutation(UPDATE_PAYMENT_METHOD, {
    onCompleted: () => {
      // Force refetch the current query
      refetch();
      handleEditClose();
    }
  });


  const [deletePayment] = useMutation(DELETE_PAYMENT, {
    onCompleted: () => {
      // Force refetch the current query
      refetch();
    }
  });


  const handleUpdatePaymentMethod = async (newMethod) => {
    try {
      await updatePaymentMethod({
        variables: {
          payment_id: parseInt(selectedPayment.id),
          payment_method: newMethod
        }
      });
      handleEditClose();
    } catch (error) {
      console.error('Error updating payment method:', error);
    }
  };

  const handleDeletePayment = async (paymentId) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      try {
        await deletePayment({
          variables: {
            payment_id: parseInt(paymentId)
          }
        });
      } catch (error) {
        console.error('Error deleting payment:', error);
      }
    }
  };

  const handleEditClick = (payment) => {
    setSelectedPayment(payment);
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
    setSelectedPayment(null);
  };


  const { 
    data, 
    loading, 
    error,
    refetch 
  } = useQuery(getQueryType(), {
    variables: {
      ...(filters.start_date && { start_date: filters.start_date }),
      ...(filters.end_date && { end_date: filters.end_date }),
      ...(filters.patient_name && { patient_name: `${filters.patient_name}%` }),
      ...(filters.payment_method && { payment_method: filters.payment_method })
    },
    skip: !filters.start_date || !filters.end_date,
    fetchPolicy: 'network-only'  // Add this to ensure fresh data
  });



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
    <Card sx={{ 
      marginBottom: 4,  
      backgroundColor: '#f5f5f5b3', 
      minHeight: '70vh'
    }}>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom
        sx={{ 
          color: 'rgb(194, 131, 54)',
          fontWeight: 600,  // Making it slightly bold
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
         <Box>
            <TableContainer component={Paper}
              sx={{
                maxHeight: 'calc(70vh - 340px)',
                "& .MuiTableContainer-root": {
                  overflow: "visible"
                }
              }}
            
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Patient Name</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Payment Date</TableCell>
                    <TableCell>Payment Method</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  sx={{
                    overflow: 'auto',
                    '&::-webkit-scrollbar': {
                      width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: '#f1f1f1',
                      borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: '#888',
                      borderRadius: '10px',
                      '&:hover': {
                        background: '#555',
                      },
                    }
                  }}
                
                >
                  {data.payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.patient.first_name} {payment.patient.last_name}</TableCell>
                      <TableCell>₹{payment.amount.toFixed(2)}</TableCell>
                      <TableCell>{payment.payment_date}</TableCell>
                      <TableCell>{payment.payment_method}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEditClick(payment)} size="small">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeletePayment(payment.id)} size="small"
                          color="error"
                          sx={{ 
                            '&:hover': {
                              backgroundColor: 'rgba(211, 47, 47, 0.04)'
                            }
                          }}
                          
                          >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                {/* Add Dialog for editing payment method */}
                <Dialog open={openEditDialog} onClose={handleEditClose}>
                  <DialogTitle>Update Payment Method</DialogTitle>
                  <DialogContent>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                      <InputLabel>Payment Method</InputLabel>
                      <Select
                        value={selectedPayment?.payment_method || ''}
                        label="Payment Method"
                        onChange={(e) => handleUpdatePaymentMethod(e.target.value)}
                      >
                        <MenuItem value="cash">Cash</MenuItem>
                        <MenuItem value="upi">UPI</MenuItem>
                        <MenuItem value="online">Online</MenuItem>
                        <MenuItem value="unpaid">Unpaid</MenuItem>
                      </Select>
                    </FormControl>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                  </DialogActions>
                </Dialog>
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
