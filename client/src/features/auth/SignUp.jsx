import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { setUser } from "../../app/services/slices/authSlice";
import { useRegisterMutation } from "../../app/services/api/authApi";
import { useSnackbar } from 'notistack'
import { useNavigate, Link } from "react-router-dom";


import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function SignUp() {

  const [register, { isLoading }] = useRegisterMutation();
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // credentials
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password1: '',
    password2: '',
    reason: '',
  });

  const handleChange = ({ target: { name, value } }) => (
    setFormState((prev) => ({ ...prev, [name]: value }))
  );

  return (
    <div>
      <Container maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon titleAccess="admin only" />

          </Avatar>

          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Box
            component="form"
            noValidate
            sx={{ mt: 2 }}
          >

            <Grid container spacing={2}>


              {/* First Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>

              {/* Last Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  type="name"
                  autoComplete="family-name"
                  onChange={handleChange}
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>

              {/* Username */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  onChange={handleChange}
                />
              </Grid>

              {/* Password */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password1"
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>

              {/* Confirm Password */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  name="reason"
                  rows={4}
                  label="Tell us a little about why you want to use our project!"
                  type="text"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
              onClick={async () => {
                try {
                  const user = await register(formState).unwrap();
                  dispatch(setUser(user));
                  localStorage.setItem('token', user.token)
                  navigate("/")
                  enqueueSnackbar('You are now signed in', { variant: 'success' });
                } catch (err) {
                  const errorMsg = `Failed - ${err.data.message}`;
                  enqueueSnackbar(errorMsg, { variant: 'error' });
                }
              }
              }

            >
              Sign Up
            </Button>
          </Box>
          <Typography
            sx={{
              mr: 2,
              letterSpacing: '.02rem',
              color: 'light-blue',
              textDecoration: 'none',
            }}
            component={Link}
            to="/sign-in"
          >
            Already Have an Account? Sign-In!
          </Typography>
        </Box>
      </Container>
    </div >
  );
};


