import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@mui/material/Typography';


const useStyles = makeStyles((theme: any) => ({
  footer: {
    display:"flex",
    justifyContent:"center",
  }
}));

export default function Footer() {

  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar  color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar className={classes.footer}>
         <Typography  style={{fontSize: "1rem",}} align="center">Copyright © 2024. All rights reserved.</Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}