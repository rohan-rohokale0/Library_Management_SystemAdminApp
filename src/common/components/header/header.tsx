import { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import { Toolbar, Typography } from "@mui/material";



function Header() {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div">
          Scroll to elevate App bar
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
export default Header;