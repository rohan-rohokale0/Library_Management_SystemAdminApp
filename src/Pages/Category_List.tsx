import * as React from "react";
import Paper from "@mui/material/Paper";
import Card from "@mui/joy/Card";
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
  TableRow,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../Services/httpservice";
import axios, { AxiosError } from "axios";
import Loader from "../Components/loader";
import styled from "@emotion/styled";
import AddCategory from "./add_category";

export interface MerchantMasterViewModel {
  id: string
  categoryName:string

}

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
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

  const [open, setDialogOpen] = React.useState(false);

  const navigateToAddMechant = async () => {
    setDialogOpen(true);
  };

  useEffect(() => {
    debugger
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
      debugger

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

  const handleOnAgree = (event: any, reason: any) => {
    debugger;
    // do action to handle on agree deleting an user
    // dispatch(deleteUser({ title: "Delete User", details: selectedUser }));
    if (reason && reason === "backdropClick") return;
    else {
      setDialogOpen(false);
    }
  };
  ///const handleClose = (event: any, reason: any) => {

  return (
    <div>
      {isLoading && <Loader />}
      <Card variant="outlined" sx={{ p: 2, mb: 20 }}>
        <Grid container sx={{ mt: 2 }} justifyContent={"space-between"}>
          <Grid>
            <Typography variant="h6">Category</Typography>
          </Grid>
          <Grid item justifyContent={"flex-end"}>
            <Button variant="contained" onClick={navigateToAddMechant}>
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
                  <TableCell align="center">
                    {row.categoryName}
                  </TableCell>
                  <TableCell align="center">
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
        <AddCategory
          open={open}
          onAgree={handleOnAgree}
          onDisagree={() => handleOnAgree}
        ></AddCategory>
      </Card>
    </div>
  );
}
