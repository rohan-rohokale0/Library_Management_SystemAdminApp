import {
  Box,
  Button,
  Card,
  FormControlLabel,
  Grid,
  MenuItem,
  Switch,
  styled,
} from "@mui/material";
import { AxiosResponse } from "axios";
import * as Yup from "yup";
import { postRequest } from "../../Services/httpservice";
import { apiURL } from "../../Constant/ApiUrlConstant";
import { useState } from "react";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const H4 = styled("h4")(({ theme }) => ({
  marginBottom: "0px",
  marginTop: "0px",
  fontSize: "20px",
  fontWeight: "500",
  lineHeight: "1.5",
  textTransform: "none",
}));

const HR = styled("hr")(({ theme }) => ({
  margin: "10px 0px 24px",
  flexShrink: "0",
  borderWidth: "0px 0px thin",
  borderStyle: "solid",
  borderColor: "rgba(0,0,0.12)",
}));
interface UserType {
  id: string;
  userType: string;
}

export default function AddUsers() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checked, setChecked] = useState(false);
  let categoryList: UserType[] = [
    { id: "Admin", userType: "Admin" },
    { id: "User", userType: "User" },
    { id: "Guest", userType: "Guest" },
  ];

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Please Enter First Name"),
    lastName: Yup.string().required("Please Enter Last Name"),
    email: Yup.string().required("Please Enter Email"),
    password: Yup.string().required("Please Enter Password"),
    userType: Yup.string().required("Please Select User Type"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userType: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      debugger
      setIsLoading(true);
      try {
        const requestData = {
          firstName: values.firstName,
          lastName: values.lastName,
          password: values.password,
          email: values.email,
          type: values.userType,
          status:'',
        };
        console.log(requestData);
        debugger;
        const axiosResponse: AxiosResponse<any> = await postRequest(
          "https://localhost:7014/api/users/register",
          requestData
        );
        if (axiosResponse.status == 200) {
          const LoginApiResponse: any = axiosResponse.data;
          // toast.success(LoginApiResponse.message);
        }
        setIsLoading(false);
      } catch (e: any) {
        //toast.error(e.message);
        setIsLoading(false);
      }
    },
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <Card sx={{ p: 2 }} className="card">
        <H4>Add Users</H4>
        <HR></HR>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={4}>
              <TextField
                id="firstName"
                name="firstName"
                label="First Name"
                placeholder="First Name"
                size="small"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                sx={{ mb: 2 }}
                error={Boolean(
                  formik.touched.firstName && formik.errors.firstName
                )}
                helperText={
                  formik.touched.firstName && formik.errors.firstName
                    ? (formik.errors.firstName as string) // Type assertion here
                    : ""
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="lastName"
                name="lastName"
                label="Last Name"
                placeholder="Last Name"
                size="small"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                sx={{ mb: 2 }}
                error={Boolean(
                  formik.touched.lastName && formik.errors.lastName
                )}
                helperText={
                  formik.touched.lastName && formik.errors.lastName
                    ? (formik.errors.lastName as string) // Type assertion here
                    : ""
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="email"
                name="email"
                label="Email"
                placeholder="Email"
                size="small"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                sx={{ mb: 2 }}
                error={Boolean(formik.touched.email && formik.errors.email)}
                helperText={
                  formik.touched.email && formik.errors.email
                    ? (formik.errors.email as string) // Type assertion here
                    : ""
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="password"
                name="password"
                label="Password"
                placeholder="Password"
                size="small"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                sx={{ mb: 2 }}
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                helperText={
                  formik.touched.password && formik.errors.password
                    ? (formik.errors.password as string) // Type assertion here
                    : ""
                }
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="filled-select-currency"
                select
                label="User Type"
                placeholder="User Type"
                defaultValue="EUR"
                name="userType"
                fullWidth
                size="small"
                sx={{ mb: 2 }}
                value={formik.values.userType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.userType && Boolean(formik.errors.userType)
                }
                helperText={
                  formik.touched.userType && formik.errors.userType
                    ? (formik.errors.userType as string) // Type assertion here
                    : ""
                }
              >
                {categoryList.map((option: any) => (
                  <MenuItem key={option.userType} value={option.id}>
                    {option.userType}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              xs={4}
              style={{
                alignItems: "left",
              }}
            >
              <Box component="div" style={{ marginBottom: 0.2 }}>
                {" "}
                {/* Adjust margin as needed */}
                <label>Status</label>
              </Box>
              <FormControlLabel
                control={<Switch checked={checked} onChange={handleChange} />}
                label={checked ? "" : ""}
                labelPlacement="bottom" // Note: This does not move the label below, but we'll keep it for semantic clarity
                style={{ marginLeft: 0, marginRight: 0 }} // Adjust styling as needed
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container sx={{ mt: 2 }} justifyContent={"space-between"}>
              <Grid>
                <Button
                  startIcon={<ArrowBackIcon />}
                  variant="contained"
                  style={{
                    maxWidth: "160px",
                    maxHeight: "40px",
                    minWidth: "160px",
                    minHeight: "40px",
                  }}
                >
                  Back
                </Button>
              </Grid>
              <Grid item justifyContent={"flex-end"}>
                <Button
                  style={{
                    maxHeight: "40px",
                    minWidth: "160px",
                    minHeight: "40px",
                  }}
                  variant="contained"
                  type="submit"
                  startIcon={<SaveIcon />}
                >
                  Save User
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Card>
    </div>
  );
}
