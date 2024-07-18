import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Divider, Grid, Box, CardHeader, IconButton } from '@mui/material';
import { SaveOutlined } from '@material-ui/icons';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

interface AddCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onAddCategory: (categoryName: string) => void;
}

const AddCategoryDialog: React.FC<AddCategoryDialogProps> = ({ open, onClose, }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleAdd = () => {

    setCategoryName('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      {/* <DialogTitle>Add Category</DialogTitle>
      <Divider component="li" /> */}
      {/* <DialogTitle>Add Category</DialogTitle>
      <Divider  /> */}

      <Box display="flex" justifyContent="space-between" alignItems="center" padding="8px">
        <CardHeader
          title="Add Category"
          titleTypographyProps={{ variant: 'h6' }}
          style={{ padding: 0 }}
        />
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 1,
            top: 2,
            // color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />

      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              autoFocus
              label="Category Name"
              type="text"
              fullWidth
              size="small"
              name="Category Name"
              variant="outlined"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="SubCategory Name"
              type="text"
              fullWidth
              size="small"
              name="SubCategory Name"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button variant="contained" color="secondary" size="small" onClick={onClose}>Cancel</Button>
        <Button variant="contained" sx={{ my: 0 }} startIcon={<SaveOutlined />} size="small" onClick={handleAdd} >Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategoryDialog;
