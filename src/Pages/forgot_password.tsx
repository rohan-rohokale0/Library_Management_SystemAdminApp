import { LoadingButton } from '@mui/lab';
import { Card, Grid, TextField } from '@mui/material';
import { Box, styled, useTheme } from '@mui/material';
import { Formik } from 'formik';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import ImageSlider from '../Components/Carousel/ImageSlider';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));
const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));
const ContentBox = styled(Box)(() => ({
  height: '100%',
  padding: '32px',
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.01)'
}));
const JWTRoot = styled(JustifyBox)(() => ({
  // background: '#1A2038',
  minHeight: '100vh !important',
  width:'100%',
  '& .card': {
    // maxWidth: 800,
    minHeight: 400,
    width:'50%',
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center'
  }
}));
const H4 = styled('h4')(({ theme }) => ({
  fontSize: '1.3rem',
  fontWeight: '600',
  marginBottom: '16px',
  textTransform: 'capitalize',
  color: "#2a2626",
}));
// inital login credentials
const initialValues = {
  email: '',
  password: '',
};
// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be 6 character length')
    .required('Password is required!'),
  email: Yup.string().email('Invalid Email address').required('Email is required!')
});

const ForgotPassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // const { login } = useAuth();

  const handleFormSubmit = async (values: any) => {
    setLoading(true);
    // try {
    //   // await login(values.email, values.password);
    //   navigate('/');
    // } catch (e) {
    //   setLoading(false);
    // }
    navigate('/home');
    
  };

  return (
    <JWTRoot>
      <Card className="card">
        <Grid container sm={12} xs={12}>
          <Grid item sm={6} xs={12}>
            <Box p={0} height="100%" sx={{ minWidth: 320 }}>
            <ImageSlider />
            </Box>
          </Grid>
          <Grid item sm={6} xs={12} >
            <ContentBox  >
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <Box textAlign='center' sx={{ mb: 4 }}>
                      <H4>Forgot Password</H4>
                    </Box>
                    <Grid xs={12} md={12}>
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
                    </Grid>
                    <Grid>
                   
                    </Grid>
                    <FlexBox justifyContent="space-between">
                      <NavLink
                        to="/session/forgot-password"
                        style={{ color: theme.palette.primary.main }}
                      >
                        Login
                      </NavLink>
                    </FlexBox>
                    <Box textAlign='center'>
                      <LoadingButton style={{ maxWidth: '120px', maxHeight: '35px', minWidth: '120px', minHeight: '35px' }}
                        type="submit"
                        color="primary"
                        loading={loading}
                        variant="contained"
                        sx={{ my: 2 }}
                      >
                        Send Link
                      </LoadingButton>
                    </Box>

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

export default ForgotPassword;
