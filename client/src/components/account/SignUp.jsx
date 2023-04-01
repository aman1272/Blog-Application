import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom'
import { API } from '../../service/api';

export default function SignUp({ isUserAuthenticated }) {
    const navigate = useNavigate()
    const initData = {
        name: '',
        mobile: '',
        username: '',
        password: '',
        confirmPassword: ''
    }
    const [data, setData] = useState(initData)
    const [isValidate, setIsValidate] = useState(initData)
    const regexEmail = /^([_\-\.1-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
    const regexPassword = /^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,16}$/
    const regexMobile = /^[0-9]{10,12}$/;
    const regexName = /^[a-zA-Z ]{2,25}$/;

    const forValidate = () => {
        let obj = {}, status = true
        if (regexEmail.test(data.username) == false) {
            obj.email = "Validation Error eg: xxxx@ss.zz"
            status = false
        }
        if (regexName.test(data.name) == false) {
            obj.name = "Validation Error eg:use only Alphabetic Character, Length 2-25"
            status = false
        }
        if (regexPassword.test(data.password) == false) {
            obj.password = "Validation Error eg: Use atleast one number and Special Character , length 6-15"
            status = false
        }
        if (regexMobile.test(data.mobile) == false) {
            obj.mobile = "Validation Error eg: Number length 10-12 digit "
            status = false
        }
        setIsValidate(obj)
        return status;
    }
    const handleChange =
        (prop) => (event) => {
            setData({ ...data, [prop]: event.target.value });
            forValidate()
        }

        const handleSubmit = async (e) => {
        if (data.username === "" || data.name === "" || data.mobile === "" || data.password === "") {
            return
        } else {
            let status = true;
            status = forValidate()
            if (status) {
                let response = await API.userSignup({
                    name: `${data.name}`,
                    username: `${data.username}`,
                    mobile: `${data.mobile}`,
                    password: `${data.password}`
                });
                if (response.isSuccess) {
                    console.log("Regitered Successfully")
                    navigate('/login')
                } else {
                    console.log("API failed")
                }
            }
        }
    };
    const theme = createTheme();
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" className="signInBody2" >
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <PersonAddAltIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box>
                        <TextField
                            error={isValidate.name}
                            margin="normal"
                            required
                            fullWidth
                            onChange={handleChange('name')}
                            name="Name"
                            label="Name"
                            id="name"
                            helperText={isValidate.name}
                            autoComplete="off"
                        />
                        <TextField
                            margin="normal"
                            error={isValidate.mobile}
                            required
                            fullWidth
                            onChange={handleChange('mobile')}
                            id="mobile"
                            label="Mobile"
                            type="number"
                            name="mobile"
                            autoComplete="mobile"
                            helperText={isValidate.mobile}
                            autoFocus
                        />
                        <TextField
                            error={isValidate.username}
                            margin="normal"
                            required
                            fullWidth
                            onChange={handleChange('username')}
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            helperText={isValidate.email}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            error={isValidate.password}
                            fullWidth
                            onChange={handleChange('password')}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            helperText={isValidate.password}
                            autoComplete="current-password"
                        />
                        <TextField
                            error={data.confirmPassword !== data.password}
                            margin="normal"
                            required
                            fullWidth
                            type='password'
                            onChange={handleChange('confirmPassword')}
                            id="confirmPassword"
                            label="Confirm Password"
                            name="confirmPassword"
                            autoComplete="off"
                            helperText={data.confirmPassword == data.password ? "" : "Your password and confirm password are not same"}
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to='/login' >
                                    {"Already have an account?"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}