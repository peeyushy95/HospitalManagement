import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ApolloProvider, InMemoryCache } from '@apollo/client';
import { CssBaseline, Container, Typography, Box, Button, Grid, Stack } from '@mui/material';
import AddPatient from './components/AddPatient';
import SearchPatient from './components/SearchPatient';
import PatientHistory from './components/PatientHistory';
import AddPayment from './components/AddPayment';
import TotalPayments from './components/TotalPayments';
import { LocalHospital } from '@mui/icons-material';
import { ApolloClient, DefaultOptions } from '@apollo/client';

const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    mutate: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  };

// Apollo Client setup
const client = new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql', // your Hasura endpoint
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
  headers: {
    'x-hasura-admin-secret': 'secret', // replace with your admin secret
  },
});


function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Box sx={{
                         minHeight: '100vh',
                         background: `url('/image3.jpg')`,
                         backgroundSize: 'cover',
                         backgroundPosition: 'center',
                         backgroundAttachment: 'fixed',
                         backgroundRepeat: 'no-repeat',
                         paddingBottom: 4
                }}>
                <CssBaseline />
                <Container 
                    maxWidth="xl" 
                    sx={{
                        minHeight: '100vh', 
                        paddingY: 2,     
                           
                    '& > *': {
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        borderRadius: 2,
                        padding: 3,
                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
                        backdropFilter: 'blur(4px)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                    }
                    }}
                >
                    <Box sx={{ 
              minHeight: 'calc(100vh - 32px)',  // Account for Container padding
              display: 'flex',
              flexDirection: 'column'
            }}>
          <Stack 
            direction="row" 
            spacing={2} 
            alignItems="center" 
            sx={{ 
              mt: 2,
              mb: 4,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)'
            }}
          >
            <Box
              component="img"
              src="/logo2.png"  // Replace with your logo file name
              alt="Shatam Path Logo"
              sx={{
                height: 50,  // Adjust size as needed
                width: 'auto',
                marginRight: 2
              }}
            />
            {/* <LocalHospital 
              sx={{ 
                fontSize: 40,
                color: 'white'
              }} 
            /> */}
            <Typography 
              variant="h3" 
              component="h1"
              sx={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                letterSpacing: '1px'
              }}
            >
              Shatam Path Wellness Center
            </Typography>
          </Stack>
          <Grid container spacing={2}>
              {/* Main Content Area */}
              <Grid item xs={12} md={9}>
                <Box sx={{ 
                  p: 2,
                  backgroundColor: 'white',
                  borderRadius: 2,
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}>
                  <Routes>
                    <Route path="/" element={<SearchPatient />} />
                    <Route path="/add-patient" element={<AddPatient />} />
                    <Route path="/patient-history/:patientId" element={<PatientHistory />} />
                    <Route path="/add-payment" element={<AddPayment />} />
                    <Route path="/total-payments" element={<TotalPayments />} />
                  </Routes>
                </Box>
              </Grid>
              
              {/* Side Navigation Panel */}
              <Grid item xs={12} md={3}>
                <Box sx={{ 
                  p: 2, 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  position: 'sticky',
                  top: 20,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: 2,
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(4px)',
                }}>
                <Button 
                  component={Link} 
                  to="/" 
                  variant="contained" 
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
                  fullWidth
                >
                  Search Patient
                </Button>
                <Button 
                  component={Link} 
                  to="/add-patient" 
                  variant="contained" 
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
                  fullWidth
                >
                  Add Patient
                </Button>
                {/* <Button 
                  component={Link} 
                  to="/patient-history" 
                  variant="contained" 
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
                  fullWidth
                >
                  Patient History
                </Button> */}
                {/* <Button 
                  component={Link} 
                  to="/add-payment" 
                  variant="contained" 
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
                  fullWidth
                >
                  Add Payment
                </Button> */}
                <Button 
                  component={Link} 
                  to="/total-payments" 
                  variant="contained" 
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
                  fullWidth
                >
                Payments
                </Button>
                </Box>
              </Grid>
            </Grid>
            </Box>
          </Container>
        </Box>
      </Router>
    </ApolloProvider>
  );
}

export default App;
