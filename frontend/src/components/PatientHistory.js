import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {  Typography, Box, Card, CardContent, Alert, TextField, Button, 
  Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, FormControl, InputLabel, IconButton   } from '@mui/material';
import { GET_PATIENT_HISTORY_QUERY } from '../graphql/queries';
import { DELETE_VISIT, ADD_PAYMENT, ADD_VISIT } from '../graphql/mutations';
import { styled, } from '@mui/material/styles';
import { useQuery, useMutation, gql } from '@apollo/client';
import { CloudUpload as CloudUploadIcon, Delete as DeleteIcon } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: '10px 0',
  borderRadius: '10px',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  background: 'rgba(255, 255, 255, 0.9)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(33, 150, 243, 0.5)',
    background: 'rgba(255, 255, 255, 1)',
  }
}));

const ScrollableBox = styled(Box)(({ theme }) => ({
  maxHeight: '300px',
  overflowY: 'auto',
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
  },
}));

const HistoryItem = styled(Box)(({ theme }) => ({
  margin: '10px 0',
  padding: '15px',
  borderRadius: '10px',

  border: '1px solid rgba(0, 0, 0, 0.12)',
  background: 'rgba(255, 255, 255, 0.9)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(33, 150, 243, 0.5)',
    background: 'rgba(255, 255, 255, 1)',
  }
}));



const DeleteConfirmDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ color: 'error.main' }}>Confirm Delete</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this visit record? This action cannot be undone.</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={onConfirm} 
          color="error" 
          variant="contained"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};




const AddVisitDialog = ({ open, onClose, onSubmit, title }) => {
  const [visitInfo, setVisitInfo] = useState({
    visit_date: new Date().toISOString().split('T')[0],
    diagnosis: '',
    treatment: '',
    prescription_file: null
  });

  const [selectedFileName, setSelectedFileName] = useState('');

  const handleVisitInfoChange = (event) => {
    setVisitInfo({
      ...visitInfo,
      [event.target.name]: event.target.value
    });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      // Convert file to base64
      const base64File = await convertToBase64(file);
      setVisitInfo({
        ...visitInfo,
        prescription_file: base64File
      });
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = () => {
    onSubmit(visitInfo);
    setVisitInfo({
      visit_date: new Date().toISOString().split('T')[0],
      diagnosis: '',
      treatment: '',
      prescription_file: null
    });

    setSelectedFileName('');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ 
        color: 'rgb(194, 131, 54)',
        fontWeight: 500 
      }}>
        {title || 'Add New Visit'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Visit Date"
            type="date"
            name="visit_date"
            value={visitInfo.visit_date}
            onChange={handleVisitInfoChange}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
           <Box sx={{ mb: 2 }}>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              style={{ display: 'none' }}
              id="prescription-file"
              onChange={handleFileChange}
            />
            <label htmlFor="prescription-file">
              <Button
                variant="outlined"
                component="span"
                fullWidth
                startIcon={<CloudUploadIcon />}
              >
                Upload Prescription
              </Button>
            </label>
            {selectedFileName && (
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Selected file: {selectedFileName}
              </Typography>
            )}
          </Box>
          <TextField
            fullWidth
            label="Diagnosis"
            name="diagnosis"
            value={visitInfo.diagnosis}
            onChange={handleVisitInfoChange}
            inputProps={{ maxLength: 50 }}  // Add this line
            helperText={`${visitInfo.diagnosis.length}/50 characters`} 
            multiline
            rows={2}
            sx={{ mb: 2 }}
          />
          {/* <TextField
            fullWidth
            label="Treatment"
            name="treatment"
            value={visitInfo.treatment}
            onChange={handleVisitInfoChange}
            multiline
            rows={2}
            sx={{ mb: 2 }}
          /> */}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button 
          onClick={onClose}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          sx={{
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            padding: '8px 22px',
            '&:hover': {
              background: 'linear-gradient(45deg, #FE5179 30%, #FF7D42 90%)',
              boxShadow: '0 4px 6px 2px rgba(255, 105, 135, .4)',
            }
          }}
        >
          Add Visit
        </Button>
      </DialogActions>
    </Dialog>
  );
};


const PaymentDialog = ({ open, onClose, onSubmit, title }) => {
  const [paymentInfo, setPaymentInfo] = useState({
    payment_date: new Date().toISOString().split('T')[0],
    amount: '',
    payment_method: '',
    notes: ''
  });

  const handlePaymentInfoChange = (event) => {
    setPaymentInfo({
      ...paymentInfo,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = () => {
    onSubmit(paymentInfo);
    setPaymentInfo({
      payment_date: new Date().toISOString().split('T')[0],
      amount: '',
      payment_method: '',
      notes: ''
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ 
        color: 'rgb(194, 131, 54)',
        fontWeight: 500 
      }}>
        {title || 'Add Payment'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Payment Date"
            type="date"
            name="payment_date"
            value={paymentInfo.payment_date}
            onChange={handlePaymentInfoChange}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Amount"
            type="number"
            name="amount"
            value={paymentInfo.amount}
            onChange={handlePaymentInfoChange}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="payment-method-label">Payment Method</InputLabel>
            <Select
              labelId="payment-method-label"
              id="payment-method"
              name="payment_method"
              value={paymentInfo.payment_method}
              label="Payment Method"
              onChange={handlePaymentInfoChange}
            >
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="upi">UPI</MenuItem>
              <MenuItem value="online">Online</MenuItem>
              <MenuItem value="unpaid">Unpaid</MenuItem>
            </Select>
          </FormControl>
        
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button 
          onClick={onClose}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          sx={{
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            padding: '8px 22px',
            '&:hover': {
              background: 'linear-gradient(45deg, #FE5179 30%, #FF7D42 90%)',
              boxShadow: '0 4px 6px 2px rgba(255, 105, 135, .4)',
            }
          }}
        >
          Add Payment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const PatientHistory = () => {
  const { patientId } = useParams();

  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);


  const { loading, error, data, refetch  } = useQuery(GET_PATIENT_HISTORY_QUERY, {
    variables: { patient_id: parseInt(patientId) },
    skip: !patientId
  });

    // Add delete mutation
  const [deleteVisit] = useMutation(DELETE_VISIT);
  const [addVisit] = useMutation(ADD_VISIT);


    // Add delete handler
  const handleDelete = async (id) => {
    setSelectedDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteVisit({
        variables: {
          id: selectedDeleteId
        }
      });
      setDeleteDialogOpen(false);
      refetch(); // Refresh the list
    } catch (error) {
      console.error('Error deleting visit:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleAddVisit = async (visitInfo) => {
    try {
      await addVisit({
        variables: {
          patient_id: parseInt(patientId),
          ...visitInfo
        }
      });
      setOpenDialog(false);
      refetch();
    } catch (error) {
      console.error('Error adding visit:', error);
    }
  };

  const handleEditVisit = async (visitInfo) => {
    try {
      // Add your edit mutation logic here
      setOpenEditDialog(false);
      refetch();
    } catch (error) {
      console.error('Error editing visit:', error);
    }
  };

  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [addPayment] = useMutation(ADD_PAYMENT);

  const handleAddPayment = async (paymentInfo) => {
    try {
      await addPayment({
        variables: {
          patient_id: parseInt(patientId),
          amount: parseFloat(paymentInfo.amount),
          ...paymentInfo
        }
      });
      setOpenPaymentDialog(false);
      refetch();
    } catch (error) {
      console.error('Error adding payment:', error);
    }
  };

  const handleDownload = (base64File, fileName) => {
    const link = document.createElement('a');
    link.href = base64File;
    link.download = fileName || 'prescription';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;


  if (!data?.patients_by_pk || !data.patients_by_pk.patient_histories?.length) {
    return (
      <Box sx={{ 
        minHeight: '70vh',
        padding: 3,
        backgroundColor: '#f5f5f5b3'  // Optional: adds a subtle background color
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            color: 'rgb(194, 131, 54)',
            fontWeight: 600,
            mb: 3
          }}
        >
          Patient History
        </Typography>
        
        <StyledCard>
        <CardContent>
            <Alert 
              severity="info"
              sx={{
                borderRadius: 2,
                '& .MuiAlert-icon': {
                  fontSize: '2rem'
                }
              }}
            >
              No history found for this patient.
            </Alert>
          </CardContent>
        </StyledCard>

        <Box sx={{ display: 'flex', gap: 3 }}>  
        <Button
          onClick={() => setOpenDialog(true)}
          sx={{
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            height: 48,
            padding: '0 30px',
            '&:hover': {
              background: 'linear-gradient(45deg, #FE5179 30%, #FF7D42 90%)',
              boxShadow: '0 4px 6px 2px rgba(255, 105, 135, .4)',
            }
          }}
        >
          Add Visit
        </Button>
        <Button
            onClick={() => setOpenPaymentDialog(true)}
            sx={{
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              border: 0,
              borderRadius: 3,
              boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
              color: 'white',
              height: 48,
              padding: '0 30px',
              '&:hover': {
                background: 'linear-gradient(45deg, #FE5179 30%, #FF7D42 90%)',
                boxShadow: '0 4px 6px 2px rgba(255, 105, 135, .4)',
              }
            }}
          >
            Add Payment
        </Button>
        </Box>
        <AddVisitDialog 
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onSubmit={handleAddVisit}
          title="Add New Visit"
        />
        <PaymentDialog 
          open={openPaymentDialog}
          onClose={() => setOpenPaymentDialog(false)}
          onSubmit={handleAddPayment}
          title="Add Payment"
        />
      </Box>
    );
  }

  const patient = data.patients_by_pk;

  return (
    <Box
    sx={{ 
      padding: 3,
      backgroundColor: '#f5f5f5b3'  // Optional: adds a subtle background color
    }}
    >
      <Typography 
        variant="h4" 
        sx={{ 
          color: 'rgb(194, 131, 54)',
          fontWeight: 600,
          mb: 3
        }}
      >
        Patient History
      </Typography>
      <Box sx={{ display: 'flex', gap: 3 }}>  
      <Button
          onClick={() => setOpenDialog(true)}
          sx={{
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            height: 48,
            padding: '0 30px',
            '&:hover': {
              background: 'linear-gradient(45deg, #FE5179 30%, #FF7D42 90%)',
              boxShadow: '0 4px 6px 2px rgba(255, 105, 135, .4)',
            }
          }}
        >
          Add Visit
      </Button>
      <Button
            onClick={() => setOpenPaymentDialog(true)}
            sx={{
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              border: 0,
              borderRadius: 3,
              boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
              color: 'white',
              height: 48,
              padding: '0 30px',
              '&:hover': {
                background: 'linear-gradient(45deg, #FE5179 30%, #FF7D42 90%)',
                boxShadow: '0 4px 6px 2px rgba(255, 105, 135, .4)',
              }
            }}
          >
            Add Payment
      </Button>
      </Box>
      <PaymentDialog 
        open={openPaymentDialog}
        onClose={() => setOpenPaymentDialog(false)}
        onSubmit={handleAddPayment}
        title="Add Payment"
      />
      <AddVisitDialog 
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleAddVisit}
        title="Add New Visit"
      />
      
      <StyledCard sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom
          sx={{
            color: 'rgb(194, 131, 54)',
            fontWeight: 600,
            mb: 3
          }}
          >
            Patient Details
          </Typography>
          <Box sx={{ 
              display: 'flex', 
              gap: 4,
              alignItems: 'center'
            }}>
          <Typography>
            <strong>Name:</strong> {patient.first_name} {patient.last_name}
          </Typography>
          <Typography>
            <strong>Age:</strong> {patient.age}
          </Typography>
          <Typography>
            <strong>Gender:</strong> {patient.gender}
          </Typography>
          </Box>
          {/* <Typography>
            <strong>Medical History:</strong> {patient.medical_history || 'No medical history available'}
          </Typography> */}
        </CardContent>
      </StyledCard>

      {/* Show patient history if available */}
      {patient.patient_histories && patient.patient_histories.length > 0 && (
         <StyledCard>
          <CardContent>
            <Typography variant="h6" gutterBottom
            sx={{
              color: 'rgb(194, 131, 54)',
              fontWeight: 600,
              mb: 3
            }}
            >
              Visit History
            </Typography>
            <ScrollableBox>
              {patient.patient_histories.map((history, index) => (
                <Box key={index} sx={{ mb: 2, pb: 2, position: 'relative', borderBottom: index !== patient.patient_histories.length - 1 ? '1px solid #eee' : 'none' }}>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Box sx={{ 
                        display: 'flex', 
                        gap: 4,
                        alignItems: 'center'
                      }}>
                      <Typography><strong>Date:</strong> {new Date(history.visit_date).toLocaleDateString()}</Typography>
                      <Typography>
                        <strong>Diagnosis:</strong> {history.diagnosis ? history.diagnosis.trim() : 'NA'}
                      </Typography>
                      </Box>
                      {/* <Typography>
                        <strong>Treatment:</strong> {history.treatment ? history.treatment.trim() : 'NA'}
                      </Typography> */}
                      <Typography>
                        <strong>Prescription:</strong>{' '}
                        {history.prescription_file ? (
                          <Button
                            size="small"
                            startIcon={<DownloadIcon />}
                            onClick={() => handleDownload(history.prescription_file, `prescription_${history.visit_date}`)}
                            sx={{ mt: 1 }}
                          >
                            Download Prescription
                          </Button>
                        ) : 'NA'}
                      </Typography>
                    </Box> 
                    <IconButton 
                      onClick={() => handleDelete(history.id)}
                      color="error"
                      size="small"
                      sx={{ 
                        '&:hover': {
                          backgroundColor: 'rgba(211, 47, 47, 0.04)'
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </ScrollableBox>
            <DeleteConfirmDialog
              open={deleteDialogOpen}
              onClose={() => setDeleteDialogOpen(false)}
              onConfirm={handleConfirmDelete}
            />
          </CardContent>
        </StyledCard>
      )}

    </Box>
  );
};

export default PatientHistory;
