import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, TextField, Grid, Box, Typography, Card, CardContent, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { ADD_PATIENT_MUTATION } from '../graphql/mutations';
import DownloadIcon from '@mui/icons-material/Download';

const AddPatient = () => {
  const [patient, setPatient] = useState({
    first_name: '',
    last_name: '',
    age: '',
    gender: '',
  });

  const [addPatient] = useMutation(ADD_PATIENT_MUTATION);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPatient({ variables: { ...patient } });
      alert('Patient Added Successfully');
    } catch (error) {
      alert('Error adding patient');
    }
  };

  return (
    <Card sx={{ 
      marginBottom: 4,
      minHeight: '70vh',
      backgroundColor: '#f5f5f5b3', // Add this to make card take full viewport height
      display: 'flex',    // Add flex display
      flexDirection: 'column',
     }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom
        sx={{ 
          color: 'rgb(194, 131, 54)',
          fontWeight: 500,  // Making it slightly bold
          mb: 3  // Adding some margin bottom for better spacing
        }}
        >
          Add New Patient
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                name="first_name"
                value={patient.first_name}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
              />
            </Grid>

            {/* Last Name Field */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                name="last_name"
                value={patient.last_name}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                variant="outlined"
                type="number"
                name="age"
                value={patient.age}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  name="gender"
                  value={patient.gender}
                  label="Gender"
                  onChange={handleChange}
                >
                  <MenuItem value="M">Male</MenuItem>
                  <MenuItem value="F">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Number"
                variant="outlined"
                name="contact_number"
                value={patient.contact_number}
                onChange={handleChange}
                required
              />
            </Grid> */}
            {/* <Grid item xs={12}>
              <TextField
                fullWidth
                label="Prescription"
                variant="outlined"
                name="prescription"
                value={patient.prescription}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </Grid> */}
                        <Grid item xs={12} sm={6}>
              {/* <TextField
                fullWidth
                label="Medical History"
                variant="outlined"
                name="medical_history"
                value={patient.medical_history}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
              /> */}
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center' }}>
                <Button type="submit" variant="contained" color="primary">
                  Add Patient
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddPatient;
