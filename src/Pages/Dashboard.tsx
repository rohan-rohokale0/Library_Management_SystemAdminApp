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



import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import clsx from 'clsx';
import { ToastContainer } from 'react-toastify';


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
    const cardList = [
        { name: 'New Leads', amount: 3050, icon: 'group' },
        { name: 'This week Sales', amount: '$80,500', icon: 'attach_money' },
        { name: 'Inventory Status', amount: '8.5% Stock Surplus', icon: 'store' },
        { name: 'Orders to deliver', amount: '305 Orders', icon: 'shopping_cart' },
    ];

    return (
        <Grid container spacing={3} sx={{ mb: '24px' }}>
            {cardList.map((item, index) => (
                <Grid item xs={12} md={6} key={index}>
                    <StyledCard elevation={6}>
                        <ContentBox>
                            <Icon className="icon">{item.icon}</Icon>
                            <Box ml="12px">
                                <Small>{item.name}</Small>
                                <Heading>{item.amount}</Heading>
                            </Box>
                        </ContentBox>

                        <Tooltip title="View Details" placement="top">
                            <IconButton>
                                <Icon>arrow_right_alt</Icon>
                            </IconButton>
                        </Tooltip>
                    </StyledCard>
                    {/* <ToastContainer
                        position="top-right"
                        autoClose={5000}
                    /> */}
                </Grid>

            ))}
        </Grid>
    );
}
