import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { BASE_URL } from '../../../Utils/Utils';
import Cookies from 'js-cookie';
import { blue } from '@mui/material/colors';

const Login = () => {

  const { handleSubmit, control, resset } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }


  })

  let navigate = useNavigate()

  const onSubmit = async (obj) => {
    try {
      let res = await axios.post(`${BASE_URL}/auth/login`, obj)
      console.log("Login user Response.. ",res.data)

      Cookies.set("token",res.data.token)
      
      if(res.data.loginUser.type === 'vendor'){
        navigate('/vender-dashbord')
      }else if(res.data.loginUser.type === 'admin'){
        navigate("/adminDashbord")
      }else if(res.data.loginUser.type === 'customer'){
        navigate("/CustomerDashbord")
      }

      alert(res.data.message)

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
        backgroundColor: '#f5f5f5',
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: 350 }}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Login
        </Typography>

        <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='email'
            control={control}
            render={({ field, formState: { errors } }) => <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              required
              {...field}
            />}
          />

          <Controller
            name='password'
            control={control}
            render={({ field, formState: { errors } }) => <TextField
              fullWidth
              label="password"
              type="password"
              margin="normal"
              required
              {...field}
            />}
          />

          <Box mt={'10px'} >
            <span >don't have an Acount <Link style={{textDecoration:"none", color: "#95e500ff"}} to="/signup"
            >sigu-up</Link> </span>
          </Box>


          <Button
            fullWidth
            variant="contained"
            sx={{ marginTop: 2 , bgcolor : "#95e500ff" }}
            type="submit"
          >
            Login

          </Button>

        </Box>





      </Paper>
    </Box>
  );
};

export default Login;
