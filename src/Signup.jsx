// import React, { useState } from 'react';
// import {
//   TextField,
//   Button,
//   Container,
//   CssBaseline,
//   Typography,
// } from '@mui/material';
// import { styled } from '@mui/system';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { createTheme } from '@mui/material/styles';
// import IconButton from '@mui/material/IconButton';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';

// const theme = createTheme();
// const SignupContainer = styled(Container)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   justifyContent: 'center',
//   height: '100vh',
// }));

// const SignupForm = styled('form')(({ theme }) => ({
//   width: '80%',
//   marginTop: theme.spacing(3),
// }));

// const SubmitButton = styled(Button)(({ theme }) => ({
//   margin: theme.spacing(2, 0),
// }));

// const textFieldStyle = {
//   marginBottom: theme.spacing(2),
//   width: '100%',
// };

// const SignupPage = () => {
//     const [email, setEmail] = useState('');
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const navigate = useNavigate();
  
//     const handleShowPassword = () => {
//       setShowPassword(!showPassword);
//     };
//     const handleShowConfirmPassword = () => {
//       setShowConfirmPassword(!showConfirmPassword);
//     };
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       if (password === confirmPassword) {
//         axios
//           .post('http://127.0.0.1:8000/api/register/', {
//             email: email,
//             username: username,
//             password: password,
            
//           })
//           .then(() => {
//             navigate('/login');
//           })
//           .catch((error) => {
//             console.error('Signup error:', error);
//           });
//       } else {
//         console.error('Passwords do not match');
//       }
//     };
    
//   return (
//     <SignupContainer component="main" maxWidth="xs">
//       <CssBaseline />
//       <div>
//         <Typography component="h1" variant="h5">
//           Sign Up
//         </Typography>
//         <SignupForm onSubmit={handleSubmit}>
//           <TextField
//             variant="outlined"
//             fullWidth
//             id="email"
//             label="Email"
//             name="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             size="small"
//             style={textFieldStyle}
//           />
//           <TextField
//             variant="outlined"
//             fullWidth
//             id="username"
//             label="Username"
//             name="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             size="small"
//             style={textFieldStyle}
//           />
//           <TextField
//             variant="outlined"
//             fullWidth
//             name="password"
//             label="Password"
//             type={showPassword ? 'text' : 'password'}
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             size="small"
//             style={textFieldStyle}
//             InputProps={{
//                 endAdornment: (
//                 <IconButton onClick={handleShowPassword} size="small">
//                     {showPassword ? <Visibility /> : <VisibilityOff />}
//                 </IconButton>
//                 ),
//             }}
//             />
//             <TextField
//             variant="outlined"
//             fullWidth
//             name="confirmPassword"
//             label="Confirm Password"
//             type={showConfirmPassword ? 'text' : 'password'}
//             id="confirmPassword"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             size="small"
//             style={textFieldStyle}
//             InputProps={{
//               endAdornment: (
//               <IconButton onClick={handleShowConfirmPassword} size="small">
//                   {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
//               </IconButton>
//               ),
//           }}
//             />
//           <SubmitButton disabled={username && password && email && confirmPassword ? false : true} type="submit" fullWidth variant="contained" color="primary">
//             Sign Up
//           </SubmitButton>
//         </SignupForm>
//         <a href="/login" style={{ marginTop: '16px', textAlign: 'center', textDecoration: 'none', color: 'blue' }}>
//           Already have an account? -Login
//         </a>
//       </div>
//     </SignupContainer>
//   );
// }

// export default SignupPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const StyledContainer = styled(Container)(({ theme }) => ({
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: theme.spacing(4),
  width: '300px', // Fixed width
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const PaddedTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: '100%',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: '#4caf50',
  color: 'white',
  '&:hover': {
    backgroundColor: '#388e3c',
  },
}));

function SignupPage() {
      const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
  
    const handleShowPassword = () => {
      setShowPassword(!showPassword);
    };
    const handleShowConfirmPassword = () => {
      setShowConfirmPassword(!showConfirmPassword);
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      if (password === confirmPassword) {
        axios
          .post('http://127.0.0.1:8000/api/register/', {
            email: email,
            firstname: firstname,
            lastname:lastname,
            password: password,
            confirmPassword:confirmPassword
            
          })
          .then(() => {
            navigate('/login');
          })
          .catch((error) => {
            console.error('Signup error:', error);
          });
      } else {
        console.error('Passwords do not match');
      }
      console.log(email)
      console.log(firstname);
      console.log(lastname);
      console.log(password)
    };
  // ... (existing useState and other logic)

  return (
    <Box height="80vh" display="flex" justifyContent="center" alignItems="center">
      <StyledContainer>
        <Typography component="h1" variant="h5" align="center">
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <PaddedTextField
            variant="outlined"
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="small"
          />
          <PaddedTextField
            variant="outlined"
            fullWidth
            id="firstname"
            label="FirstName"
            name="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            size="small"
            
          />
           <PaddedTextField
            variant="outlined"
            fullWidth
            id="lastname"
            label="LastName"
            name="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            size="small"
            
          />
          <PaddedTextField
            variant="outlined"
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="small"
            
            InputProps={{
                endAdornment: (
                <IconButton onClick={handleShowPassword} size="small">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
                ),
            }}
            />
            <PaddedTextField
            variant="outlined"
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            size="small"
            
            InputProps={{
              endAdornment: (
              <IconButton onClick={handleShowConfirmPassword} size="small">
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
              ),
          }}
            />
          {/* Other text fields for username, password, confirm password */}
          <StyledButton
            disabled={firstname &&lastname && password && email && confirmPassword ? false : true}
            type="submit"
            fullWidth
          >
            Sign Up
          </StyledButton>
        </form>
        <Typography component="p" variant="body2" align="center">
          Already have an account? <a href="/login">Login</a>
        </Typography>
      </StyledContainer>
    </Box>
  );
}

export default SignupPage;

