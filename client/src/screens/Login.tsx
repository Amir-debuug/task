import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MainButton from "../items/MainButton";
import useStyles from "../mui/useStyles";
import { authparam } from "../typescript/types";
import { Link, useNavigate } from "react-router-dom";
import authServices from "../services/authServices";
import { ToastContainer, toast } from 'react-toastify';

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<authparam>({
    email: "",
    password: "",
  });
  const [remeberMe, setRemeberMe] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if(!loginData.email || !loginData.password) {
      toast.error("Please enter Email and Password")
      return
    }

    const response: any = await authServices.userlogin(loginData);

    if (response?.data?.error === false) {
      await localStorage.setItem("accesstoken", response?.data?.accessToken);
      if (remeberMe) localStorage.setItem("refreshtoken", response?.data?.refreshToken);
      navigate("/", { replace: true });
    }
    if(response?.response?.data?.error === true) {
      toast.error(response?.response?.data?.message)
    }
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            color={loginData.email ? "success" : "error"}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e): void =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
          <TextField
            color={loginData.password ? "success" : "error"}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e): void =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="secondary"
                onChange={(e) => setRemeberMe(e.target.checked)}
              />
            }
            label="Remember me"
          />
          <Box className={classes.modalbtn}>
            <MainButton
              text="Sign In"
              variant="contained"
              color="secondary"
              fullWidth={true}
              onClick={handleSubmit}
            />
          </Box>
          <Grid container>
            <Grid item>
              <Link to="/signup" className={classes.link}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
