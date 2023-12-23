import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const CustomSnackbar = ({ open, handleClose, message, severity }: any) => {
  return (
    <Snackbar  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={open} autoHideDuration={6000} onClose={handleClose} >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
      {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;