import { LoadingButton } from "@mui/lab";
import { Card, Checkbox, Grid, TextField, Typography } from "@mui/material";
import { Box, styled, useTheme } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ImageSlider from "../Components/Carousel/ImageSlider";
import { Paragraph } from "../Components/Typography";
import { apiURL } from "../Constant/ApiUrlConstant";
import { AxiosResponse } from "axios";
import { postRequest } from "../Services/httpservice";
import Loader from "../Components/loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));
const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));
const ContentBox = styled(Box)(() => ({
  height: "100%",
  padding: "10px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)",
}));

const JWTRoot = styled(JustifyBox)(() => ({
  // background: '#1A2038',
  minHeight: "100vh !important",

  "& .card": {
    // maxWidth: 800,
    // minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center",
  },
}));

const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1.3rem",
  fontWeight: "600",
  marginBottom: "16px",
  textTransform: "capitalize",
  color: "#2a2626",
}));

// inital login credentials
const initialValues = {
  email: "",
  password: "",
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
});

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleFormSubmit = async (values: any) => {
    setLoading(true);
    try {
      const requestData = {
        email: values.email,
        password: values.password,
      };
      const url= process.env.REACT_APP_API_URL + apiURL.LOGIN;
    debugger
      const axiosResponse: AxiosResponse<any> = await postRequest(
        process.env.REACT_APP_API_URL + apiURL.LOGIN,
        requestData
      );
      const LoginApiResponse: any = axiosResponse.data;
      if (LoginApiResponse.success) {
        toast.success("Login Sucessfully !!");
        localStorage.setItem("Users", JSON.stringify(LoginApiResponse.resultData));
        navigate("/home");
      } else {
        setLoading(false);
        toast.error(LoginApiResponse.statusMessage);
      }
      setLoading(true);
    } catch (e: any) {
      toast.error(e.message);
      setLoading(false);
    }
  };

  return (
    <JWTRoot>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <Box p={0} height="100%" sx={{ minWidth: 320 }}>
              <ImageSlider />
            </Box>
          </Grid>
          <Grid item sm={6} xs={12}>
            <ContentBox>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    {loading && <Loader />}
                    <Box textAlign="center" sx={{ mb: 4 }}>
                      <H4>Login</H4>
                    </Box>
                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 1.1 }}
                    />
                    <FlexBox justifyContent="space-between">
                      <NavLink
                        to="/auth/forgot-password"
                        style={{ color: theme.palette.primary.main }}
                      >
                        Forgot password?
                      </NavLink>
                      {/* <p>Don't have an account?</p>  */}
                      {/* <NavLink
                        to="/auth/forgot-password"
                        style={{ color: theme.palette.primary.main }}
                      > Register
                      </NavLink> */}
                    </FlexBox>
                    {/* <FlexBox justifyContent="space-between">
                      <NavLink
                        to="/auth/forgot-password"
                        style={{ color: theme.palette.primary.main }}
                      >
                        Forgot password?
                      </NavLink>
                    </FlexBox> */}
                    <Box textAlign="center">
                      <LoadingButton
                        style={{
                          maxWidth: "120px",
                          maxHeight: "35px",
                          minWidth: "120px",
                          minHeight: "35px",
                        }}
                        type="submit"
                        color="primary"
                        loading={loading}
                        variant="contained"
                        sx={{ my: 2 }}
                      >
                        Login
                      </LoadingButton>
                    </Box>

                    <FlexBox justifyContent="center">
                      <p>Don't have an account? </p>
                      <NavLink
                        to="/auth/register"
                        style={{ color: theme.palette.primary.main }}
                      >
                        Register
                      </NavLink>
                    </FlexBox>
                  </form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </JWTRoot>
  );
};

export default Login;
