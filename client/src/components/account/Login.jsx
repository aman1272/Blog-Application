import React, { useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
const theme = createTheme();

const Login = ({ isUserAuthenticated }) => {
    const { setAccount } = useContext(DataContext);

    const navigate = useNavigate()
    const initData = {
        username: '',
        password: '',
    }
    const [data, setData] = useState(initData)
    const [isValidate, setIsvalidate] = useState(initData)
    const emailPattern = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
    const regExpPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    const handleValidate = (e) => {
        let obj = {}, status = true
        if (emailPattern.test(data.username) == false) {
            obj.username = "Validation Error eg: xxxx@ss.zz"
            status = false
        }
        if (regExpPassword.test(data.password) == false) {
            obj.password = "Validation Error eg: Use atleast one number and Special Character , length 6-15"
            status = false
        }
        setIsvalidate(obj);
        return status;
    }
    const handleChange = (props) => {
        setData({ ...data, [props.target.name]: props.target.value })
        handleValidate()

    };

    const handleSubmit = async (e) => {
        if (data.username === "" || data.password === "") {
            return
        } else {
            let status = true
            status = handleValidate();
            if (status) {
                let response = await API.userLogin(data);
                if (response.isSuccess) {
                    sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
                    sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
                    setAccount({ name: response.data.name, username: response.data.username });
                    isUserAuthenticated(true)
                    navigate('/')
                }
                else {
                    console.log("API failed")
                }
            };
        }

    }


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
                        <AccountCircleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <TextField
                            error={isValidate.username}
                            margin="normal"
                            required
                            fullWidth
                            onChange={handleChange}
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            helperText={isValidate.username}
                            autoFocus
                        />

                        <TextField
                            error={isValidate.password}
                            margin="normal"
                            required
                            fullWidth
                            onChange={handleChange}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            helperText={isValidate.password}
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Tooltip title="This Page in Under Progress">
                                    <Link to='/login' >
                                        Forgot password?
                                    </Link>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <Link to='/signUp'>
                                    {"Register here?"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Login;