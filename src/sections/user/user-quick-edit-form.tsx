import { useState } from 'react';

import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import type { UserProps } from './user-table-row';

// ----------------------------------------------------------------------

type UserQuickEditFormProps = {
  open: boolean;
  onClose: () => void;
  currentUser?: UserProps | null;
};

export function UserQuickEditForm({ open, onClose, currentUser }: UserQuickEditFormProps) {
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: '',
    phone: '',
    country: 'United States',
    state: '',
    city: '',
    address: '',
    zipCode: '',
    company: currentUser?.company || '',
    role: currentUser?.role || '',
    status: currentUser?.status || 'active',
  });

  const handleChange = (field: string) => (event: any) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = () => {
    // Here you would typically update the user data
    console.log('Form data:', formData);
    onClose();
  };

  const isNewUser = !currentUser;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{isNewUser ? 'Create a new user' : 'Quick update'}</DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        {!isNewUser && currentUser?.status === 'pending' && (
          <Alert severity="info" sx={{ mb: 3 }}>
            Account is waiting for confirmation
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Status */}
          {!isNewUser && (
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select value={formData.status} onChange={handleChange('status')} label="Status">
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="banned">Banned</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          )}

          {/* Personal Info */}
          <Box>
            <Box sx={{ typography: 'subtitle2', mb: 2 }}>Personal info</Box>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Full name"
                  value={formData.name}
                  onChange={handleChange('name')}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Email address"
                  value={formData.email}
                  onChange={handleChange('email')}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Phone number"
                  value={formData.phone}
                  onChange={handleChange('phone')}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Country</InputLabel>
                  <Select value={formData.country} onChange={handleChange('country')} label="Country">
                    <MenuItem value="United States">United States</MenuItem>
                    <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                    <MenuItem value="Canada">Canada</MenuItem>
                    <MenuItem value="Australia">Australia</MenuItem>
                    <MenuItem value="Germany">Germany</MenuItem>
                    <MenuItem value="France">France</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          {/* Address */}
          <Box>
            <Box sx={{ typography: 'subtitle2', mb: 2 }}>Address</Box>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="State/Region"
                  value={formData.state}
                  onChange={handleChange('state')}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="City"
                  value={formData.city}
                  onChange={handleChange('city')}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Address"
                  value={formData.address}
                  onChange={handleChange('address')}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Zip/code"
                  value={formData.zipCode}
                  onChange={handleChange('zipCode')}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Professional */}
          <Box>
            <Box sx={{ typography: 'subtitle2', mb: 2 }}>Professional</Box>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Company"
                  value={formData.company}
                  onChange={handleChange('company')}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Role"
                  value={formData.role}
                  onChange={handleChange('role')}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {isNewUser ? 'Create user' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
