import {
    TextField,
    Button,
    Box,
    Typography,
    Paper,
    MenuItem,
} from '@mui/material';
import axios from 'axios';

import { Controller, useForm, } from 'react-hook-form';

import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../Utils/Utils';

const Signup = () => {

    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            userName: "",
            email: "",
            password: "",
            type: ''
        }
    })

    let type = ['customer', 'vendor']

    let navigate = useNavigate()

    const onSubmit = async (obj) => {
        try {
            let res = await axios.post(`${BASE_URL}/auth/signup`, obj)
            console.log(res.data)
            alert(res.data.message)

            reset()
            navigate("/")
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f0f0f0',
            }}
        >
            <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
                <Typography variant="h5" textAlign="center" gutterBottom>
                    Create an Account
                </Typography>

                <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>



                    <Controller
                        name='userName'
                        control={control}
                        render={({ field, formState: { errors } }) => <TextField
                            fullWidth
                            label="Full Name"
                            margin="normal"
                            type='text'
                            required
                            {...field}
                        />}
                    />

                    <Controller
                        name='email'
                        control={control}
                        render={({ field, formState: { error } }) => <TextField
                            fullWidth
                            label="Email"
                            margin="normal"
                            type='email'
                            {...field}
                        />}
                    />

                    <Controller
                        name='password'
                        control={control}
                        render={({ field, formState: { error } }) => <TextField
                            fullWidth
                            label="Password"
                            margin="normal"
                            type='password'
                            {...field}
                        />}
                    />


                    <Controller
                        name='type'
                        control={control}
                        render={({ field, formState: { errore } }) => <TextField
                            fullWidth
                            select
                            label="Choose Your Account Type."
                            name="I am a..."
                            required
                            {...field}

                            margin="normal"
                        >
                            {type.map((cat) => (
                                <MenuItem key={cat} value={cat}>
                                    {cat}
                                </MenuItem>
                            ))}
                        </TextField>


                        }
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2, bgcolor:"#95e500ff" }}
                        type='submit'
                    >
                        Sign Up
                    </Button>

                </Box>



                <Typography variant="body2" sx={{ marginTop: 2, textAlign: 'center' }}>
                    Already have an account? <Link style={{textDecoration: "none", color:"#95e500ff"}} to={"/"}>Login</Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Signup;