import * as React from 'react';
import Paper from '@mui/material/Paper';
import Card from '@mui/joy/Card';
import {
    Box,
    Button,
    CardContent,
    Divider,
    Grid,
    Icon,
    IconButton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';




const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const StyledTable = styled(Table)(() => ({
    whiteSpace: "pre",
    "& thead": {
        "& tr": { "& th": { paddingLeft: 0, paddingRight: 0, } },
    },
    "& tbody": {
        "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
}));

const subscribarList = [
    {
        name: "john doe",
        date: "18 january, 2019",
        amount: 1000,
        status: "close",
        company: "ABC Fintech LTD.",
    },
    {
        name: "kessy bryan",
        date: "10 january, 2019",
        amount: 9000,
        status: "open",
        company: "My Fintech LTD.",
    },
    {
        name: "kessy bryan",
        date: "10 january, 2019",
        amount: 9000,
        status: "open",
        company: "My Fintech LTD.",
    },
    {
        name: "james cassegne",
        date: "8 january, 2019",
        amount: 5000,
        status: "close",
        company: "Collboy Tech LTD.",
    },
    {
        name: "lucy brown",
        date: "1 january, 2019",
        amount: 89000,
        status: "open",
        company: "ABC Fintech LTD.",
    },
    {
        name: "lucy brown",
        date: "1 january, 2019",
        amount: 89000,
        status: "open",
        company: "ABC Fintech LTD.",
    },
    {
        name: "lucy brown",
        date: "1 january, 2019",
        amount: 89000,
        status: "open",
        company: "ABC Fintech LTD.",
    },
    {
        name: "lucy brown",
        date: "1 january, 2019",
        amount: 89000,
        status: "open",
        company: "ABC Fintech LTD.",
    },
    {
        name: "lucy brown",
        date: "1 january, 2019",
        amount: 89000,
        status: "open",
        company: "ABC Fintech LTD.",
    },
];
export default function MerchantList() {
    const navigate = useNavigate();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (_: any, newPage: React.SetStateAction<number>) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: { target: { value: string | number; }; }) => {
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
    }


    return (
        <Container>
            {/* <Typography variant='h6'>Merchants</Typography> */}


            {/* <Card sx={{p:2,pm:2}}>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Merchant', path: '/merchant-list' }, { name: 'Merchant' }]} />
            </Box>
            </Card> */}


            <Card variant="outlined" sx={{ p: 2, }}>
                <Grid container sx={{ mt: 2 }} justifyContent={"space-between"}>
                    <Grid>
                        <Typography variant='h6'>Merchant</Typography>
                    </Grid>
                    <Grid item justifyContent={"flex-end"}>
                        <Button variant="contained" onClick={navigateToAddMechant} >Add Merchant</Button>
                    </Grid>
                </Grid>

                <Divider sx={{ mt: 2 }}>

                </Divider>

                <Box width="100%" overflow="auto">
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="center">Company</TableCell>
                                <TableCell align="center">Start Date</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Amount</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {subscribarList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((subscriber, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="left">{subscriber.name}</TableCell>
                                        <TableCell align="center">{subscriber.company}</TableCell>
                                        <TableCell align="center">{subscriber.date}</TableCell>
                                        <TableCell align="center">{subscriber.status}</TableCell>
                                        <TableCell align="center">${subscriber.amount}</TableCell>
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
                        count={subscribarList.length}
                        onPageChange={handleChangePage}
                        rowsPerPageOptions={[5, 10, 25]}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        nextIconButtonProps={{ "aria-label": "Next Page" }}
                        backIconButtonProps={{ "aria-label": "Previous Page" }}
                    />
                </Box>
            </Card>
        </Container>

    );
}