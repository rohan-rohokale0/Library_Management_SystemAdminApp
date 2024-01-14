import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Switch,
  Typography,
  styled,
} from "@mui/material";
import {
  Box,
  Button,
  CardContent,
  Divider,
  Grid,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TextField,
  TableRow,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Navigate, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { error } from "console";
import { getRequest, postRequest } from "../../Services/httpservice";
import axios, { AxiosError, AxiosResponse } from "axios";
import { apiURL } from "../../Constant/ApiUrlConstant";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../Components/loader";
import FileUpload from "react-material-file-upload";
import { Girl } from "@mui/icons-material";

export interface CategoryViewModel {
  id: string;
  categoryName: string;
}

const styles = {
  hidden: {
    display: "none",
  },
  importLabel: {
    color: "black",
  },
};

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const ContentBox = styled(Box)(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)",
}));

const JWTRoot = styled(JustifyBox)(() => ({
  // background: '#1A2038',
  minHeight: "100vh !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center",
  },
}));

const H4 = styled("h4")(({ theme }) => ({
  marginBottom: "0px",
  marginTop: "0px",
  fontSize: "16px",
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

export default function UpdateProduct() {
  const navigate = useNavigate();
  const [categoryList, setCategoryDetails] = useState<CategoryViewModel[]>([]);
  const [productImageBase64, SetProductImage] = React.useState<any | null>(
    null
  );
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const NavigateToBack = async () => {
    navigate("/home/product-list");
  };
  const validationSchema = Yup.object({
    productName: Yup.string().required("Please Enter Product Name"),
    categoryName: Yup.string().required("Please Select Category Name"),
    productCode: Yup.string().required("Please Enter Product Code"),
    productPrice: Yup.string().required("Please Enter Product Price"),
    productSalePrice: Yup.string().required("Please Enter Product Sale Price"),
    productQuanitity: Yup.string().required("Please Enter Product Quanitity"),
    productDescription: Yup.string().required("Please Enter Product Descriptions"),
  });

  const formik = useFormik({
    initialValues: {
      productName: "",
      categoryName: "",
      productCode: "",
      productPrice: "",
      productSalePrice: "",
      productQuanitity: "",
      productDescription:""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      debugger
      setIsLoading(true);
      try {
        const requestData = {
          productName: values.productName,
          categoryId: values.categoryName,
          productImage: productImageBase64,
          productStatus: true,
        };
        const axiosResponse: AxiosResponse<any> = await postRequest(
          "http://localhost:5454/" + apiURL.ADD_PRODUCT,
          requestData
        );
        if (axiosResponse.status == 200) {
          const LoginApiResponse: any = axiosResponse.data;
          toast.success(LoginApiResponse.message);
        }
        setIsLoading(false);
      } catch (e: any) {
        toast.error(e.message);
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    getCategoryDetails();
  }, []);

  

  const getCategoryDetails = async () => {
    try {
      //  setIsLoading(true);
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await getRequest(
        "http://localhost:5454/category/getCategory"
      );
      debugger;
      if (response == null) throw new Error(`HTTP error! Status`);
      if (response.status === 401) {
        return;
      }
      const data = response.data;
      setCategoryDetails(data);
      //   setIsLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // setIsLoading(false);
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          if (axiosError?.response.status == 401) {
            navigate("/");
          }
        }
      }
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <Card sx={{ p: 2 }} className="card">
        <H4>Update Product</H4>
        <HR></HR>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <Grid item xs={12}>
                <TextField
                  id="productName"
                  name="productName"
                  label="Product Name"
                  placeholder="Product Name"
                  size="small"
                  variant="outlined"
                  fullWidth
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.productName}
                  sx={{ mb: 2 }}
                  error={
                    formik.touched.productName &&
                    Boolean(formik.errors.productName)
                  }
                  helperText={
                    formik.touched.productName && formik.errors.productName
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="productCode"
                  name="productCode"
                  label="Product Code"
                  placeholder="Product Code"
                  size="small"
                  variant="outlined"
                  fullWidth
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.productCode}
                  sx={{ mb: 2 }}
                  error={
                    formik.touched.productCode &&
                    Boolean(formik.errors.productCode)
                  }
                  helperText={
                    formik.touched.productCode && formik.errors.productCode
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="productSalePrice"
                  name="productSalePrice"
                  label="Product Sale Price"
                  placeholder="Product Sale Price"
                  size="small"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.productSalePrice}
                  error={
                    formik.touched.productSalePrice &&
                    Boolean(formik.errors.productSalePrice)
                  }
                  helperText={
                    formik.touched.productSalePrice &&
                    formik.errors.productSalePrice
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="productQuanitity"
                  name="productQuanitity"
                  label="Product Quantity"
                  placeholder="Product Quantity"
                  size="small"
                  variant="outlined"
                  fullWidth
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{ mb: 2 }}
                  value={formik.values.productQuanitity}
                  error={
                    formik.touched.productQuanitity &&
                    Boolean(formik.errors.productQuanitity)
                  }
                  helperText={
                    formik.touched.productQuanitity &&
                    formik.errors.productQuanitity
                  }
                />
              </Grid>

              {/* <Grid item xs={12}>
                <TextField
                  id="productName"
                  name="productName"
                  label="Product Description"
                  placeholder="Product Description"
                  size="small"
                  variant="outlined"
                  fullWidth
                  multiline
                  maxRows={8}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{ mb: 2 }}
                  value={formik.values.productName}
                  error={
                    formik.touched.productName &&
                    Boolean(formik.errors.productName)
                  }
                  helperText={
                    formik.touched.productName && formik.errors.productName
                  }
                />
              </Grid> */}

              <Grid item xs={12}>
                <TextField
                  id="productDescription"
                  label="Product Descriptions"
                  placeholder="Product Descriptions"
                  multiline
                  rows={1.5}
                  fullWidth

                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{ mb: 2 }}
                  value={formik.values.productDescription}
                  error={
                    formik.touched.productDescription &&
                    Boolean(formik.errors.productDescription)
                  }
                  helperText={
                    formik.touched.productDescription &&
                    formik.errors.productDescription
                  }
                />
              </Grid>
            </Grid>

            <Grid item sm={6} xs={12}>
              <Grid item xs={12}>
                <TextField
                  id="filled-select-currency"
                  select
                  label="Category Name"
                  placeholder="Category Name"
                  defaultValue="EUR"
                  name="categoryName"
                  fullWidth
                  size="small"
                  sx={{ mb: 2 }}
                  value={formik.values.categoryName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.categoryName &&
                    Boolean(formik.errors.categoryName)
                  }
                  helperText={
                    formik.touched.categoryName && formik.errors.categoryName
                  }
                >
                  {categoryList.map((option: any) => (
                    <MenuItem key={option.categoryName} value={option.id}>
                      {option.categoryName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="productPrice"
                  name="productPrice"
                  label="Product Price"
                  placeholder="Product Price"
                  size="small"
                  variant="outlined"
                  fullWidth
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.productPrice}
                  error={
                    formik.touched.productPrice &&
                    Boolean(formik.errors.productPrice)
                  }
                  helperText={
                    formik.touched.productPrice && formik.errors.productPrice
                  }
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={12}>
                <FileUpload value={files} onChange={setFiles} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container sx={{ mt: 2 }} justifyContent={"space-between"}>
              <Grid>
                <Button
                  onClick={NavigateToBack}
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
                  Save Product
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Card>
    </div>
  );
}
