// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Unstable_Grid2';
// import { Typography } from '@mui/material';

// export default function Dashboard() {

//     const Item = styled(Paper)(({ theme }) => ({
//         // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//         ...theme.typography.body2,
//         padding: theme.spacing(4),
//         textAlign: 'left',
//         color: theme.palette.text.secondary,
//       }));

//     return (
//         <Box sx={{ flexGrow: 1 }}>
//             <Grid container spacing={2}>
//                 <Grid xs={4}>
//                     <Item>
//                         <Typography style={{fontSize:"16px"}}>
//                         Total Transactions
//                         </Typography>
//                         <Typography>
//                         23231
//                         </Typography>
//                     </Item>

//                 </Grid>
//                 <Grid xs={4}>
//                     <Item>xs=4</Item>
//                 </Grid>
//                 <Grid xs={4}>
//                     <Item>xs=4</Item>
//                 </Grid>
//                 <Grid xs={8}>
//                     <Item>xs=8</Item>
//                 </Grid>
//             </Grid>
//         </Box>
//     );

// }



import { Box, Card, Grid, Icon, IconButton, ListItemIcon, styled, Tooltip, Typography } from '@mui/material';
import clsx from 'clsx';
import { ToastContainer } from 'react-toastify';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CategoryIcon from '@mui/icons-material/Category';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DistributedColumnsChart from './bar_chart';
import PieChart from './pie_chart';
import LineChart from './line_chart';



const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px !important',
    background: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    '& small': { color: theme.palette.text.secondary },
    '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
}));

const Heading = styled('h6')(({ theme }) => ({
    margin: 0,
    marginTop: '4px',
    fontSize: '14px',
    fontWeight: '500',
    color: theme.palette.primary.main,
}));
const StyledBox = styled(Box)(({ ellipsis }: any) => ({
    ...(ellipsis && {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    })
}));

const Small = ({ children, className, ellipsis, textTransform, ...props }: any) => {
    return (
        <StyledBox
            ellipsis={ellipsis}
            className={clsx({ [className || '']: true })}
            component="small"
            fontSize="12px"
            fontWeight="500"
            lineHeight="1.5"
            {...props}
        >
            {children}
        </StyledBox>
    );
};


export default function Dashboard() {

    // const data = [
    //     { text: 'Dashbaord', icon: <DashboardIcon /> },
    //     { text: 'Category', icon: <CategoryIcon /> },
    //     { text: 'Product', icon: <Inventory2Icon /> },
    //     { text: 'Order', icon: <ShoppingCartCheckoutIcon /> },
    //     { text: 'View Bill', icon: <ReceiptIcon /> },
    //     { text: 'Users', icon: <GroupIcon /> },
    //   ];
    const cardList = [
        { name: 'Total Category', amount: 3050, icon: <CategoryIcon /> },
        { name: 'Total Product', amount: '$80,500', icon: <Inventory2Icon /> },
        { name: 'Total Order', amount: '$30', icon: <ShoppingCartCheckoutIcon /> },
        { name: 'Total Bill', amount: '305 Bill', icon: <ReceiptIcon /> },
    ];
    {/* <Typography variant="subtitle1" color="textSecondary" align="center">
                No data available in table
                </Typography> */}
    return (
        <>
            <Grid container xs={12} spacing={3} sx={{ mb: '24px' }}>
                {cardList.map((item, index) => (
                    <Grid item xs={2} md={3} key={index}>
                        <StyledCard elevation={2}>
                            <ContentBox>
                                {/* <Icon className=''>{item.icon}</Icon> */}
                                <Box ml="30px">
                                    <Typography variant="h6" color="textSecondary" align="center">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="h6" style={{ color: 'black' }} align="center">
                                        {item.amount}
                                    </Typography>
                                    {/* <Small>{item.amount}</Small> */}
                                    {/* <Heading>{item.amount}</Heading> */}

                                </Box>
                            </ContentBox>

                            {/* <Tooltip title="View Details" placement="top">
                                <IconButton>
                                    <ArrowRightAltIcon />
                                </IconButton>
                            </Tooltip> */}
                        </StyledCard>
                        {/* <ToastContainer
                        position="top-right"
                        autoClose={5000}
                    /> */}
                    </Grid>

                ))}


            </Grid>

            <Grid container xs={12} spacing={3} sx={{ mb: '24px' }}>
                <Grid item xs={12} md={6}>
                    <StyledCard elevation={2}>
                        <ContentBox>
                        <DistributedColumnsChart />
                        </ContentBox>
                    </StyledCard>
                </Grid>

                <Grid item xs={12} md={6}>
                    <StyledCard elevation={2}>
                        <ContentBox>
                        <PieChart />
                        </ContentBox>
                    </StyledCard>
                </Grid>

                <Grid item xs={12} md={6} mb={5}>
                    <StyledCard elevation={2}>
                        <ContentBox>
                        <LineChart />
                        </ContentBox>
                    </StyledCard>
                </Grid>
            </Grid>



        </>

    );
}
