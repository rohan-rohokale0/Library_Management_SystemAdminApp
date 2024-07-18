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
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../Services/httpservice";
import axios, { AxiosError } from "axios";
import Loader from "../../Components/loader";
import styled from "@emotion/styled";

export interface MerchantMasterViewModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  fund: number;
  type: string;
  status: number;
}

// const StyledTable = styled(Table)(() => ({
//   whiteSpace: "pre",
//   "& thead": {
//     "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
//   },
//   "& tbody": {
//     "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
//   },
// }));
export default function UserList() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [merchantDetailsList, setMerchantDetails] = useState<
    MerchantMasterViewModel[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
  const navigateToAddProduct = async () => {
    navigate("/home/add-user");
  };
  const getStatusValue = (value: any) => {
    return value.toString();
  };

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    getTransactionDetails();
  }, []);

  const getTransactionDetails = async () => {
    setIsLoading(true);

    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await getRequest(
        "https://localhost:7014/api/Admin/userList"
      );
      if (response == null) throw new Error(`HTTP error! Status`);
      if (response.status === 401) {
        navigate("/");
        return;
      }
      const data = response.data.listUsers;
      debugger;
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
  const { productId } = useParams<{ productId: string }>();

  const navigateToUpdateProduct = async (id: any) => {
    navigate(`/home/update-product?id=${id}`);
  };

  const handleOnAgree = (event: any, reason: any) => {
    // do action to handle on agree deleting an user
    // dispatch(deleteUser({ title: "Delete User", details: selectedUser }));
    if (reason && reason === "backdropClick") return;
    else {
      setDialogOpen(false);
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <Card variant="outlined" sx={{ p: 2, mb: 20 }}>
        <Grid container sx={{ mt: 2 }} justifyContent={"space-between"}>
          <Grid>
            <Typography variant="h6">User List</Typography>
          </Grid>
          <Grid item justifyContent={"flex-end"}>
            <Button variant="contained" onClick={navigateToAddProduct}>
              Add User
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 2 }}></Divider>
        <Box width="100%" overflow="auto">
         
            <TableHead>
              <TableRow>
                <TableCell align="left">First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="transactionTable-tablebody">
              {merchantDetailsList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      align="center"
                    >
                      No data available in table
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                (rowsPerPage > 0
                  ? merchantDetailsList.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : merchantDetailsList
                ).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{row.firstName}</TableCell>
                    <TableCell align="center">{row.lastName}</TableCell>
                    <TableCell align="center">
                      {row.email && row.email.toLowerCase()}
                    </TableCell>
                    <TableCell align="center">{row.type}</TableCell>
                    <TableCell align="center">
                      {row.status == 1 ? "Active" : "In-Active"}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton aria-label="delete" color="primary">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          

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
      </Card>
    </div>
  );
}
