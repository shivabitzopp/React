
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  InputAdornment,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import LockIcon from '@mui/icons-material/Lock';


const StyledContainer = styled(Container)(({ theme }) => ({
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: theme.spacing(4),
  width: '400px', 
  height: '300px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const PaddedTextField = styled(TextField)(({ theme }) => ({
 marginBottom: theme.spacing(1), 
 width: '350px', 
 height: '70px'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: '#4caf50',
  color: 'white',
  '&:hover': {
    backgroundColor: '#388e3c',
  },
}));

function AdminLoignPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/admin/login/', {
        email,
        password,
      });

      const { access } = response.data;
      localStorage.setItem('token', access);
      localStorage.setItem('email', email);
      navigate('/dashboard'); 
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrors({ password: 'Invalid credentials', email: 'Invalid credentials' });
      } else {
        console.error('Login error:', error);
      }
    }
  };

  return (
    <Box height="80vh" display="flex" justifyContent="center" alignItems="center">
      <StyledContainer>
        <Typography component="h1" variant="h5" align="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <PaddedTextField
            variant="outlined"
            fullWidth
            id="emailid"
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(errors.email)}
            helperText={errors.email}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountCircleIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <PaddedTextField
            variant="outlined"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={Boolean(errors.password)}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LockIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <StyledButton disabled={email && password ? false : true} type="submit" fullWidth>
            Admin
          </StyledButton>
        </form>
      </StyledContainer>
    </Box>
  );
}

export default AdminLoignPage;
