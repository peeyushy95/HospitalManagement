import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { SEARCH_PATIENT_QUERY } from '../graphql/queries';
import { TextField, Button, List, ListItem, ListItemText, Typography, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  margin: '10px 0',
  borderRadius: '10px',
  color: 'rgb(194, 131, 54)',
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
  maxHeight: '400px',  // You can adjust this value
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

const SearchPatient = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(SEARCH_PATIENT_QUERY);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedPatient, setSearchedPatient] = useState(null);

  const handlePatientClick = (patientId) => {
    navigate(`/patient-history/${patientId}`);
  };

  // const calculateAge = (dateOfBirth) => {
  //   const today = new Date();
  //   const birthDate = new Date(dateOfBirth);
    
  //   let years = today.getFullYear() - birthDate.getFullYear();
  //   let months = today.getMonth() - birthDate.getMonth();
  
  //   // Adjust years and months if birth date hasn't occurred this month
  //   if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
  //     years--;
  //     months += 12;
  //   }
  
  //   // Adjust for when today's date is less than birth date
  //   if (today.getDate() < birthDate.getDate()) {
  //     months--;
  //   }
  
  //   // Format the age string
  //   let ageString = '';
  //   if (years > 0) {
  //     ageString += `${years}y `;
  //   }
  //   if (months > 0 || years === 0) {
  //     ageString += `${months}m`;
  //   }
    
  //   return ageString.trim();
  // };
  

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Search logic to filter patients based on the search term
    if (value === "") {
      setSearchedPatient(null);
    } else {
      const patients = data.patients.filter(
        (patient) =>
          patient.first_name.toLowerCase().startsWith(value.toLowerCase()) ||
          patient.last_name.toLowerCase().startsWith(value.toLowerCase())
      );
      setSearchedPatient(patients.length > 0 ? patients : null);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error fetching patients.</Typography>;

  return (
    <div>
      <Typography variant="h4"
      sx={{ 
        color: 'rgb(194, 131, 54)',
        fontWeight: 600,  // Making it slightly bold
        mb: 3  // Adding some margin bottom for better spacing
      }}
      
      >Search Patient</Typography>

      <TextField
        label="Search by First or Last Name"
        variant="outlined"
        fullWidth
        onChange={handleSearch}
        value={searchTerm}
        margin="normal"
      />

      {/* Show searched patient if any */}
      {searchedPatient ? (
        <div>
          <Typography variant="h6">Patients Found:</Typography>
          <ScrollableBox> 
          <List>
            {searchedPatient.map((patient) => (
              <StyledListItem 
                key={patient.id}
                onClick={() => handlePatientClick(patient.id)}
                >
                <ListItemText
                  primary={`${patient.first_name} ${patient.last_name}`}
                  secondary={`Age: ${patient.age} | Gender: ${patient.gender} `}
                />
              </StyledListItem>
            ))}
          </List>
          </ScrollableBox>
        </div>
      ) : (
        searchTerm && (
          <Typography variant="body1" color="textSecondary">
            No patient found with that name.
          </Typography>
        )
      )}

      {/* Show all patients if no search term or patient found */}
      {(!searchTerm || !searchedPatient) && (
        <div>
          <Typography variant="h6">All Patients</Typography>
          <ScrollableBox> 
          <List>
            {data.patients.map((patient) => (
              <StyledListItem 
              key={patient.id}
              onClick={() => handlePatientClick(patient.id)}
              >
                <ListItemText
                  primary={`${patient.first_name} ${patient.last_name}`}
                  secondary={`Age: ${patient.age}  | Gender: ${patient.gender}`}
                />
              </StyledListItem>
            ))}
          </List>
          </ScrollableBox>
        </div>
      )}
    </div>
  );
};

export default SearchPatient;
