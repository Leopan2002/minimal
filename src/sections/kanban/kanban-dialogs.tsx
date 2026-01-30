import type { DialogProps } from '@mui/material/Dialog';

import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

// ----------------------------------------------------------------------

type PromptDialogProps = Omit<DialogProps, 'onClose'> & {
  title: string;
  message?: string;
  defaultValue?: string;
  onClose: (value: string | null) => void;
};

export function PromptDialog({
  title,
  message,
  defaultValue = '',
  onClose,
  ...other
}: PromptDialogProps) {
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = () => {
    onClose(value.trim() || null);
  };

  const handleCancel = () => {
    onClose(null);
  };

  return (
    <Dialog maxWidth="xs" fullWidth onClose={handleCancel} {...other}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {message && <DialogContentText>{message}</DialogContentText>}
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ----------------------------------------------------------------------

type ConfirmDialogProps = Omit<DialogProps, 'onClose'> & {
  title: string;
  message: string;
  onClose: (confirmed: boolean) => void;
};

export function ConfirmDialog({
  title,
  message,
  onClose,
  ...other
}: ConfirmDialogProps) {
  return (
    <Dialog maxWidth="xs" fullWidth onClose={() => onClose(false)} {...other}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)} color="inherit">
          Cancel
        </Button>
        <Button onClick={() => onClose(true)} variant="contained" color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
