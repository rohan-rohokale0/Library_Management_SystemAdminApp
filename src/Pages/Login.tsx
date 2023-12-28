import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { AxiosResponse } from "axios";
import { postRequest } from "../Services/httpservice";
import { apiURL } from "../Constant/ApiUrlConstant";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../Components/loader";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  userName: Yup.string().required("User Name is required"),
  password: Yup.string().required("Password is required"),
});

const defaultTheme = createTheme();

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

  // };

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {


      setIsLoading(true);
      try {
        // event.preventDefault();
        // const data = new FormData(event.currentTarget);
        const requestData = {
          username: values.userName,
          password: values.password,
        };
        const axiosResponse: AxiosResponse<any> = await postRequest(
          "https://devapi.specialtypayments.com/" + apiURL.LOGIN,
          requestData
        );
        const LoginApiResponse: any = axiosResponse.data;

        if (LoginApiResponse.LoginSuccess) {
          debugger
          sessionStorage.setItem('accessToken', LoginApiResponse.AccessToken);
          navigate("/home");

          // setSnackbarOpen(true);
          // setSnackbarMessage('login successfully!');
          // setSnackbarSeverity('success');
        } else {
          navigate("/");
        }
        setIsLoading(true);
      } catch (e: any) {
        toast.error(e.message);
      
        setIsLoading(false);
      }
      debugger;
      // Handle form submission
      console.log(values);
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>

      <div
        style={{ justifyContent: "center", display: "flex", padding: "10px" }}
      >
        <Card
          sx={{
            maxWidth: 500,
            display: "flex",
            justifyContent: "center",
            mt: 10,
          }}
        >
          <CardContent>
            <Grid container spacing={0}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 4,
                    p: 1,
                    marginBottom: 4,
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
                  <Box sx={{ mt: 1 }}>
                    {isLoading && <Loader />}
                    <form onSubmit={formik.handleSubmit}>
                      <TextField
                        id="userName"
                        name="userName"
                        label="User Name"
                        placeholder="User Name"
                        size="small"
                        autoFocus

                        variant="outlined"
                        fullWidth
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.userName}
                        error={
                          formik.touched.userName &&
                          Boolean(formik.errors.userName)
                        }
                        helperText={
                          formik.touched.userName && formik.errors.userName
                        }
                      />
                      <TextField
                        id="password"
                        size="small"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
                        }

                      />
                      <Grid container justifyContent="center">
                        <Button
                          style={{
                            maxWidth: "100px",
                            maxHeight: "30px",
                            minWidth: "100px",
                            minHeight: "30px",
                          }}
                          type="submit"

                          size="small"
                          variant="contained"
                          sx={{ mt: 3, mb: 2, maxWidth: "md" }}
                        >
                          Login
                        </Button>
                      </Grid>
                      <Grid container>
                        <Grid item xs>
                          <Typography align="center">
                            <Link href="#" variant="body2">
                              Forgot password?
                            </Link>
                          </Typography>
                        </Grid>
                      </Grid>
                      {/* <Box>
                                <LoginForm></LoginForm>
                                </Box> */}
                    </form>
                  </Box>
                </Box>
                <ToastContainer position="bottom-center" autoClose={5000} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}
