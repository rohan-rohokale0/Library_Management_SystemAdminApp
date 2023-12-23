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
import CustomSnackbar from "../Components/Snackbar";
import { useForm, SubmitHandler } from "react-hook-form";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const defaultTheme = createTheme();

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(true);
  const [snackbarSeverity, setSnackbarSeverity] = useState(String);

  // const data = async (event: React.FormEvent<HTMLFormElement>) => {
  //     setIsLoading(true);
  //     try {
  //         event.preventDefault();
  //         const data = new FormData(event.currentTarget);
  //         const requestData = {
  //             username: data.get("user"),
  //             password: data.get("password"),
  //         };
  //         const axiosResponse: AxiosResponse<any> = await postRequest(
  //             "https://devapi.specialtypayments.com/" + apiURL.LOGIN,
  //             requestData
  //         );
  //         const LoginApiResponse: any = axiosResponse.data;

  //         if (LoginApiResponse.LoginSuccess) {
  //             navigate("/home");
  //             // setSnackbarOpen(true);
  //             // setSnackbarMessage('login successfully!');
  //             // setSnackbarSeverity('success');
  //         } else {
  //             navigate("/");
  //         }
  //         setIsLoading(true);
  //     } catch (e: any) {
  //         toast.error(e.message);
  //         // setSnackbarMessage(e.message);
  //         // setSnackbarSeverity('error');
  //         // setSnackbarOpen(true);
  //         setIsLoading(false);
  //     }
  // };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
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
            display: "flex",
            justifyContent: "center",
            mt: 10,maxWidth:400
          }}
        >
          <form onSubmit={formik.handleSubmit}>
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
                    <Avatar sx={{ m: 1, mb:2, bgcolor: "secondary.main" }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Sign in
                    </Typography>
                    {isLoading && <Loader />}
                    <Box  sx={{mt:2}}>
                      <TextField
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        placeholder="First Name"
                        size="small"
                     maxRows={10}
                        variant="outlined"
                        fullWidth
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}
                        error={
                          formik.touched.firstName &&
                          Boolean(formik.errors.firstName)
                        }
                        helperText={
                          formik.touched.firstName && formik.errors.firstName
                        }
                      />
                    </Box>
                    <Box>
                      <TextField
                        id="email"
                     
                        name="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        size="small"
                        margin="normal"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                      />
                    </Box>
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
                  </Box>
                  <ToastContainer position="bottom-center" autoClose={5000} />
                </Grid>
              </Grid>
            </CardContent>
          </form>
        </Card>
      </div>
    </ThemeProvider>
  );
}
