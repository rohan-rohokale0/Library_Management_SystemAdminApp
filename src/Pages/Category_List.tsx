import * as React from "react";
import Paper from "@mui/material/Paper";
import Card from "@mui/joy/Card";
import {
  Box,
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  createTheme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Container } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../Services/httpservice";
import axios, { AxiosError, AxiosResponse } from "axios";
import Loader from "../Components/loader";
import styled from "@emotion/styled";
import AddCategory from "./add_category";
import * as Yup from "yup";
import { apiURL } from "../Constant/ApiUrlConstant";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export interface MerchantMasterViewModel {
  id: string;
  categoryName: string;
}

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

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));


const HR = styled("hr")(({ theme }) => ({
  margin: "10px 0px 24px",
  flexShrink: "0",
  borderWidth: "0px 0px thin",
  borderStyle: "solid",
  borderColor: "rgba(0,0,0.12)",
}));
export default function CategoryList() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [merchantDetailsList, setMerchantDetails] = useState<
    MerchantMasterViewModel[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //    const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleChangePage = (_: any, newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: {
    target: { value: string | number };
  }) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const CardContentNoPadding = styled(CardContent)(`
    padding: 0;
    &:last-child {
      padding-bottom: 0;
    }
  `);

  useEffect(() => {
    debugger;
    const accessToken = sessionStorage.getItem("accessToken");
    getTransactionDetails();
  }, []);

  const getTransactionDetails = async () => {
    try {
      //  setIsLoading(true);
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await getRequest(
        "http://localhost:5454/category/getCategory"
      );
      debugger;

      if (response == null) throw new Error(`HTTP error! Status`);

      if (response.status === 401) {
        navigate("/");
        return;
      }
      const data = response.data;
      setMerchantDetails(data);
      setIsLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsLoading(false);

        const axiosError = error as AxiosError;
        if (axiosError.response) {
          if (axiosError?.response.status == 401) {
            navigate("/");
          }
        }
      }
    }
  };
  const validationSchema = Yup.object({
    categoryName: Yup.string().required("Please Enter Category"),
  });

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
          const LoginApiResponse: any = axiosResponse.data;
          toast.success(LoginApiResponse);
          setOpen(false);
          getTransactionDetails();
        }
        setIsLoading(false);
      } catch (e: any) {
        toast.error(e.message);
        setIsLoading(false);
      }
    },
  });
  ///const handleClose = (event: any, reason: any) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {isLoading && <Loader />}
      <Card variant="outlined" sx={{ p: 2, mb: 20 }}>
        <Grid container sx={{ mt: 2 }} justifyContent={"space-between"}>
          <Grid>
            <Typography variant="h6">Category</Typography>
          </Grid>
          <Grid item justifyContent={"flex-end"}>
            <Button variant="contained" onClick={handleClickOpen}>
              Add Category
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 2 }}></Divider>

        <Box width="100%" overflow="auto">
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="center">Category Name</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="transactionTable-tablebody">
              {(rowsPerPage > 0
                ? merchantDetailsList.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : merchantDetailsList
              ).map((row: any, index: any) => (
                <TableRow key={index}>
                  <TableCell align="left">{row.id}</TableCell>
                  <TableCell align="center">{row.categoryName}</TableCell>
                  <TableCell align="center">
                    <IconButton aria-label="Edit" color="primary" >
                      <EditIcon />                      
                    </IconButton>
                    <IconButton aria-label="delete" color="primary">
                    <RemoveRedEyeIcon/>
                    </IconButton>
                    <IconButton aria-label="delete" color="primary">
                      <DeleteIcon />                      
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
          <TablePagination
            sx={{ px: 2 }}
            page={page}
            component="div"
            rowsPerPage={rowsPerPage}
            count={merchantDetailsList.length}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
            nextIconButtonProps={{ "aria-label": "Next Page" }}
            backIconButtonProps={{ "aria-label": "Previous Page" }}
          />
        </Box>

        <React.Fragment>
          <Dialog
          PaperProps={{
            sx: {
              width: "50%",
              maxHeight: 300,
              p: 0,
            },
          }}
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <form onSubmit={formik.handleSubmit}>
              <DialogTitle id="alert-dialog-title">
                {"Add Category"}
              </DialogTitle>             
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
                        formik.touched.categoryName &&
                        formik.errors.categoryName
                      }
                    />
                  </Grid>
                </Grid>
                {/* <DialogContentText id="alert-dialog-description">
                Let Google help apps determine location. This means sending
                anonymous location data to Google, even when no apps are
                running.
              </DialogContentText> */}
              </DialogContent>
              <DialogActions>
                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  Save
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </React.Fragment>
      </Card>
    </div>
  );
}
