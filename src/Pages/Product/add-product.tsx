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

export default function AddProduct() {
  const navigate = useNavigate();
  const [age, setAge] = React.useState("");
  const [categoryList, setCategoryDetails] = useState<CategoryViewModel[]>([]);
  const [imageUrl, setImageUrl] = useState<any | null>(null);
  const [collapseUpper, setCollapseUpper] = React.useState(false);
  const [productImageBase64, SetProductImage] = React.useState<any | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const NavigateToBack = async () => {
    navigate("/home/product-list");
  };

  const validationSchema = Yup.object({
    productName: Yup.string().required("Please Enter Product Name"),
    categoryName: Yup.string().required("Please Select Category Name"),
  });

  const formik = useFormik({
    initialValues: {
      productName: "",
      categoryName: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        debugger;
        const requestData = {
            productName: values.productName,
            categoryId: values.categoryName,
            productImage: productImageBase64,
            productStatus: collapseUpper,
        };
        const axiosResponse: AxiosResponse<any> = await postRequest(
          "http://localhost:5454/" + apiURL.ADD_PRODUCT,
          requestData
        );
        debugger;
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
    debugger;
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
  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];
    debugger
    const base64 = await convertBase64(file);
    SetProductImage(base64);


    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleCollapse = () => {
    debugger;
    setCollapseUpper((prevState) => !prevState);
  };

  return (
    <div>
      {isLoading && <Loader />}
      <Card sx={{ p: 2 }}>
        <Typography variant="h5">+ Add Product</Typography>
        <hr></hr>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={4} sx={{ p: 2 }}>
            <Grid item xs={6}>
              <TextField
                id="productName"
                rows={6}
                name="productName"
                label="Product Name"
                placeholder="Product Name"
                autoFocus
                size="small"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.productName}
                error={
                  formik.touched.productName &&
                  Boolean(formik.errors.productName)
                }
                helperText={
                  formik.touched.productName && formik.errors.productName
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="filled-select-currency"
                select
                label="Category Name"
                placeholder="Category Name"
                defaultValue="EUR"
                name="categoryName"
                fullWidth
                size="small"
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

            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Upload Image"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputComponent: (props) => (
                    <Input
                      type="file"
                   
                      onChange={handleFileUpload}
                      inputProps={props.inputProps}
                    />
                  ),
                }}
              />
            </Grid>

            <Grid item xs={2}>
              <Card sx={{ p: 0 }}>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Uploaded Image"
                    height="100"
                    width="150"
                  />
                )}
              </Card>
            </Grid>

            <Grid item xs={6}>
              <FormControlLabel
                checked={collapseUpper}
                value="collapseUpper"
                onChange={handleCollapse}
                control={<Switch color="primary" />}
                label="Product Status"
                labelPlacement="top"
              />
            </Grid>

            <Grid item xs={6}></Grid>
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
          </Grid>
        </form>
      </Card>
    </div>
  );
}
