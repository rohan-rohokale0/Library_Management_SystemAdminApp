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

export interface MerchantMasterViewModel {
  ID: string;
  MerchantName: string;
  MerchantDisplayName: string;
  MerchantTypeDisplayName: string;
  MerchantTypeName: string;
  InvoiceStart: string;
  CreatedDate: string;
  ModifiedDate: string;
  CreatedByUserID: string | null;
  ModifiedByUserID: string | null;
  SubClientId: string;
  IsActive: boolean | null;
  ByIncludingFeeText: string;
  EIN: string;
  PayGatewayID: number;
  PayGatewayName: string;
  PayGatewayCode: string;
  MerchantTypeId: number;
  FooterText1: string;
  FooterText2: String;
  SecurityKey: String;
  TokenizationKey: String;
  SetFeePercentage: String;
  GiftInstruction: String;
  IsDisplayGiftDiscription: boolean;
  IsDisplayGiftInstruction: boolean;
  ESKey: string;
  StoreID: string;
  TerminalID: string;
  IsACH: boolean;
  CustomerServiceNumber: string;
  ACHAccountValidation: boolean;
  ACHName: string;
  ACHUserName: string;
  ACHPassword: string;
  ACHLocationNumber: string;
  ACHSetFeePercentage: String;
  eCheckClientID: string;
  eCheckAPIPassword: string;
  eCheckSetFeePercentage: String;
  eCheckValidation: boolean;
  IsExpeditedRefund: boolean;
  LogoPath: string;
  LogoName: string;
  MerchantSubDomain: string;
  TimeZoneId?: number;
  TimeZoneDisplayName: string;
  TimeZoneConvertId: string;
  DiscountMerchantPerc: number;
  DiscountABPPerc: number;
  PPMFeePerc: number;
  Reason: String;
  NMIMerchantId: String;
  FeeCategoryId: number;
  IsEnable1099KReport: boolean;
  SIN: string;
  MCC: string;
  Address: string;
  City: string;
  State: string;
  ZipCode: string;
}

const Item = styled(Paper)(({ theme }:any) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

// const subscribarList = [
//   {
//     name: "john doe",
//     date: "18 january, 2019",
//     amount: 1000,
//     status: "close",
//     company: "ABC Fintech LTD.",
//   },
//   {
//     name: "kessy bryan",
//     date: "10 january, 2019",
//     amount: 9000,
//     status: "open",
//     company: "My Fintech LTD.",
//   },
//   {
//     name: "kessy bryan",
//     date: "10 january, 2019",
//     amount: 9000,
//     status: "open",
//     company: "My Fintech LTD.",
//   },
//   {
//     name: "james cassegne",
//     date: "8 january, 2019",
//     amount: 5000,
//     status: "close",
//     company: "Collboy Tech LTD.",
//   },
//   {
//     name: "lucy brown",
//     date: "1 january, 2019",
//     amount: 89000,
//     status: "open",
//     company: "ABC Fintech LTD.",
//   },
//   {
//     name: "lucy brown",
//     date: "1 january, 2019",
//     amount: 89000,
//     status: "open",
//     company: "ABC Fintech LTD.",
//   },
//   {
//     name: "lucy brown",
//     date: "1 january, 2019",
//     amount: 89000,
//     status: "open",
//     company: "ABC Fintech LTD.",
//   },
//   {
//     name: "lucy brown",
//     date: "1 january, 2019",
//     amount: 89000,
//     status: "open",
//     company: "ABC Fintech LTD.",
//   },
//   {
//     name: "lucy brown",
//     date: "1 january, 2019",
//     amount: 89000,
//     status: "open",
//     company: "ABC Fintech LTD.",
//   },
// ];
export default function MerchantList() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [merchantDetailsList, setMerchantDetails] = useState<MerchantMasterViewModel[]>([]);
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
  const navigateToAddMechant = async () => {
    navigate("/home/add-merchant");
  };

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    getTransactionDetails();
  }, []);


  const getTransactionDetails = async () => {
    try {
      //  setIsLoading(true);

      const accessToken = sessionStorage.getItem('accessToken');
      const response = await getRequest(
        "https://devapi.specialtypayments.com/api/Merchant/GetMerchants"
      );

      if (response == null)
        throw new Error(`HTTP error! Status`);

      if (response.status === 401) {
        navigate('/');
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
            navigate('/');
          }
        }
      }
    }
  }


  return (
  <div>
      {isLoading && <Loader />}
      <Card variant="outlined" sx={{ p: 2,mb:20}}>
        <Grid container sx={{ mt: 2 }} justifyContent={"space-between"}>
          <Grid>
            <Typography variant="h6">Merchant</Typography>
          </Grid>
          <Grid item justifyContent={"flex-end"}>
            <Button variant="contained" onClick={navigateToAddMechant}>
              Add Merchant
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 2 }}></Divider>

        <Box width="100%" overflow="auto">
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="left">Merchant Name</TableCell>
                <TableCell align="center">Merchnat Display Name</TableCell>
                <TableCell align="center">Payment Getway</TableCell>
                <TableCell align="center">invoice start </TableCell>
                <TableCell align="center">sub clinet id</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className='transactionTable-tablebody' >
              {(rowsPerPage > 0
                ? merchantDetailsList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : merchantDetailsList
              ).map((row: any, index: any) => (
                <TableRow key={index}>
                  <TableCell align="left">{row.MerchantName}</TableCell>
                  <TableCell align="center">{row.MerchantTypeDisplayName}</TableCell>
                  <TableCell align="center">{row.PayGatewayName}</TableCell>
                  <TableCell align="center">{row.InvoiceStart}</TableCell>
                  <TableCell align="center">{row.SubClientId}</TableCell>
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
      </Card>
  </div> 
  );
}
