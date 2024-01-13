import {
  Dialog,
  DialogActions,
  DialogContentText,
  DialogProps,
  Paper,
  Typography,
  createTheme,
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
import { styled, useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent/DialogContent";
import Slide from "@material-ui/core/Slide";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useFormik } from "formik";
import * as Yup from "yup";
import CloseIcon from "@material-ui/icons/Close";
import { apiURL } from "../Constant/ApiUrlConstant";
import { AxiosResponse } from "axios";
import { postRequest } from "../Services/httpservice";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../Components/loader";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const validationSchema = Yup.object({
  categoryName: Yup.string().required("Please Enter Category"),
});

const getMuiTheme = () =>
  createTheme({
    components: {
      MuiDialogContent: {
        styleOverrides: {
          root: {
            padding: "10px",
          },
        },
      },
    },
  });

const AddCategory = ({ open, onDisagree }: any) => {
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("sm");

  const theme = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleDlgClose = (event: any, reason: any) => {
    if (reason && reason == "backdropClick") {
      console.log("backdropClicked. Not closing dialog.");
      return;
    }
    onDisagree = false;
  };
 

  const formik = useFormik({
    initialValues: {
      categoryName: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      debugger;
      setIsLoading(true);
      try {
        debugger;
        const requestData = {
          name: values.categoryName,
        };
        const axiosResponse: AxiosResponse<any> = await postRequest(
          "http://localhost:5454/" + apiURL.ADD_CATEGORY,
          requestData
        );
        debugger;
        if (axiosResponse.status == 200) {
        
          onDisagree=false;
            onDisagree= false;
         
          const LoginApiResponse: any = axiosResponse.data;
          toast.success(LoginApiResponse);
        }
        setIsLoading(false);
      } catch (e: any) {
        toast.error(e.message);
        setIsLoading(false);
      }
    },
  });

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      <Dialog
        PaperProps={{
          sx: {
            width: "50%",
            maxHeight: 300,
            p: 2,
          },
        }}
        open={open}
        fullScreen={fullScreen}
        disableEscapeKeyDown
        maxWidth={maxWidth}
        onClose={handleDlgClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            sx={{ mt: 2, mb: 2 }}
            justifyContent={"space-between"}
          >
            <Grid>
              <DialogTitle id="alert-dialog-title">Add Category</DialogTitle>
            </Grid>
            <Grid item justifyContent={"flex-end"}>
              {/* <IconButton >
            <CloseIcon /> */}
              {/* </IconButton> */}
            </Grid>
          </Grid>
          <Divider></Divider>
          <DialogContent sx={{ p: 2 }}>
            <Grid container spacing={4} sx={{ p: 2 }}>
              <Grid item xs={10}>
                <TextField
                  id="categoryName"
                  name="categoryName"
                  label="Category Name"
                  placeholder="Category Name"
                  size="small"
                  variant="outlined"
                  fullWidth
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.categoryName}
                  error={
                    formik.touched.categoryName &&
                    Boolean(formik.errors.categoryName)
                  }
                  helperText={
                    formik.touched.categoryName && formik.errors.categoryName
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={onDisagree}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};
export default AddCategory;
