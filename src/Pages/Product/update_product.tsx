import { Paper, Typography } from "@mui/material";
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
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Navigate, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
export default function AddMerchant() {
    const navigate = useNavigate();

    const NavigateToBack = async () => {
        navigate("/home/merchant-list");
      };
    return (
        <Card sx={{ p: 2 }}>
        <Typography variant="h5">+ Add Product</Typography>
        <hr></hr>
  
        <Grid container spacing={4} sx={{ p: 2 }}>
          <Grid item xs={6}>
            <TextField
              id="userName"
              rows={6}
              name="userName"
              label="User Name"
              placeholder="User Name"
              autoFocus
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="userName"
              name="userName"
              label="User Name"
              placeholder="User Name"
              autoFocus
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="userName"
              name="userName"
              label="User Name"
              placeholder="User Name"
              autoFocus
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="userName"
              name="userName"
              label="User Name"
              placeholder="User Name"
              autoFocus
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="userName"
              name="userName"
              label="User Name"
              placeholder="User Name"
              autoFocus
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="userName"
              name="userName"
              label="User Name"
              placeholder="User Name"
              autoFocus
              variant="outlined"
              fullWidth
            />
          </Grid>
  
          <Grid item xs={6}>
            <TextField
              id="userName"
              name="userName"
              label="User Name"
              placeholder="User Name"
              autoFocus
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="userName"
              name="userName"
              label="User Name"
              placeholder="User Name"
              autoFocus
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="userName"
              name="userName"
              label="User Name"
              placeholder="User Name"
              autoFocus
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={12}>
            <Grid container sx={{ mt: 2 }} justifyContent={"space-between"}>
              <Grid>
                <Button
                onClick={NavigateToBack}
                  startIcon={<ArrowBackIcon />}
                  variant="contained"
                  style={{
                    maxWidth: "160px",
                    maxHeight: "40px",
                    minWidth: "160px",
                    minHeight: "40px",
                  }}
  
                
                >
                  Back
                </Button>
              </Grid>
              <Grid item justifyContent={"flex-end"}>
                <Button
                  style={{
                    maxHeight: "40px",
                    minWidth: "160px",
                    minHeight: "40px",
                  }}
                  variant="contained"
                  startIcon={<SaveIcon />}
                >
                  Add Category
                </Button>
              </Grid>
            </Grid>
          </Grid>
  
          {/* <Grid item xs={6} justifyContent="space-between">
            <Button
              style={{
                maxWidth: "160px",
                maxHeight: "40px",
                minWidth: "160px",
                minHeight: "40px",
              }}
              type="submit"
              size="small"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Back
            </Button>
          </Grid> */}
  
          {/* <Grid  justifyContent="end">
            <Button
              style={{
                maxWidth: "160px",
                maxHeight: "40px",
                minWidth: "160px",
                minHeight: "40px",
              }}
              type="submit"
              size="small"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Save
            </Button>
          </Grid> */}
        </Grid>
      </Card>
          
            
    );
}